const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group1b',
    database: 'groupproject'
});

connection.connect();

module.exports = {
    getAllAssociates: async result => {
        connection.query('SELECT * FROM SalesAssociates', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    getOneAssociate: async (id, result) => {
        connection.query('SELECT * FROM SalesAssociates WHERE AssociateID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    deleteAssociate: async (id, result) => {
        connection.query('DELETE FROM SalesAssociates WHERE AssociateID = ?', [id], function(err, rows){
            if (err) throw err;
            console.log('Deleted');
            result(rows);
        });
    },

    addAssociate: async (id, username, password, name, commission, address, result) => {
        connection.query(
            'INSERT INTO SalesAssociates\
            (AssociateID, Username, Pass, Name, Commission, Address)\
            VALUES (?, ?, ?, ?, ?, ?)', 
            [id, username, password, name, commission, address], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    updateAssociate: async (id, username, password, name, commission, address, result) => {
        connection.query(
            'UPDATE SalesAssociates\
                SET AssociateID = ?,\
                    Username = ?,\
                    Pass = ?,\
                    Name = ?,\
                    Commission = ?,\
                    Address = ?\
                WHERE AssociateID = ?', 
            [id, username, password, name, commission, address, id], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
    
}