-- Ryan Giard and Michael Hunter
-- CS 340 Group 91

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Data Definition Queries


-- Accounts
CREATE OR REPLACE TABLE Accounts (
    accountID INT(11) AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    registration_date DATETIME NOT NULL,
    last_login DATETIME,
    active_status BOOLEAN DEFAULT 1,
    PRIMARY KEY (accountID)
);

-- Characters

-- Classes

-- Guilds

-- Hats

-- Caracters_Hats


-- Sample Data Insert Statements


-- Accounts
INSERT INTO Accounts 
    (username, email, hashed_password, registration_date, last_login, active_status)
    VALUES
    ('johnsmith', 'johnsmith@hello.com', 'a8d9c02be774a12f', '2024-03-13', '2024-04-23 04:44:03', 0),
    ('buffwizard', 'buffwizard@hello.com', '8a9d9f0e4c5a9231', '2024-02-15', '2024-04-26 06:28:53', 0),
    ('alex456', 'alexgonzalez@hello.com', '92bae74f01ee87a7', '2024-03-02', '2024-05-01 09:38:27', 1),
    ('maxrebo', 'maxrebo@hello.com', '829dea6c8f032e77', '2024-04-20', '2024-04-28 12:14:16', 0);

-- Characters

-- Classes

-- Guilds

-- Hats

-- Characters_Hats

SET FOREIGN_KEY_CHECKS=1;
COMMIT;