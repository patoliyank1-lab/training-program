import { asyncHandler } from "@/utils/async-handler.js";
import * as postService from "../service/post-service.js";
import * as searchService from "../service/search-service.js";
import { formattedResponse } from "@/utils/response.js";

/**
 * get post by hashTags
 */
export const getPostByHashtag = asyncHandler(async (req, res) => {
  const { tag } = req.body;
  const result = await postService.getPostByHashtag(tag);
  formattedResponse(res, 200, result);
});

/**
 * get post by search in post's context
 */
export const getPostBySearch = asyncHandler(async (req, res) => {
  const { search } = req.body;
  const result = await postService.getPostBySearch(search);
  formattedResponse(res, 200, result);
});

/**
 * full text search by using hashtag, context and mention
 * with priority A : hashtags, B: postContext, C: mention
 */
export const searchPosts = asyncHandler(async (req, res) => {
  const { search, limit, offset } = req.body;
  const result = await searchService.searchPosts(
    search,
    limit && limit,
    offset && offset,
  );
  formattedResponse(res, 200, result);
});
