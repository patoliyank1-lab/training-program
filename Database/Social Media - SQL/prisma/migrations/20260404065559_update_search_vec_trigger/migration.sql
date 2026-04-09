-- This is an empty migration.
CREATE OR REPLACE FUNCTION posts_search_vec_update()
RETURNS TRIGGER AS $$
BEGIN
    NEW."searchVec" :=
        -- weight A: hashtags (highest)
        setweight(
            to_tsvector('english', coalesce(
                (
                    SELECT string_agg(h."tagText", ' ')
                    FROM   "post_hashtags" ph
                    JOIN   "hashtags"      h ON h.id = ph."hashtagId"
                    WHERE  ph."postId" = NEW.id
                ),
                ''
            )),
            'A'
        ) ||
        -- weight B: post content text
        setweight(
            to_tsvector('english', coalesce(NEW."contentText", '')),
            'B'
        ) ||
        -- weight C: mentioned usernames
        setweight(
            to_tsvector('english', coalesce(
                (
                    SELECT string_agg(u."username", ' ')
                    FROM   "post_mentions" pm
                    JOIN   "users"         u ON u.id = pm."mentionedUserId"
                    WHERE  pm."postId" = NEW.id
                ),
                ''
            )),
            'C'
        );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;