import User from "../models/user-model.js";
import type { UserType } from "../types/Types.js";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { createToken } from "../utils/JWT.js";
import { comparePassword, hashPassword } from "../utils/password.js";


export const AuthService = {
  register: async (user: UserType) => {
    //Email check
    const emailUser = await User.findOne({ email: user.email });
    if (emailUser) {
      throw new ConflictError("This email is already resister");
    }

    user.password = await hashPassword(user.password);

    const newUser = new User(user);
    const resUser = (await newUser.save()).toObject();

    // return true or false
    const { password: _password, ...otherValue } = resUser;

    const response = {
      user: otherValue,
    };
    return response;
  },

  login: async ({ email, pass }: { email: string; pass: string }) => {
    //Email check
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new ConflictError("Email is not register.");
    }

    const isSame = await comparePassword(pass, user.password);
    if (!isSame) {
      throw new BadRequestError("email or password incorrect.");
    }
    const { password: _password, ...otherValue } = user;

    const token = createToken(String(user._id), user.email, user.role);

    const response = {
      user: otherValue,
      token,
    };
    return response;
  },
};
