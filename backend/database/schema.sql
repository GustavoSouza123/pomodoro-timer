CREATE TABLE tasks (
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	favorite BOOLEAN NOT NULL,
	active BOOLEAN NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE sessions (
	id INT PRIMARY KEY AUTO_INCREMENT,
	taskId INT NOT NULL,
	time INT NOT NULL,
	date TIMESTAMP NOT NULL DEFAULT NOW(),
	FOREIGN KEY (taskId) REFERENCES tasks(id)
);

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT NOW()
);