import express from 'express'
import { blockingCode, nonBlockingCode } from './utils/Worker/workerTask.js'
import { callbackRouteForApi, callbackRouteForCallbackHell, callbackRouteForFAkeApi } from './utils/AsyncPatterns/callback.js'
import { promiseRouteForApi, promiseRouteForFAkeApi } from './utils/AsyncPatterns/promise.js'
import { asyncRouteForApi, asyncRouteForFAkeApi } from './utils/AsyncPatterns/async.js'
import APIrouter from './router/index.route.js'

const router = express.Router()


router.use('/api', APIrouter)


// testing routes for  callback vs Promise vs async/await api calling.
router.use('/callback/fake-api', callbackRouteForFAkeApi )
router.use('/callback/real-api', callbackRouteForApi )
router.use('/callback/callback-hell', callbackRouteForCallbackHell )

router.use('/promise/fake-api', promiseRouteForFAkeApi )
router.use('/promise/real-api', promiseRouteForApi )

router.use('/async/fake-api', asyncRouteForFAkeApi )
router.use('/async/real-api', asyncRouteForApi )

//testing routes for blocking and non-blocking code.
router.use('/non-blocking', nonBlockingCode )
router.use('/blocking', blockingCode )


export default router
