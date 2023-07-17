const dbConnection = require('../database/connection');

class CollectorController{
    /****************************************************
     * Function: GetCollectors                          *
     *                                                  *
     * Description: Prints out all the tuples from the  *
     * Collector table.                                 *
     *                                                  *
     ***************************************************/
    static GetCollectors(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Collector;`;
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
     * Function: FindMissingCards                       *
     *                                                  *
     * Description: Prints out the result of the        *
     * function fn_FindMissingCards, which will print   *
     * the number of cards a collector is missing from  *
     * a certain cardPack, given a collectorID and a    *
     * seriesNumber as the input.                       *
     *                                                  *
     ***************************************************/
    static FindMissingCards(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT fn_FindMissingCards(?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [context.params.collectorID, context.params.cardPack]
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
     * Function: GetCollectorByID                       *
     *                                                  *
     * Description: Prints out all the tuples that have *
     * the corresponding collectorID.                   *
     *                                                  *
     ***************************************************/
    static GetCollectorByID(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Collector WHERE collectorID = ?;`;
            dbConnection.query(
                {
                    sql:query,
                    values: [context.params.collectorID]
                }, (error, result) =>{
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
     * Function: UpdateCollector                        *
     *                                                  *
     * Description: Updates a collector's information   *
     * in the Collector table based on the information  *
     * provided for the specified primary key.          *
     *                                                  *
     ***************************************************/
    static UpdateCollector(context){
        return new Promise((resolve, reject) =>{
            const collector = context.request.body;
            const query = `
                            UPDATE Collector
                            SET fName = ?,
                                lName = ?,
                                street = ?,
                                city = ?,
                                state = ?,
                                zip = ?
                            WHERE collectorID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [collector.fName, collector.lName, collector.street, collector.city, collector.state, collector.zip, context.params.collectorID]
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

module.exports = CollectorController;