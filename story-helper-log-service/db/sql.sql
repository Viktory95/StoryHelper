CREATE TABLE IF NOT EXISTS story_helper_log.log (
            id uuid PRIMARY KEY,
            stAction text,
            stUser text,
            lDate text,
            tableName text,
            objectId uuid);