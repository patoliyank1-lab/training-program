import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../utils/error.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { AuthService } from '../service/authService.js'

const json_url = process.env.JSON_URL ?? 'http://localhost:4000'  // if can't get JSON_URL from .env then give default value. 


/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res, next) => {
  
  const { name, username, email, password } = req.body

  const response = await AuthService.register({name, username, email, password})

  if (response) res.status(201).json({
    success: true,
    status: 200,
    data: 'User Successfully register.'
  })

})

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password }: {email:string, password:string}  = req.body


  const response = await AuthService.login({email, pass:password})

  res.status(200).json({
    success: true,
    status: 200,
    data: response.user,
    token:response.token
  })
})

// /**
//  * @description get userprofile by id.
//  * @route GET /api/auth/profile?id=
//  * @access Public
//  */
// const getProfile = asyncHandler(async (req, res, next) => {
//   const { id } = req.query;

//   if (!id) throw new BadRequestError('Provide user id.')


// })

export { registerUser, loginUser }