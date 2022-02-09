require('dotenv').config()
import express,{Request, Response} from 'express';
import mongoose, {MongooseOptions, ConnectOptions} from 'mongoose';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = process.env.PORT || 8081;
const jwt_secret = process.env.JWT_SECRET;
const connectionURL = process.env.CONNECTION_URL || "connectionURL";

app.use(cors());
app.use(express.json());

// swagger doc gen initialized

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Authentication APIs',
        version: '1.0.0',
      },
      server: ['http://localhost:5000']
    },
    apis: ['./routes/*.js','./index.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(options);
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/',(req: Request, res: Response) => {
    res.redirect('/docs');
})

// mongoose.connect(connectionURL,{
//     useNewURLParser : true,
//     useUnifiedTopology : true
// }).then(()=>console.log('conneted to db'))
//   .catch((err)=>console.log(err))

mongoose.connect(connectionURL)
.then((res)=>console.log('Connected to db'))
.catch((err)=>console.log(err));

// Api Endpoints
 /**
   * @swagger
   * /test:
   *   get:
   *     description: testing api
   *     responses:
   *       200:
   *         description: yes! server is running
   */
app.get('/test',(req, res) => {
    res.status(200).send('yes! server is running');
})

app.listen(port,()=>{
    console.log('port is listening at 8000');
})