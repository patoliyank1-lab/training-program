import express from 'express';
import dotenv from 'dotenv'
import userRoute from './router/userRoute.js'
import postRoute from './router/postRoute.js'
import { errorHandler, requestLogger } from './middlewares/errorHandler.js';
import { callbackRouteForApi, callbackRouteForCallbackHell, callbackRouteForFAkeApi } from './AsyncPatterns/callback.js';
import { promiseRouteForApi, promiseRouteForFAkeApi } from './AsyncPatterns/promise.js';
import { asyncRouteForApi, asyncRouteForFAkeApi } from './AsyncPatterns/async.js';
import { blockingCode, nonBlockingCode } from './Worker/workerTask.js';

// config ENV variables
dotenv.config();

const port = process.env.PORT ?? 4000
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//custom middlewares 
app.use(requestLogger)

// routes
app.use('/api/auth', userRoute)
app.use('/api/post', postRoute)


//testing routes for  callback vs Promise vs async/await api calling.
app.use('/callback/fake-api', callbackRouteForFAkeApi )
app.use('/callback/real-api', callbackRouteForApi )
app.use('/callback/callback-hell', callbackRouteForCallbackHell )

app.use('/promise/fake-api', promiseRouteForFAkeApi )
app.use('/promise/real-api', promiseRouteForApi )

app.use('/async/fake-api', asyncRouteForFAkeApi )
app.use('/async/real-api', asyncRouteForApi )

//testing routes for blocking and non-blocking code.
app.use('/non-blocking', nonBlockingCode )
app.use('/blocking', blockingCode )

// root route
app.get('/', function (req, res) {
    res.send('home page')
});

app.use(errorHandler)

// listen on port 
app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});


