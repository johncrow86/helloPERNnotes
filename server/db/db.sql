CREATE DATABASE hellopernnotes;

\c hellopernnotes

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);
