# Assignment #2-2

Programmazione Concorrente e Distribuita - Assignment #2-2

## Install

1. Install package on web folder

```sh
npm i --legacy-peer-deps  # add flag --legacy-peer-deps with npm version > 7.0
```

2. Install package on api folder

```sh
npm i
```

3. Start Docker with [Docker Compose](https://docs.docker.com/compose/install/])

```sh
docker-compose up -d
```

### Link

FrontEnd
[http://localhost:80]

Api
[http://localhost:3000]

### Docker commands

```sh
docker-compose up -d #start like daemon
```

```sh
docker-compose down #down (-v to remove volumes)
```

```sh
docker-compose logs -f # follow the logs
```

```sh
docker ps -a #locate the name or ID of the containers
docker rm [CONTAINER] #remove container (also with first 2 chars of container ID)
```

```sh
docker images -a #List of images
docker rmi $(docker images -a -q) #Remove all images
```

```sh
docker system prune -a #Purging All Unused or Dangling Images, Containers, Volumes, and Networks
```
