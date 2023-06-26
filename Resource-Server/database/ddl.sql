CREATE DATABASE YahtzeeDB;

USE YahtzeeDB;

CREATE TABLE Users (
  user_id VARCHAR(20) NOT NULL,
  high_score INT NOT NULL
);

ALTER TABLE Users
ADD PRIMARY KEY (user_id);
