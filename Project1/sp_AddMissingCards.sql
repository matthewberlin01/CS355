USE mberlin_cs355fa22

DROP PROCEDURE IF EXISTS sp_AddMissingCards;

DELIMITER //

CREATE PROCEDURE sp_AddMissingCards(theCollector varchar(10), theCardPack varchar(20))
BEGIN
    DECLARE cardCount int Default 0;
    DECLARE currentIndex int Default 0;
    DECLARE currentCard int Default 0; 
    
    -- Get Number of cards in a certain pack
    SELECT COUNT(*) INTO cardCount FROM Card Where cardPack = theCardPack; 
    
    -- Loop through number of Instructors
    WHILE currentIndex < cardCount DO
		-- update currentCard to the next card from Collector_Card
		SELECT card INTO currentCard FROM Collector_Card LIMIT currentIndex,1;
    
        -- as 
        If currentCard not in (Select card From Collector_Card Where collector = theCollector and cardPack = theCardPack) Then
			Insert into Collector_Card values(theCollector, currentCard, theCardPack);
        End If;
        
        -- Increase the counter
        SET currentIndex = currentIndex + 1;
END WHILE;
END //
DELIMITER ;
