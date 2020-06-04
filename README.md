### 0. Sensor Data: Fill data
    * Use /filldb route only ONCE to fill db with sensor data /!\
    * <DOCKER_URL> replace with yours
    * Use JSONView Chrome extension
    * Fill database with sensor data (Use only initially) : http://<DOCKER_URL>/filldb

### 0.1 Sensor Data: Search by Room
    * Rooms: 14telpa, Servertelpa, Videotelpa, Dispecerutelpa & 13telpa
    * Use: http://{DOCKER_URL}:9000/Room (ex. .../14telpa)

### 0.2 Sensor Data: Search by Room and Type 
    * Rooms: 14telpa, Servertelpa, Videotelpa, Dispecerutelpa & 13telpa
    * Types: co2, temp & humidity
    * Use: http://{DOCKER_URL}:9000/Room/Type (ex. .../Servertelpa/humidity)
    

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
    
##### 2.1. create .env file in the root directory with the following content:

    REACT_APP_API_HOST_URI=http://<YOUR_DOCKER_URL>:9000
    MONGODB_URI=mongodb://<YOUR_DOCKER_URL>:27017/
    
Then access the environment variables inside the app with:

    process.env.REACT_APP_API_HOST_URI
    process.env.MONGODB_URI
    
### 3. Access the app:

* api (express) [REACT_APP_API_HOST_URI]:9000
* client [YOUR_DOCKER_URL]:3000

* pages:
    * Alerts page: [YOUR_DOCKER_URL]:3000/alerts
    

### 4. Stopping the app and removing all containers
When the app is no longer needed run:

    docker rm $(docker ps -a -q)
    
To remove all containers, or

    docker-compose down


