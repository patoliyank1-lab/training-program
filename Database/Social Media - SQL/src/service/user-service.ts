import { prisma } from "../config/database-connection.js";
import { type ProfileType, type SettingType } from "../types/Types.js";
import { AppError, UnknownError } from "../utils/errorHandler.js";

/**
 * create user Profile with default setting and stats
 * @param profileDetails user details with userId
 * @returns return object of profile, setting, stats's details
 */
export const createProfile = async (profileDetails: ProfileType) => {
  try {
    // create profile.
    const profile = await prisma.userProfile.create({
      data: profileDetails,
    });
    const setting = await prisma.userSettings.create({
      data: { userId: profileDetails.userId },
    });
    const stats = await prisma.userStats.create({
      data: { userId: profileDetails.userId },
    });
    return { profile, setting, stats };
  } catch (error) {
    throw new UnknownError(error);
  }
};

/**
 * update user's details
 * @param setting user's setting details
 * @Error Line - 41 
 */
export const updateSetting = async (setting: SettingType) => {
  try {
    const { userId, ...rest } = setting;
    if (!setting.userId || Object.keys(setting).length === 1)
      throw new AppError("Minimum 1 setting details given ", 400);

    const newSetting = await prisma.userSettings.update({
      where: { userId: userId },
      data:rest,
    });
    return newSetting;
  } catch (error) {
    throw new UnknownError(error);
  }
};

