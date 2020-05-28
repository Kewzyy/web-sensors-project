So it goes like this:
### Requirements

* install docker 

  * For this you can install [docker-engine](https://docs.docker.com/engine/install/)
  * Or [docker toolbox](https://github.com/docker/toolbox/releases)

### Starting the app

Go to your cloned repo:

    cd web-project-final

And run these commands:

    docker-compose build --no-cache
    
    docker-compose up

Check that containers are up and running:

    docker ps -a
    
Access db and content:

    docker exec -it mongodb mongo

* To modify the initial db content (collections and documents) - 
append mongo commands to mongo-init.js file

### Access the app:

* api (express) http://[DOCKER_URL]:9000
* client http://[DOCKER_URL]:3000

### Stopping and removing all containers
When the app is no longer needed run:

    docker rm $(docker ps -a -q)

