ALTER TABLE IF EXISTS webttrpg.game
    ADD COLUMN IF NOT EXISTS img_map_base_64 text;

update webttrpg.game set img_map_base_64 = 'data:image/png;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';

ALTER TABLE IF EXISTS webttrpg.game
    ALTER COLUMN img_map_base_64 SET NOT NULL;