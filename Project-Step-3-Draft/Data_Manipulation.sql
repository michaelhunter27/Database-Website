-- Query to add a new character
INSERT INTO Characters (accountID, name, level, classID, guildID) 
VALUES (:accountID, :name, :level, :classID, :guildID);

-- Query to update the character level
UPDATE Characters
SET level = :newLevel
WHERE characterID = :characterID;

-- Query to delete a character
DELETE FROM Characters 
WHERE characterID = :characterID;

--Query to add a new hat to a character
INSERT INTO Characters_Hats (characterID, hatID)
VALUES (:characterID, :hatID);

--Query to remove a hat from a character
DELETE FROM Characters_Hats
WHERE characterID = :characterID
AND hatID = :hatID;

--Query to update the character's guild
UPDATE Characters
SET guildID = :newGuildID
WHERE characterID = :characterID;