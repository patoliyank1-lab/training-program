/**
 * express Request Query type for pagination
 */
export interface reqQueryType {
  sortBy: string | undefined;
  page: string | undefined;
  limit: string | undefined;
  userId: string | undefined;
  likes: string | undefined;
}
