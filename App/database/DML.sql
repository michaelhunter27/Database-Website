-- Ryan Giard and Michael Hunter
-- CS 340 Group 91



-- Accounts Queries (CRUD operations: Read and Create)

-- Get all accounts to display in table
SELECT * FROM Accounts;

-- Get ID and username to populate dropdown menu
SELECT accountID, username FROM Accounts;

-- Add new Account
INSERT INTO Accounts (username, email, hashed_password, registration_date, last_login, active_status)
VALUES (:username, :email, :hashed_password, :registration_date, :last_login, :active_status);



-- Classes Queries (CRUD operations: Read and Create)

-- Get all classes fot display in table
SELECT * FROM Classes;

-- Get ID and name to populate dropdown menu
SELECT classID, name FROM Classes;

-- Add new class
INSERT INTO Classes (name, description)
VALUES (:name, :description);



-- Guilds Queries (CRUD operations: Read and Create)

-- Get all guilds to display in table
SELECT * FROM Guilds;

-- Get ID and name to populate dropdown menu
SELECT guildID, name FROM Guilds;

-- Add new Guild
INSERT INTO Guilds (name, creation_date)
VALUES (:name, :creation_date);



-- Hat Queries (CRUD operations: Create, Read)

-- Get all hats to display in table
SELECT * FROM Hats;

-- Get ID and name to populate dropdown menu
SELECT hatID, name FROM Hats;

-- Add new hat
INSERT INTO Hats (name, description, rarity, price)
VALUES (:name, :description, :rarity, :price);



-- Characters Queries (CRUD operations: Create, Read, Update, Delete)

-- Query to add a new character
INSERT INTO Characters (accountID, name, level, classID, guildID) 
VALUES (:accountID, :name, :level, :classID, :guildID);

-- Query to get all characters to display in table
SELECT characterID, Accounts.username AS 'Username', Characters.name AS 'Name', level, IFNULL(Classes.name, 'None') AS 'Class', IFNULL(Guilds.name, 'None') AS 'Guild' FROM Characters
INNER JOIN Accounts ON Characters.accountID = Accounts.accountID
LEFT JOIN Classes ON Characters.classID = Classes.classID
LEFT JOIN Guilds ON Characters.guildID = Guilds.guildID;
-- LEFT JOINS because classID and guildID can be NULL

-- Query to get ID and name to populate dropdown menu
SELECT characterID, name FROM Characters;

-- Query to update a character
UPDATE Characters
SET accountID = :newAccountID, name = :newName, level = :newLevel, classID = :newClassID, guildID = :newGuildID
WHERE characterID = :characterID;

-- Query to delete a character
DELETE FROM Characters 
WHERE characterID = :characterID;



-- Characters_Hats Queries (CRUD operations: Create, Read, Update, Delete)

--Query to add a new hat to a character
INSERT INTO Characters_Hats (characterID, hatID)
VALUES (:characterID, :hatID);

-- Query to get all entries of intersection table
SELECT character_hatID AS 'ID', Characters.name AS 'Character', Hats.name AS 'Hat' FROM Characters_Hats
INNER JOIN Characters ON Characters_Hats.characterID = Characters.characterID
INNER JOIN Hats ON Characters_Hats.hatID = Hats.hatID;

-- Query to update character_hat entry
UPDATE Characters_Hats
SET characterID = :newCharacterID, hatID = :newHatID
WHERE character_hatID = :character_hatID;

--Query to remove a hat from a character
DELETE FROM Characters_Hats
WHERE characterID = :characterID
AND hatID = :hatID;
