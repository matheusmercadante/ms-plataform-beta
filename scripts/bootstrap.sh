#!/bin/bash
set +e
if [ "$(podman pod ps | grep ms-plataform | wc -l)" == "0" ]; then
  echo "> > > Starting Malicious School Plataform - Services"
  podman play kube ./k8s/pod.dev.yaml
else
  echo "Development pod is already running. Re-create it? y/N"
  read input
  if [ $input == "y" ]; then
    podman pod rm ms-plataform -f
    podman play kube ./k8s/pod.dev.v2.yaml
  else
    echo "Leaving bootstrap process."
    exit 0
  fi
fi
echo "> > > Waiting for PostgreSQL to start"
until podman exec ms-plataform-postgres psql -U postgres -c '\list'; do
  echo "> > > > > > PostgreSQL is not ready yet"
  sleep 1
done
podman exec ms-plataform-postgres psql -U postgres -d template1 -c 'create extension hstore;'
echo "> > > Creating development MSP Catalog database"
until podman exec ms-plataform-postgres psql -U postgres -c 'create database malicious_school_catalog'; do sleep 3; done
# echo "> > > Creating and seeding the database"
#./setup.sh
#./scripts/exec.sh
#./seed.sh
echo "> > > Attempting to start the app"
./scripts/run.sh
