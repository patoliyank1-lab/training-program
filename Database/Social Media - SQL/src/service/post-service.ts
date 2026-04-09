import { prisma } from "@/config/database-connection.js";
import { AppError, UnknownError } from "@/utils/errorHandler.js";

export const getPostByHashtag = async (tag: string) => {
  try {
    // find teg id by teg name
    const tagId = await prisma.hashtag.findFirst({
      where: {
        tagText: {
          contains: tag,
          mode: "insensitive",
        },
      },
    });

    if (!tagId) throw new AppError("Teg not found!!", 404);

    const temp = await prisma.postHashtag.findMany({
      where: { hashtagId: tagId.id },
    });
    const postIds = temp.map((i) => i.postId);

    if (postIds.length == 0)
      throw new AppError("their is not post with this teg", 404);

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postIds,
        },
      },
    });
    return posts;
  } catch (error) {
    throw new UnknownError(error);
  }
};

export const getPostBySearch = async (search: string) => {
  try {
    // find teg id by teg name
    const posts = await prisma.post.findFirst({
      where: {
        contentText: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    return posts;
  } catch (error) {
    throw new UnknownError(error);
  }
};
