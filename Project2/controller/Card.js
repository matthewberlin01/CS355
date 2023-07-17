const dbConnection = require('../database/connection');

class CardController{
    /****************************************************
     * function: GetCards                               *
     *                                                  *
     * description: This function performs a query on   *
     * the Card Table which will print out all of the   *
     * cards currently within the table.                *
     *                                                  *
     ***************************************************/
    static GetCards(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Card;`;
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
     * function: DisplaySimilarCards                    *
     *                                                  *
     * description: This function performs a query on   *
     * the Card table where it will print out all the   *
     * information on cards with a common name.         *
     *                                                  *
     ***************************************************/
    static DisplaySimilarCards(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Card WHERE name = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [context.params.name]
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
     * function: UpdateCard                             *
     *                                                  *
     * description: This function will update a certain *
     * card within the Card table based on the provided *
     * information for the card with the matching       *
     * primary key.                                     *
     *                                                  *
     ***************************************************/
    static UpdateCard(context){
        return new Promise((resolve, reject) =>{
            const card = context.request.body;
            const query = `
                            UPDATE Card
                            SET name = ?,
                                cardText = ?
                            WHERE cardNumber = ? and cardPack = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [card.name, card.cardText, context.params.cardNumber, context.params.cardPack]
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