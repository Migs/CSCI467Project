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

    getAllLineItems: async result => {
        connection.query('SELECT * FROM LineItems', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    getAllNotes: async result => {
        connection.query('SELECT * FROM Notes', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    }
}