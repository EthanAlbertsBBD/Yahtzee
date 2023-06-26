USE YahtzeeDB;

DECLARE @i INT;
SET @i = 1;

WHILE @i <= 10
BEGIN
  INSERT INTO Users (user_id, high_score)
  VALUES (
    CONCAT('user_', @i),
    RAND() * 100
  );

  SET @i = @i + 1;
END;
