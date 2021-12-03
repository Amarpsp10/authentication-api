const WebUrl = process.env.NODE_ENV==='development'? 'http://localhost:8080' : 'https://authentication-example-api.herokuapp.com'

const Urls = {WebUrl}

module.exports = Urls