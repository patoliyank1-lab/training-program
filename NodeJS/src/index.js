import express from 'express';
import dotenv from 'dotenv'
import { errorHandler, requestLogger } from './middlewares/errorHandler.js';
import { connectDB } from './config/db.connect.js'
import  route  from './route.js';


// config ENV variables
dotenv.config();

const port = process.env.PORT ?? 4000
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//custom middlewares 
app.use(requestLogger)


// root route
app.use('/',route )
app.use(errorHandler)

connectDB()
// listen on port 
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


