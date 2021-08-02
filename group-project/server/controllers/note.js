const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'group1b',
    database: 'groupproject'
});

connection.connect();

module.exports = {
    getAllNotes: async result => {
        connection.query('SELECT * FROM Notes', function(err, rows){
            if (err) throw err;
            console.log('rows: ', rows);
            result(rows);
        });
    },

    getOneNote: async (NoteID, QuoteID, result) => {
        connection.query('SELECT * FROM Notes WHERE NoteID = ? AND QuoteID = ?', [NoteID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('rows: ', rows);
                            result(rows);
        });
    },

    deleteNote: async (NoteID, QuoteID, result) => {
        connection.query('DELETE FROM Notes WHERE NoteID = ? AND QuoteID = ?', [NoteID, QuoteID], 
                        function(err, rows){
                            if (err) throw err;
                            console.log('Deleted');
                            result(rows);
        });
    },

    addNote: async (NoteID, QuoteID, Note, result) => {
        connection.query(
            'INSERT INTO Notes\
            (NoteID, QuoteID, Note)\
            VALUES (?, ?, ?)', 
            [NoteID, QuoteID, Note], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },

    updateNote: async (oldNoteID, newNoteID, oldQuoteID, newQuoteID, Note, result) => {
        connection.query(
            'UPDATE Notes\
                SET NoteID = ?,\
                    QuoteID = ?,\
                    Note = ?\
                WHERE NoteID = ? AND QuoteID = ?', 
            [newNoteID, newQuoteID, Note, oldNoteID, oldQuoteID], 
            function(err, rows){
                if (err) throw err;
                console.log('Added');
                result(rows);
        });
    },
}



