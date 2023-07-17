# Mern todo

# Prerequisites
Before getting started, make sure you have the following installed on your system:
Node.js
npm or yarn

# Installation
1)Clone the repository into your local machine using the command below:

```bash
git clone https://github.com/mrjohn514/merntodo.git
```

2)Navigate to the root directory of the cloned repository.

```bash
cd <repository-name>
example:
PS C:\Users\john doe\Desktop\New folder\merntod>
```
3)Install the dependencies

i) client dependencies 

```bash
cd client
example => C:\Users\john doe\Desktop\New folder\merntod\client>
npm install
```

ii) server dependencies

```bash
cd server
example ==>C:\Users\john doe\Desktop\New folder\merntod\server>
npm install
```


4)Update the values in the .env file with your own configuration.

in .env update these keys accordingly
```bash

JWT_SECRET_KEY='blahsomething'
MONGOURL='mongodb://localhost/merntodo'
```



# Running the API server
To run the API server, use the command below:

```bash
cd server
example ==>C:\Users\john doe\Desktop\New folder\merntod\server>
nodemon index.js
```
The above command will start the server and you should see output similar to the one below:

Listening on port 5000
You can then access the API server from your web browser or using tools like curl or postman.


# Running the client server
To run the client server, use the command below:

```bash
cd client
example ==>C:\Users\john doe\Desktop\New folder\merntod\client>
npm start
```
The above command will start the server and you should see output on the port 3000

```bash
type http://localhost:3000 in the browser 
```

Now interact with the ui 


# all apis detailed documentaion for server is below
```bash
https://documenter.getpostman.com/view/21366405/2s93sgWAAt
```



