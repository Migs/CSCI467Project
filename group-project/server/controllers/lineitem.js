const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group1b',
    database: 'groupproject'
});

connection.connect();

module.exports = {
    getAllLineItems: async result => {
        connection.query('SELECT * FROM LineItems', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    getOneLineItem: async (LineID, QuoteID, result) => {
        connection.query('SELECT * FROM LineItems WHERE LineID = ? AND QuoteID = ?', [LineID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        });
    },

    deleteLineItem: async (LineID, QuoteID, result) => {
        connection.query('DELETE FROM LineItems WHERE LineID = ? AND QuoteID = ?', [LineID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    addLineItem: async (LineID, QuoteID, ItemDescription, Cost, result) => {
        connection.query(
            'INSERT INTO LineItems\
            (LineID, QuoteID, ItemDescription, Cost)\
            VALUES (?, ?, ?, ?)', 
            [LineID, QuoteID, ItemDescription, Cost], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    updateLineItem: async (oldLineID, newLineID, oldQuoteID, newQuoteID, ItemDescription, Cost, result) => {
        connection.query(
            'UPDATE LineItems\
                SET LineID = ?,\
                    QuoteID = ?,\
                    ItemDescription = ?,\
                    Cost = ?\
                WHERE LineID = ? AND QuoteID = ?', 
            [newLineID, newQuoteID, ItemDescription, Cost, oldLineID, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
}
