### 0. Sensor Data: How to
* 1)Do everything as usual
* 2)Go here http://192.168.99.100:9000/sensor
    * 3) Use JSONView ext for better experience
    * 4) If collection already exists
        docker exec -it mongodb mongo
        use webapp
        db.sensors.drop()
        Start from 1).

So it goes like this:
### 1. Requirements

* install docker 

  * For this you can install [docker-engine](https://docs.docker.com/engine/install/)
  * Or [docker toolbox](https://github.com/docker/toolbox/releases)

### 2. Starting the app

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
append mongo commands to mongo-init.js file and delete 
persisted mongodb volume so its content can be reinitialized:


    docker volume rm web-project-final_mongodata
    
### 3. Access the app:

* api (express) http://[DOCKER_URL]:9000
* client http://[DOCKER_URL]:3000

### 4. Stopping the app and removing all containers
When the app is no longer needed run:

    docker rm $(docker ps -a -q)
    
To remove all containers, or

    docker-compose down


