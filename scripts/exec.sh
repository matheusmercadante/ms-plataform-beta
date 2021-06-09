#!/bin/bash
set -e
echo "Running command in new container ..."
podman run --pod ms-plataform -it --rm -v $(pwd)/services/catalog-api:/opt/app-root/src:Z localhost/haungi/ms-plataform-catalog-api:dev $l
