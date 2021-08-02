const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group1b',
    database: 'groupproject'
});

connection.connect();

module.exports = {
    getAllQuotes: async result => {
        connection.query('SELECT * FROM Quotes', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    getOneQuote: async (id, result) => {
        connection.query('SELECT * FROM Quotes WHERE QuoteID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    deleteQuote: async (id, result) => {
        connection.query('DELETE FROM Quotes WHERE QuoteID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('Deleted');
            result(rows);
        });
    },

    addQuote: async (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, Discount, Email, result) => {
        connection.query(
            'INSERT INTO Quotes\
            (QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, Discount, Email)\
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [QuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, Discount, Email], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    updateQuote: async (oldQuoteID, newQuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, Discount, Email, result) => {
        connection.query(
            'UPDATE Quotes\
                SET QuoteID = ?,\
                    CustomerID =?,\
                    AssociateID = ?,\
                    Price = ?,\
                    isSanctioned = ?,\
                    isPercentageDiscount = ?,\
                    Discount = ?,\
                    Email = ?\
                WHERE QuoteID = ?', 
            [newQuoteID, CustomerID, AssociateID, Price, isSanctioned, isPercentageDiscount, Discount, Email, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    }
}