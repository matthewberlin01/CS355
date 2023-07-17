const dbConnection = require('../database/connection');

class CardController{
    /****************************************************
     * Function: GetCollectorCards                      *
     *                                                  *
     * Description: Prints out all the tuples from the  *
     * Collector_Card table.                            *
     *                                                  *
     ***************************************************/
    static GetCollectorCards(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Collector_Card;`;
            dbConnection.query(query, (error, result) =>{
                if(error){
                    reject(error);
                }
                context.body = result;
                context.status = 200;
                resolve();
            })
        });
    }

    /****************************************************
     * Function: FindSimilarCollectorCollections        *
     *                                                  *
     * Description: Given a certain collectorID, this   *
     * function prints out the information of all other *
     * collectors that have the same cards in their     *
     * collections.                                     *
     *                                                  *
     ***************************************************/
    static FindSimilarCollectorCollections(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT fName, lName, street, city, state, zip 
                            FROM Collector 
                            Where collectorID in( 
                                SELECT collector 
                                FROM Collector_Card 
                                Where card in 
                                    (SELECT card 
                                    FROM Collector_Card 
                                    Where cardPack in(
                                        SELECT cardPack 
                                        FROM Collector_Card 
                                        WHERE collector = ?) and collector = ?) and cardPack in(
                                            SELECT cardPack 
                                            FROM Collector_Card 
                                            WHERE collector = ?
                            )) and collectorID <> ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [context.params.collector, context.params.collector, context.params.collector, context.params.collector]
                }, (error, result) =>{
                    if(error){
                        reject(error);
                    }
                    context.body = result;
                    context.status = 200;
                    resolve();
                });
        });
    }

    /****************************************************
     * Function: AddCollectorCard                       *
     *                                                  *
     * Description: Inserts a new tuple into the        *
     * Collector_Card table, as long as input arguments *
     * aren't already existing within the table.        *
     *                                                  *
     ***************************************************/
    static AddCollectorCard(context){
        return new Promise((resolve, reject) =>{
            const collectorCard = context.request.body;
            const query = `
                            INSERT INTO Collector_Card
                            VALUES (?, ?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [collectorCard.collector, collectorCard.card, collectorCard.cardPack]
                }, (error, result) =>{
                    if(error){
                        reject(error);
                    }
                    context.body = result;
                    context.status = 200;
                    resolve();
                });
        });
    }
}

module.exports = CardController;