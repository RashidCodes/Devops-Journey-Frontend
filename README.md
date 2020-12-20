# Introduction to DevOps

This repository is part of a group of repositories called <b>Devops-Journey*</b>. It contains the files of a react application that says "Hello" to anyone.

## What I've learned so far...

### Docker-compose
Using <code>docker-compose</code> with images can be slightly tricky as compared to simply using a <code>docker run</code>.

Always use a <code>docker-compose down</code> to remove any containers created by <code>compose</code>.

<br/>

### Authentication
Enabling authentication with a mongodb image is a tad complicated however these are the steps I took to successfully enable authentication.

```bash
docker-compose up
```

Go into the mongodb container, 'k8sdb' in this case using the following command

```bash
docker exec -it k8sdb /bin/bash
```

Now create the database of your choice and add a user using the mongo-cli. Assign the user some roles if you will, using the roles array.

```bash
>>> mongo
>>> use names
>>> db.createUser({user: 'username', pwd: 'password', roles: []})
```
#### Connecting to the DB using mongoose
```js
mongoose.connect('mongodb://mongo:27017/names',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    user: 'username',
    pass: 'password'
}).then(() => console.log('Successfully connected to names DB))
.catch(err => console.log("Error connecting to names Db"))
```

It is easier to start a mongodb container without authentication and implement some authentication after building the project with <code>docker compose</code>.

<br/>

## Other topics to remember
- Environment variables
- Networks
- Pushing to a container repository like dockerhub.

# Where to, from here...
Practice k8s locally using <b>minikube</b> and then successfully create deployments on kubernetes clusters in the cloud using DigitalOcean or Linode.

<br/>

# Wanna try?
1. Download the docker-compose.yml file and simply run 
```bash
docker-compose up
```
Make sure you're in the directory that contains the docker-compose.yml file.

2. All codes can be found in the DevOps-Journey-* repositories.