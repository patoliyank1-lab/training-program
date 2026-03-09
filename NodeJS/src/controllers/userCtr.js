import axios from 'axios'
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/error.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const json_url = process.env.JSON_URL ?? 'http://localhost:4000'  // if can't get JSON_URL from .env then give default value. 


/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, username, email, password, confirmpassword } = req.body

    if (!name || !username || !email || !password || !confirmpassword)
      throw new BadRequestError('all filed must required in valid format')

    if (!/^[a-z][a-z0-9_]{8,15}$/.test(username)) throw new BadRequestError('Please Enter valid username.')

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new BadRequestError('Please Enter valid email.')

    // check email is already exist or not
    const alreadyHaveEmail = await axios.get(`${json_url}/user?email=${email}`)
      .then((value) => {
        if (value.data.length != 0) return true;
        return false;
      })
    if (alreadyHaveEmail) throw new ConflictError('This email is already resister')

    // check username is already exist or not
    const alreadyUsername = await axios.get(`${json_url}/user?username=${username}`)
      .then((value) => {
        if (value.data.length != 0) return true;
        return false;
      })
    if (alreadyUsername) throw new ConflictError('This username is already resister')


    if (password !== confirmpassword)
      throw new ConflictError('password and confirmassword must be same.')

    const user = {
      name,
      username,
      email,
      password,
      createAt: new Date().toISOString()
    }

    axios.post(`${json_url}/user/`, user).then((value) => {
      res.status(201).json({
        success: true,
        status: 201,
        data: value.data,
      });
    })

})

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new BadRequestError('Enter valid Email.')

    if (!password) throw new BadRequestError('password is required.')

    // get user by email using json server
    const user = await axios.get(`${json_url}/user?email=${email}&password=${password}`)
      .then((value) => value.data[0])
      .catch(() => { throw new UnauthorizedError('password or email is incorrect.') })
      
      if(user){
        const { password, ...otherValue } = user
        return res.status(200).json({
          success: true,
          status: 200,
          data: otherValue,
        })
      }

      throw new UnauthorizedError('password or email is incorrect.') 
})

/**
 * @description get userprofile by id.
 * @route GET /api/auth/profile?id=
 * @access Public
 */
const getProfile = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    if (!id) throw new BadRequestError('Provide user id.')

    const user = await axios.get(`${json_url}/user?id=${id}`)
      .then((value) => value.data[0])
      .then((value) => {
        const { password, ...otherValue } = value
        return res.status(200).json({
          success: true,
          status: 200,
          data: otherValue,
        })
      })
      .catch(() => { throw new NotFoundError('user profile not found.') })
})

export { registerUser, loginUser, getProfile }