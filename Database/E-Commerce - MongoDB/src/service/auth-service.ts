import User from "../models/user-model.js";
import type { UserType } from "../types/Types.js";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { createToken } from "../utils/JWT.js";
import { comparePassword, hashPassword } from "../utils/password.js";

export const authService = {
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
    const user = await User.findOne({ email }).select(
      "-refreshToken -loginStatus",
    );
    if (!user) {
      throw new ConflictError("Email is not register.");
    }

    const isSame = await comparePassword(pass, user.password);
    if (!isSame) {
      throw new BadRequestError("email or password incorrect.");
    }

    const accessToken = createToken(
      String(user._id),
      user.email,
      user.role,
      60 * 15, // expiry of access Token 15 min.
    );
    const refreshToken = createToken(String(user._id), user.email, user.role);

    user.refreshToken = refreshToken;
    user.loginStatus = true;

    await user.save();

    const userObj = user.toObject()

    const {
      password: _password,
      refreshToken: _r,
      loginStatus: _s,
      ...otherValue
    } = userObj;

    const response = {
      user: otherValue,
      accessToken,
      refreshToken,
    };
    return response;
  },
};
