UPDATE "posts"
SET "searchVec" =
    setweight(
        to_tsvector('english', coalesce("contentText", '')),
        'B'
    )
WHERE "deletedAt" IS NULL;