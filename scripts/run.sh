#!/bin/bash
set -e

# if [ "$(podman ps | grep catalog-api | grep ms-plataform | wc -l)" == "0" ]; then
#   echo "> > > Starting new catalog-api container"
#   podman run -d --pod ms-plataform --name ms-plataform-catalog-api -v $(pwd)/services/catalog-api:/opt/app-root/:Z localhost/haungi/ms-plataform-catalog-api:dev
# else
#   echo "> > > Removing existing container"
#   podman rm -f ms-plataform-catalog-api
#   echo "> > > Starting new catalog-backend container"
#   podman run -d --pod ms-plataform --name ms-plataform-catalog-api -v $(pwd)/services/catalog-api:/opt/app-root/:Z localhost/haungi/ms-plataform-catalog-api:dev
# fi

# if [ "$(podman ps | grep catalog-backend | grep ms-plataform | wc -l)" == "0" ]; then
#   echo "> > > Starting new catalog-backend container"
#   podman run -d --pod ms-plataform --name ms-plataform-catalog-backend -v $(pwd)/services/catalog-backend:/opt/app-root/:Z localhost/haungi/ms-plataform-catalog-backend:dev
# else 
  echo "> > > Removing existing container"
  podman rm -f ms-plataform-catalog-backend
  echo "> > > Starting new catalog-backend container"
  podman run -d --pod ms-plataform --name ms-plataform-catalog-backend -v $(pwd)/services/catalog-backend:/opt/app-root/:Z localhost/haungi/ms-plataform-catalog-backend:dev
# fi

# echo "> > > Starting new rabbitmq container"
# podman run -d --pod ms-plataform --name rabbitmq -v $(pwd)/services/rabbitmq/rabbitmqdata:/var/lib/rabbitmq:Z docker.io/library/rabbitmq:3.8.14-management-alpine

# if [ "$(podman ps | grep rabbitmq | grep ms-plataform | wc -l)" == "0" ]; then
#   echo "> > > Starting new rabbitmq container"
#   podman run -d --pod ms-plataform --name ms-plataform-rabbitmq -v $(pwd)/services/rabbitmq/rabbitmqdata:/var/lib/rabbitmq:Z docker.io/library/rabbitmq:3.8.14-management-alpine
# fi

# if [ "$(podman ps | grep video-encoder | grep ms-plataform | wc -l)" == "0" ]; then
#   echo "> > > Starting new video-encoder container"
#   podman run --pod ms-plataform --name video-encoder -v $(cd ../services/video-encoder):/app:Z -d docker.io/haungi/ms-plataform-video-encoder:dev
# fi
# n=0
# until [ $n -ge 6 ]
# do
#   podman exec -it catalog-api /entrypoint.sh
#   n=$[$n+1]
#   echo "Not all components are up. Sleeping for 12 seconds."
#   sleep 12
# done
