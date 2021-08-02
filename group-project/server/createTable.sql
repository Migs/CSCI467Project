CREATE TABLE "SalesAssociates" (
	"UserID"	INTEGER NOT NULL,
	"Pass"	TEXT NOT NULL,
	"Name"	TEXT NOT NULL,
	"Commission"	REAL,
	"Address"	TEXT,
	PRIMARY KEY("UserID")
)

CREATE TABLE "Quotes" (
	"QuoteID"	INTEGER NOT NULL,
	"CustomerID"	INTEGER NOT NULL,
	"AssociateID"	INTEGER NOT NULL,
	"Price"	REAL NOT NULL,
	"isSanctioned"	INTEGER NOT NULL,
	"isPercentageDiscount"	INTEGER NOT NULL,
	"Discount"	REAL NOT NULL,
	"Email"	TEXT NOT NULL,
	"Description"	TEXT,
	"AssociateNotes"	TEXT,
	"ClerkNotes"	TEXT,
	FOREIGN KEY("AssociateID") REFERENCES "SalesAssociates"("UserID"),
	PRIMARY KEY("QuoteID")
)

