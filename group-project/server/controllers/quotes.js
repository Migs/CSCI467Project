const knex = require("./knex");

function insertQuote(quote) {
    return knex("Quotes").insert(quote);
};

function getAllQuotes() {
    return knex("Quotes").select("*");
};

function deleteQuote(quoteID) {
    return knex("Quotes").where("QuoteID", quoteID).del();
};

function updateQuote(quoteID, quote) {
    return knex("Quotes").where("QuoteID", quoteID).update(quote);
};

module.exports = {
    insertQuote,
    getAllQuotes,
    deleteQuote,
    updateQuote
}