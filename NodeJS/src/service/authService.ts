import User from "../models/User.js";
import { BadRequestError, ConflictError } from "../utils/error.js";

interface newUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const AuthService = {


  register: async (user: newUser) => {

    //Email check
    const emailUser = await User.findOne({ email: user.email });
    if (emailUser) {
      throw new ConflictError("This email is already resister");
    }

    //username check
    const alreadyUsername = await User.findOne({ username: user.username });
    if (alreadyUsername) {
      throw new ConflictError("This username is already resister");
    }

    const newUser = new User(user)
    return await newUser.save()
  },

  login: async ({email, pass}: {email:string, pass:string}) => {

    //Email check
    const user = await User.findOne({ email });
    if (!user) {
      throw new ConflictError("Email is not register.");
    }
    /**@Error (when password and email is correct then this Error also throw with result but sussefully get result in unexpected format ) */
    if(user.password !== pass){
      throw new BadRequestError('email or password incorrect.')
    }
const {password, ...otherValue} = user
    return otherValue ;
  },
};
