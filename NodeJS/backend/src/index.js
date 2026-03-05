import express from 'express';
import dotenv from 'dotenv'
import userRoute from './router/userRoute.js'
import postRoute from './router/postRoute.js'
import { errorHandler, requestLogger } from './middlewares/errorHandler.js';

// config ENV variables
dotenv.config();

const port = process.env.PORT ?? 4000
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//custom middlewares 
app.use(requestLogger)
app.use(errorHandler)

// routes
app.use('/user', userRoute)
app.use('/post', postRoute)

// root route
app.get('/', function (req, res) {
    res.send('home page')
});

// listen on port 
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


