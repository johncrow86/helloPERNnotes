-- Drop the current setup for clean reload
DROP DATABASE IF EXISTS hellopernnotes;
DROP ROLE IF EXISTS hellopernnotesuser;

-- Initial Load Start
CREATE DATABASE hellopernnotes;

\c hellopernnotes

-- Data Tables
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users (id),
    description TEXT NOT NULL
);

-- User Roles (Enforces role-based-access-control on the database layer)
CREATE ROLE hellopernnotesuser LOGIN PASSWORD 'hellopernnotesuser';
GRANT ALL ON notes TO hellopernnotesuser;
GRANT USAGE, SELECT ON notes_id_seq TO hellopernnotesuser;
GRANT ALL ON users TO hellopernnotesuser;
GRANT USAGE, SELECT ON users_id_seq TO hellopernnotesuser;

-- The following code block will import the pgcrypto module and implement a trigger function which will automatically hash all passwords
-- Disable this block if passwords are hashed at the server layer
/*
CREATE EXTENSION pgcrypto;
CREATE OR REPLACE FUNCTION hash_password() RETURNS TRIGGER AS $$
BEGIN
    NEW.password := crypt(NEW.password, gen_salt('bf'));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER hash_password_trigger BEFORE INSERT ON users FOR EACH ROW EXECUTE FUNCTION password();
*/

-- Mock Data
INSERT INTO users (id, username, password)
VALUES (1, 'user1', 'pass1'),
       (2, 'user2', 'pass2');

INSERT INTO notes (user_id, description)
VALUES (1, 'This is a note by 1'),
       (2, 'This is another note by 2'),
       (2, 'The last note by 2');
