### Single Token Authentication using Nodejs & MongoDb

APIS handled by in <a href="https://react-auth-example.herokuapp.com/">Frontend</a> | Frontend Repo : <a href="https://github.com/Amarpsp10/react-auth-example">Link</a>

### Add .env variables

<table>
  <th>Variable Name</th><th>Meaning</th>
  <tr><td>CONNECTION_URL</td> <td>MongoDb Connection URL</td></tr>
  <tr><td>JWT_SECRET</td> <td>Create new secret for sign jwt token</td></tr>
  <tr><td>PORT</td> <td>App listening port</td></tr>
  <tr><td>EMAIL</td> <td>Account email for sending email to users</td></tr>
  <tr><td>PASSWORD</td> <td>Account password to authenticate</td></tr>
</table>

It's recommanded to create email account for sending email other then gmail provider to avoid failure.
<hr/>

### Run project locally
Run command in terminal

    npm install && npm start
<hr/>

### Run with Doker <img width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" alt="docker"/>

1. Run command in root directory to build image

       docker build . -t auth-api-image
      
2. Start Container 

       docker run -p 5000:5000 --name auth-api-container-name auth-api-image
       
      project is started at `localhost` at port `5000`.
