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
CREATE OR REPLACE TABLE Characters (
    characterID INT AUTO_INCREMENT,
    accountID INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    classID INT,
    guildID INT,
    PRIMARY KEY(characterID),
    FOREIGN KEY (accountID) REFERENCES Accounts(accountID),
    FOREIGN KEY (classID) REFERENCES Classes(classID),
    FOREIGN KEY (guildID) REFERENCES Guilds(guildID)
);

-- Classes
CREATE OR REPLACE TABLE Classes (
    classID INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (classID)
);

-- Guilds
CREATE OR REPLACE TABLE Guilds (
    guildID INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    creation_date DATE NOT NULL,
    PRIMARY KEY (guildID)
);

-- Hats
CREATE OR REPLACE TABLE Hats (
    hatID INT AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    rarity VARCHAR(255),
    price DECIMAL(10,2),
    PRIMARY KEY (hatID)
);


-- Caracters_Hats
CREATE OR REPLACE TABLE Characters_Hats (
    character_hatID INT AUTO_INCREMENT,
    characterID INT,
    hatID INT,
    PRIMARY KEY (character_hatID),
    FOREIGN KEY (characterID) REFERENCES Characters(characterID),
    FOREIGN KEY (hatID) REFERENCES Hats(hatID)
);


-- Sample Data Insert Statements


-- Accounts
INSERT INTO Accounts (
    username, 
    email, 
    hashed_password, 
    registration_date, 
    last_login, 
    active_status
)
VALUES
('johnsmith', 'johnsmith@hello.com', 'a8d9c02be774a12f', '2024-03-13', '2024-04-23 04:44:03', 0),
('buffwizard', 'buffwizard@hello.com', '8a9d9f0e4c5a9231', '2024-02-15', '2024-04-26 06:28:53', 0),
('alex456', 'alexgonzalez@hello.com', '92bae74f01ee87a7', '2024-03-02', '2024-05-01 09:38:27', 1),
('maxrebo', 'maxrebo@hello.com', '829dea6c8f032e77', '2024-04-20', '2024-04-28 12:14:16', 0);

-- Characters
INSERT INTO Characters (
    accountID, 
    name, 
    level, 
    classID, 
    guildID
)
VALUES 
((SELECT accountID FROM Accounts WHERE username = 'johnsmith'), 'Player1', 50, 1, (SELECT guildID FROM Guilds WHERE name = 'Coffin Break')),
((SELECT accountID FROM Accounts WHERE username = 'buffwizard'), 'Player2', 41, 4, NULL),
((SELECT accountID FROM Accounts WHERE username = 'alex456'), 'Player3', 19, 3, NULL),
((SELECT accountID FROM Accounts WHERE username = 'maxrebo'), 'Player4', 28, 2, (SELECT guildID FROM Guilds WHERE name = 'Sky Players'));

-- Classes
INSERT INTO Classes (
    name, 
    description
)
VALUES 
('Mage', 'Cast arcane spells to disrupt your enemy and inflict immense damage'),
('Warrior', 'Specializing in physical damage, this class is very well rounded'),
('Rogue', 'Hiding in the shadows, this class relies on the darkness to navigate'),
('Paladin', 'Drawing power from the light, this class allows you to both heal and deal damage');

-- Guilds
INSERT INTO Guilds (
    name
)
VALUES 
('Sky Players'),
('Coffin Break'),
('Deadly Empire'),
('Guild Mesh');

-- Hats
INSERT INTO Hats (
    name,
    description,
    rarity,
    price
)
VALUES
('Pointy Wizard Hat', 'Standard headwear for the magically inclined.', 'Common', 0),
('Pirate Bandana', 'Perfect for a seafaring scallywag, this will keep the hair out of your face as you loot and plunder.', 'Uncommon', 10),
('Helm of Arcandor', 'The helmet of the battlemage Arcandor still hums with magical energy.', 'Legendary', 10000);

-- Characters_Hats
INSERT INTO Characters_Hats (
    characterID,
    hatID
)
VALUES
((SELECT characterID FROM Characters WHERE name = 'Player1'), (SELECT hatID FROM Hats WHERE name = 'Pointy Wizard Hat')),
((SELECT characterID FROM Characters WHERE name = 'Player2'), (SELECT hatID FROM Hats WHERE name = 'Pirate Bandana')),
((SELECT characterID FROM Characters WHERE name = 'Player3'), (SELECT hatID FROM Hats WHERE name = 'Pointy Wizard Hat')),
((SELECT characterID FROM Characters WHERE name = 'Player1'), (SELECT hatID FROM Hats WHERE name = 'Helm of Arcandor'));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;