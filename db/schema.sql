-- DATABASE trivias_db;

-- TABLE users
-- -id int NOT NULL AUTO_INCREMENT,
-- -username varchar(255) NOT NULL,
-- -email varchar(255) NOT NULL,
-- -password_hash varchar(255) NOT NULL,
-- -PRIMARY KEY (id)

-- TABLE trivias
-- -id int NOT NULL AUTO_INCREMENT,
-- -join_at date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- -score int default 0,
-- -catergory_name varchar(255) NOT NULL,
-- -difficulty varchar(255) NOT NULL,
-- -user_id INT NOT NULL,
-- -PRIMARY KEY (id),
-- -FOREIGN KEY (user_id) references users(id)

-- TABLE user_status
-- -user_id int NOT NULL,
-- -trivia_id int NOT NULL,
-- -FOREIGN KEY (user_id) references users(id),
-- -FOREIGN KEY (trivia_id) references trivias(id)


-- ex: table users
-- id: 1
-- username: JonS
-- email: test@test.com

-- password_hash:********


-- table trivias
-- catergory_name: science // I just added this if we get far to having a cateregor
-- difficulty: easy // same ^^
-- user_id:  this create relationship for user and user_status
-- score:0 // this is hidden until leaderboard is shown. 0 is default if the game is unfinish
-- join_at date: 03/07/17 // track our record

-- user_status
-- user_id
-- trivia_id
-- required relationship for user and and trivia

CREATE DATABASE trivias_db;
USE trivias_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE trivias
(
	id int NOT NULL AUTO_INCREMENT,
	date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	score int default 0,
	catergory_name varchar(255) NOT NULL,
	difficulty varchar(255) NOT NULL,
	user_id INT NOT NULL, 
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) references users(id)

);

CREATE TABLE user_status
	user_id int NOT NULL, 
	trivia_id int NOT NULL, 
	FOREIGN KEY (user_id) references users(id),
	FOREIGN KEY (trivia_id) references trivias(id)
);