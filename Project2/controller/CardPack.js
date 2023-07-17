const dbConnection = require('../database/connection');

class CardPackController{
    /****************************************************
     * Function: GetCardPacks                           *
     *                                                  *
     * Description: Prints out the CardPack table.      *
     *                                                  *
     ***************************************************/
    static GetCardPacks(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM CardPack;`;
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
     * Function: GetCardPackByID                        *
     *                                                  *
     * Description: Prints out all the card packs from  *
     * the CardPack table that have the specified       *
     * primary key.                                     *
     ***************************************************/
    static GetCardPackByID(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM CardPack WHERE seriesNumber = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [context.params.seriesNumber]
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

module.exports = CardPackController;