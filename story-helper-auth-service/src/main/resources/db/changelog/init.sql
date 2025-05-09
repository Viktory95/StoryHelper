USE story_helper_auth;
CREATE TABLE IF NOT EXISTS story_helper_auth.user (
            id uuid,
            username text PRIMARY KEY,
            password text,
            authorities text
            );
INSERT INTO story_helper_auth.user (  username ,  password,  authorities ) VALUES ('admin','$2a$10$H2QvKTwSyVvE/yA5dH4cquEaXyK9tCgBBZk6FSVH8v3WfD05zUEzK','user&amp;admin') IF NOT EXISTS;