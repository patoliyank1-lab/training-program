-- This is an empty migration.
-- GIN index for full-text search on the "searchVec" column in the "posts" table
CREATE INDEX idx_posts_fts ON posts USING GIN("searchVec");