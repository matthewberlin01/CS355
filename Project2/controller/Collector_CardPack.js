const dbConnection = require('../database/connection');

class CollectorCardPackController{
    /****************************************************
     * Function: GetCollectorCardPacks                  *
     *                                                  *
     * Description: Prints out all the tuples within    *
     * the Collector_CardPack table.                    *
     *                                                  *
     ***************************************************/
    static GetCollectorCardPacks(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Collector_CardPack;`;
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
     * Function: AddCollectorCardPack                   *
     *                                                  *
     * Description: Inserts a tuple into the            *
     * Collector_CardPack table, as long as the input   *
     * doesn't already exist within the table.          *
     *                                                  *
     ***************************************************/
    static AddCollectorCardPack(context){
        return new Promise((resolve, reject) =>{
            const collectorCardPack = context.request.body;
            const query = `
                            INSERT INTO Collector_CardPack
                            VALUES (?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [collectorCardPack.collector, collectorCardPack.cardPack]
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
     * Function: RemoveCollectorCardPack                *
     *                                                  *
     * Description: Deletes a tuple from the            *
     * Collector_CardPack table based on the primary    *
     * key specified.                                   *
     *                                                  *
     ***************************************************/
    static RemoveCollectorCardPack(context){
        return new Promise((resolve, reject) =>{
            const query = `DELETE FROM Collector_CardPack WHERE collector = ? and cardPack = ?;`;
            dbConnection.query(
            {
                sql: query,
                values: [context.params.collector, context.params.cardPack]
            }, (error, result) =>{
                if(error){
                    reject(error)
                    context.body = result;
                    context.status = 200;
                    resolve();
                }
            });
        });
    }
}

module.exports = CollectorCardPackController;