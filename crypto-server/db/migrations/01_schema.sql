DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS liked_news CASCADE;
DROP TABLE IF EXISTS cryptos CASCADE;
DROP TABLE IF EXISTS liked_cryptos CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE news(
    id SERIAL PRIMARY KEY NOT NULL,
    news_url VARCHAR(255) NOT NULL
);

CREATE TABLE liked_news(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    news_url_id INTEGER REFERENCES news(id) ON DELETE CASCADE
);

CREATE TABLE cryptos(
    id SERIAL PRIMARY KEY NOT NULL,
    crypto_url VARCHAR(255) NOT NULL
);

CREATE TABLE liked_cryptos(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    crypto_url_id INTEGER REFERENCES cryptos(id) ON DELETE CASCADE
);

CREATE TABLE comments(
    id SERIAL PRIMARY KEY NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    news_url_id INTEGER REFERENCES news(id) ON DELETE CASCADE
);