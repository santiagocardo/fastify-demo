CREATE TABLE notes (
  id serial NOT NULL PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  created_at timestamp NOT NULL default now(),
  updated_at timestamp NOT NULL default now()
);