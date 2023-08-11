-- notes for the database will go here
-- run these tabels and alter table statement
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(100) NOT NULL
);

CREATE TABLE "favs" (
"id" SERIAL PRIMARY KEY, 
"user_id" INT REFERENCES "user" ("id"),
"url" VARCHAR (800) NOT NULL,
"comments" VARCHAR (500)
);
-- table to add rating column in favorites
ALTER TABLE "favs"
ADD COLUMN "rating" INT;

-- test for get request inserts
INSERT INTO "favs" ("user_id", "url", "comments")
VALUES (1, 'https://media3.giphy.com/media/CWOaf2u5dZ30I/giphy.gif?cid=be1a60cftzc9b6fgzlj5id1nu4zp090izu4lt1zhjgem68bw&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g', 'this one is funny'),
(1, 'https://media2.giphy.com/media/l46Cva0urAOSsLPG0/giphy.gif?cid=be1a60cftzc9b6fgzlj5id1nu4zp090izu4lt1zhjgem68bw&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g', 'I saw this one and thought of you!'), 
(1, 'https://media1.giphy.com/media/26n7aDOiWJJckm2pq/giphy.gif?cid=be1a60cftzc9b6fgzlj5id1nu4zp090izu4lt1zhjgem68bw&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g', 'what even is this lol'),
(1, 'https://media0.giphy.com/media/ihSSDIspSwEp2CTT6K/giphy.gif?cid=be1a60cftzc9b6fgzlj5id1nu4zp090izu4lt1zhjgem68bw&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g', 'hahaha'), 
(1, 'https://media2.giphy.com/media/Jri8aRpIIgFn7V95ef/giphy.gif?cid=be1a60cftzc9b6fgzlj5id1nu4zp090izu4lt1zhjgem68bw&amp;ep=v1_gifs_search&amp;rid=giphy.gif&amp;ct=g', 'this one is crazy');
