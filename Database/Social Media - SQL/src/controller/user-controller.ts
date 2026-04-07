import { asyncHandler } from "@/utils/async-handler.js";
import * as userService from "../service/user-service.js";
import type { ProfileType, SettingType } from "@/types/Types.js";
import { formattedResponse } from "@/utils/response.js";

/**
 * create userProfile with default setting
 */
export const createProfile = asyncHandler(async (req, res) => {
  const data: ProfileType = req.body;
  const response = await userService.createProfile(data);
  formattedResponse(res, 201, response);
});

/**
 * update user's setting
 */
export const updateSetting = asyncHandler(async (req, res) => {
  const data: SettingType = req.body;
  const response = await userService.updateSetting(data);
  formattedResponse(res, 201, response);
});

/**
 * rank user by post count
 */
export const rankUserByPost = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) as number | undefined;
  const offset = Number(req.query.offset) as number | undefined;
  const response = await userService.rankUserByPost(
    limit && limit,
    offset && offset,
  );
  formattedResponse(res, 201, response);
});

/**
 * top posts by likeCount
 */
export const topPostByLike = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) as number | undefined;
  const offset = Number(req.query.offset) as number | undefined;
  const response = await userService.topPostByLike(
    limit && limit,
    offset && offset,
  );
  formattedResponse(res, 201, response);
});

/**
 * get all user last post context
 */
export const getAllUserLastPost = asyncHandler(async (req, res) => {
  const response = await userService.getAllUserLastPost();
  formattedResponse(res, 201, response);
});
