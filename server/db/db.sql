-- Drop the current setup for clean reload.
DROP DATABASE IF EXISTS hellopernnotes;
DROP ROLE IF EXISTS hellopernnotesuser;

-- Initial Load Start.
CREATE DATABASE hellopernnotes;

\c hellopernnotes

-- Data Tables
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

-- User Roles. Enforces role-based-access-control on the database layer
CREATE ROLE hellopernnotesuser LOGIN PASSWORD 'hellopernnotesuser';
GRANT ALL ON notes TO hellopernnotesuser;
GRANT USAGE, SELECT ON notes_id_seq TO hellopernnotesuser;


-- Mock Data
INSERT INTO notes (description)
VALUES ('This is a note'),
       ('This is another note'),
       ('The last note');
