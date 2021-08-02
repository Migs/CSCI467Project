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

    getOneAssociate: async (AssociateID, result) => {
        connection.query('SELECT * FROM SalesAssociates WHERE AssociateID = ?', [AssociateID], function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    deleteAssociate: async (AssociateID, result) => {
        connection.query('DELETE FROM SalesAssociates WHERE AssociateID = ?', [AssociateID], function(err, rows){
            if (err) throw err;
            console.log('Deleted');
            result(rows);
        });
    },

    addAssociate: async (AssociateID, Username, Password, Name, Commission, Address, result) => {
        connection.query(
            'INSERT INTO SalesAssociates\
            (AssociateID, Username, Pass, Name, Commission, Address)\
            VALUES (?, ?, ?, ?, ?, ?)', 
            [AssociateID, Username, Password, Name, Commission, Address], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    updateAssociate: async (oldAssociateID, newAssociateID, Username, Password, Name, Commission, Address, result) => {
        connection.query(
            'UPDATE SalesAssociates\
                SET AssociateID = ?,\
                    Username = ?,\
                    Pass = ?,\
                    Name = ?,\
                    Commission = ?,\
                    Address = ?\
                WHERE AssociateID = ?', 
            [newAssociateID, Username, Password, Name, Commission, Address, oldAssociateID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
    
}