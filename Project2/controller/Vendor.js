const dbConnection = require('../database/connection');

class VendorController{
    /****************************************************
     * Function: GetVendors                             *
     *                                                  *
     * Description: Prints out all the tuples of the    *
     * Vendor table.                                    *
     *                                                  *
     ***************************************************/
    static GetVendors(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Vendor;`;
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
     * Function: ViewInventory                          *
     *                                                  *
     * Description: Prints out the result of the view   *
     * view_Inventory, which prints out all the         *
     * vendor's within the database and the card packs  *
     * they sell as well as how many card packs they    *
     * have in stock, grouped based on vendor and card  *
     * pack.                                            *
     *                                                  *
     ***************************************************/
    static ViewInventory(context){
        return new Promise((resolve, reject) =>{
            const collectorCardPack = context.request.body;
            const query = `SELECT * FROM view_Inventory;`;
            dbConnection.query(query, (error, result) =>{
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
     * Function: RemoveVendor                           *
     *                                                  *
     * Description: Deletes a tuple from the Vendor     *
     * table based on the vendorID specified.           *
     *                                                  *
     ***************************************************/
    static RemoveVendor(context){
        return new Promise((resolve, reject) =>{
            const query = `DELETE FROM Vendor WHERE vendorID = ?;`;
            dbConnection.query(
            {
                sql: query,
                values: [context.params.vendorID]
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

module.exports = VendorController;