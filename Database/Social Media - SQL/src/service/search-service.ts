import { prisma } from "@/config/database-connection.js";
import type { SearchResult } from "@/types/Types.js";

export const searchPosts = async (
    query: string,
    limit: number = 20,
    offset: number = 0,
): Promise<SearchResult[]> => {
    if (!query.trim()) return [];
    const results = await prisma.$queryRaw<SearchResult[]>`
    SELECT
      p.id,
      p."contentText",
      p."createdAt",
      u.username,
      up."displayName",
      ps."likeCount",
      ps."commentCount",
      ts_rank(p."searchVec", websearch_to_tsquery('english', ${query})) AS "relevanceScore"
    FROM   "posts"         p
    JOIN   "users"         u  ON u.id       = p."userId"
    JOIN   "user_profiles" up ON up."userId" = p."userId"
    JOIN   "post_stats"    ps ON ps."postId" = p.id
    WHERE  p."searchVec"  @@ websearch_to_tsquery('english', ${query})
      AND  p.status       = 'published'
      AND  p.visibility   = 'public'
      AND  p."deletedAt"  IS NULL
    ORDER  BY "relevanceScore" DESC,
              ps."likeCount"   DESC
    LIMIT  ${limit}
    OFFSET ${offset}
  `;

    return results;
};
