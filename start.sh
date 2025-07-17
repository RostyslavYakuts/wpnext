#!/bin/bash

case "$1" in
  build)
    docker compose -f docker/docker-compose.yml --env-file docker/.env build
    ;;
   build_no_cache)
      docker compose -f docker/docker-compose.yml --env-file docker/.env build --no-cache
      ;;
  start)
    docker compose -f docker/docker-compose.yml --env-file docker/.env up -d
    ;;
  stop)
    docker compose -f docker/docker-compose.yml down
    ;;
  *)
    echo "Usage: $0 {build|build_no_cache|start|stop}"
    exit 1
    ;;
esac