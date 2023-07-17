USE mberlin_cs355fa22;

DROP FUNCTION IF EXISTS fn_FindMissingCards;

DELIMITER //

CREATE FUNCTION fn_FindMissingCards
(
	collectorID varchar(10),
    currentCardPack varchar(20)
)

RETURNS int

BEGIN
DECLARE currentCardNumber int;
DECLARE missingCardNumber int;
    
    SELECT Count(card)
    INTO currentCardNumber
    FROM Collector_Card as theCollector
    WHERE collector = collectorID and cardPack = currentCardPack;
    
    SELECT Count(cardNumber)
    INTO missingCardNumber
    FROM Card as thePack
    WHERE cardPack = currentCardPack;
    
    RETURN missingCardNumber - currentCardNumber;
END //
DELIMITER ;
