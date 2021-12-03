const WebUrl = process.env.NODE_ENV==='development'? 'http://localhost:8080' : 'https://react-auth-example.herokuapp.com'

const Urls = {WebUrl}

module.exports = Urls
