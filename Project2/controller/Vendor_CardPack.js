const dbConnection = require('../database/connection');

class VendorCardPackController{
    /****************************************************
     * Function: GetVendorCardPacks                     *
     *                                                  *
     * Description: Prints out all the tuples of the    *
     * Vendor_CardPack table.                           *
     *                                                  *
     ***************************************************/
    static GetVendorCardPacks(context){
        return new Promise((resolve, reject) =>{
            const query = `SELECT * FROM Vendor_CardPack;`;
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
     * Function: FindRepeatVendors                      *
     *                                                  *
     * Description: Given a vendorID, this function     *
     * will print out all the vendors that sell the     *
     * same card packs the specied vendor sells.        *
     *                                                  *
     ***************************************************/
    static FindRepeatVendors(context){
        return new Promise((resolve, reject) =>{
            const query = `
                            SELECT vendorName 
                            FROM Vendor 
                            WHERE vendorID in (
                                SELECT vendor 
                                FROM Vendor_CardPack 
                                WHERE cardPack in (
                                    SELECT cardPack 
                                    FROM Vendor_CardPack 
                                    WHERE vendor = ?) 
                                and vendor <> ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [context.params.vendor, context.params.vendor]
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
     * Function: AddVendorCardPack                      *
     *                                                  *
     * Description: Inserts a tuple into the            *
     * Vendor_CardPack table, as long as input doesn't  *
     * already form a primary key for an existing       *
     * tuple.                                           *
     *                                                  *
     ***************************************************/
    static AddVendorCardPack(context){
        return new Promise((resolve, reject) =>{
            const vendorCardPack = context.request.body;
            const query = `
                            INSERT INTO Vendor_CardPack
                            VALUES (?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [vendorCardPack.vendor, vendorCardPack.cardPack]
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

module.exports = VendorCardPackController;