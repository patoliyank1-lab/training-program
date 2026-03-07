import axios from 'axios'

const json_url = process.env.JSON_URL ?? 'http://localhost:4000'  // if can't get JSON_URL from .env then give default value. 


/**
 * @description Registers a new user in the system.
 * @route POST /api/auth/register
 * @access Public
 * @async
 * 
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const registerUser = async (req, res, next) => {
  try {

    const { name, username, email, password, confirmpassword } = req.body

    if (!name || !username || !email || !password || !confirmpassword)
      throw res.status(400).send('all filed must required in valid format')

    if (!/^[a-z][a-z0-9_]{8,15}$/.test(username)) throw next({ message: 'Please Enter valid username.', statusCode: 400 })

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw next({ message: 'Please Enter valid email.', statusCode: 400 })

    // check email is already exist or not
    const alreadyHaveEmail = await axios.get(`${json_url}/user?email=${email}`)
    .then((value) => {
      if (value.data.length != 0) return true;
      return false;
    })
    if (alreadyHaveEmail) throw next({ message: 'This email is already resister', statusCode: 409 })

    // check username is already exist or not
    const alreadyUsername = await axios.get(`${json_url}/user?username=${username}`)
    .then((value) => {
      if (value.data.length != 0) return true;
      return false;
    })
    if (alreadyUsername) throw next({ message: 'This username is already resister', statusCode: 409 })


    if (password !== confirmpassword)
      throw next({ message: 'password and confirmassword must be same.', statusCode: 400 })

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

  } catch (error) {
    return next(error)
  }
}

/**
 * @description Login new user in the system.
 * @route POST /api/auth/login
 * @access Public
 * @async
 * 
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const loginUser = async (req, res, next) => {
  try {

    const { email, password } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw next({ message: 'Enter valid Email.', statusCode: 401 })

    if (!password) throw next({ message: 'password is required.', statusCode: 400 })

    // get user by email using json server
    const user = await axios.get(`${json_url}/user?email=${email}`).then((value) => value.data[0])


    if (user) {
      if (user.password === password) {
        const { password, ...otherValue } = user
        return res.status(200).json({
          success: true,
          status: 200,
          data: otherValue,
        })
      }
      throw next({ message: 'password is incorrect.', statusCode: 400 })
    }
    throw next({ message: 'user not found', statusCode: 404 })

  } catch (error) {
    return next(error)
  }
}

/**
 * @description get userprofile by email.
 * @route GET /api/auth/profile?email=
 * @access Public
 * @async
 * 
 * @param {object} req - The request object (Express request object).
 * @param {object} res - The response object (Express response object).
 * @param {function} next - The Express next function.
 * @returns {void}
 */
const getProfile = async (req, res, next) => {
  try {

    const { email } = req.query;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw next({ message: 'Enter valid Email.', statusCode: 401 })

    const user = await axios.get(`${json_url}/user?email=${email}`).then((value) => value.data[0])

    if (user) {
      const { password, ...otherValue } = user
      return res.status(200).json({
          success: true,
          status: 200,
          data: otherValue,
        })
    }
      throw next({ message: 'user not found', statusCode: 404 })

  } catch (error) {
    return next(error)
  }
}

export { registerUser, loginUser, getProfile }