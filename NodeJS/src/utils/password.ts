import bcrypt from "bcrypt";
const saltRounds = 10;

/**
 * this function is give hash value of given password.
 * @param password password in string formats.
 * @returns hash value of given password
 */
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

/**
 * this function is compare given password and hash value.
 * @param password password in string type
 * @param hash hash value which is compare with password
 * @returns if password mach with hash value then return true otherwise return false.
 */
export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
