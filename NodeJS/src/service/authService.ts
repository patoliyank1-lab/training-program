import Follow from "../models/followers.js";
import User from "../models/User.js";
import { BadRequestError, ConflictError } from "../utils/error.js";
import { createToken } from "../utils/JWT.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { RegisterEmailQ } from "../utils/QueueJobs/Queue/Queue.js";

interface newUser {
  name: string;
  email: string;
  username: string;
  phone?: string;
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

    user.password = await hashPassword(user.password);

    const newUser = new User(user);
    const resUser = (await newUser.save()).toObject();
    await RegisterEmailQ(newUser.email, String(newUser._id), newUser.role);

    const follow = new Follow({ userId: newUser._id });
    await follow.save();

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
