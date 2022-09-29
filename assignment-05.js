
//These are the atlas connection details as provided by the mongodb atlas webpage
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://seanconroy1401:gj8uQZBdKFhWwMYE@cluster0.s7zkf.mongodb.net/customerDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const database = "customerDatabase";

//The assignment sheet specifies that we "may" use functions for randomly generating data to insert into the database but does not specify that we *must* use random data
//So I am simply using hard-coded data stored in variables like this, as my CRUD functions will read them in as input parameters
var customerDetails = [
    {Title: "Mr", Name: "Sean", Surname: "Conroy", PhoneNumber: 0871170453, Email: "sean.conroy.2021@mumail.ie", BillingLine1: "22 Jigginstown Green", BillingLine2: "Newbridge Road", BillingCity: "Naas", BillingCounty: "Kildare", BillingEircode: "W91 YK5D", ShippingLine1: "22 Jigginstown Green", ShippingLine2: "Newbridge Road", ShippingCity: "Naas", ShippingCounty: "Kildare", ShippingEircode: "W91 YK5D"},
    {Title: "Mr", Name: "Daire", Surname: "Casey", PhoneNumber: 0873645212, Email: "daire.casey.2020@mumail.ie", BillingLine1: "54 Cluain Aoibhinn", BillingLine2: "Collegeland", BillingCity: "Maynooth", BillingCounty: "Kildare", BillingEircode: "W23 Y2N5", ShippingLine1: "54 Cluain Aoibhinn", ShippingLine2: "Collegeland", ShippingCity: "Maynooth", ShippingCounty: "Kildare", ShippingEircode: "W23 Y2N5"},
    {Title: "Ms", Name: "Megan", Surname: "Becker", PhoneNumber: 0896645323, Email: "meganabecker@gmail.com", BillingLine1: "21 Sraith Scamall", BillingLine2: "", BillingCity: "Sligo", BillingCounty: "Sligo", BillingEircode: "F17 Z723", ShippingLine1: "54 Cluain Aoibhinn", ShippingLine2: "Collegeland", ShippingCity: "Maynooth", ShippingCounty: "Kildare", ShippingEircode: "W23 Y2N5"},
    {Title: "Mrs", Name: "Aoife", Surname: "Pender", PhoneNumber: 0857435696, Email: "aoife.pender@gmail.com", BillingLine1: "19 Oldtown Domain", BillingLine2: "Monread", BillingCity: "Naas", BillingCounty: "Kildare", BillingEircode: "W21 G56D", ShippingLine1: "54 Cluain Aoibhinn", ShippingLine2: "Collegeland", ShippingCity: "Maynooth", ShippingCounty: "Kildare", ShippingEircode: "W23 Y2N5"},
    {Title: "Dr", Name: "Lughán", Surname: "Devenny", PhoneNumber: 0869985632, Email: "ld@mu.ie", BillingLine1: "71 Seaside Way", BillingLine2: "", BillingCity: "Inishowen", BillingCounty: "Donegal", BillingEircode: "A23 H36F", ShippingLine1: "54 Cluain Aoibhinn", ShippingLine2: "Collegeland", ShippingCity: "Maynooth", ShippingCounty: "Kildare", ShippingEircode: "W23 Y2N5"}
]

var productDetails = [
    {Manufacturer: "Samsung", Model: "A6", Price: 250.00},
    {Manufacturer: "OnePlus", Model: "Nord 2", Price: 400.00},
    {Manufacturer: "Apple", Model: "iPhone 13", Price: 999.99},
    {Manufacturer: "Samsung", Model: "Note 12 PLUS", Price: 1099.99},
    {Manufacturer: "Samsung", Model: "Z Fold", Price: 1599.99}
]

var orderDetails = [
    {Model: "A6", CustomerNumber: 0857435696},
    {Model: "iPhone 13", CustomerNumber: 0896645323},
    {Model: "Note 12 PLUS", CustomerNumber: 0896645323},
    {Model: "Nord 2", CustomerNumber: 0869985632},
    {Model: "Z Fold", CustomerNumber: 0871170453},
    {Model: "Nord 2", CustomerNumber: 0873645212}
]

//write functions for crud activities, take in input parameters and use variables similar to the the customerdetails above to insert into the methods
//then call the methods below inside client.connect




client.connect(err => {

    console.log("Successfully connected to the database: " + database);

    //Taken from John Keating
    const db = client.db(database);

    //this is my function for inserting into the database, i.e the C of CRUD
    function create(db, custDets, prodDets, ordDets) {

        db.collection("personalDetails").insertMany(custDets, function(err, res) { //this inserts the customer details into the personalDetails collection within my database

            if (err) throw (err);
            console.log("Number of Customers inserted into the database: " + res.insertedCount); //taken from W3 schools, the insertMany function returns a result with the number of items inserted into the database

        });

        db.collection("productDetails").insertMany(prodDets, function(err, res) { //this inserts the product details into the productDetails collection within my database

            if (err) throw (err);
            console.log("Number of Products inserted into the database: " + res.insertedCount); 

        });

        db.collection("orderDetails").insertMany(ordDets, function(err, res) { //this inserts the order details into the orderDetails collection within my database

            if (err) throw (err);
            console.log("Number of Orders inserted into the database: " + res.insertedCount); 

        });

    }

    //this is my function for retreiving from the database, i.e the R of CRUD
    function retrieve(db) {


        //using the aggregate function I'm able to randomly retrieve an entry from the database
        db.collection("personalDetails").aggregate([{$sample:{size:1}}]).toArray(function(err,docs){

            console.log("Random User Requested: \n\n" + JSON.stringify(docs, null, 2) + "\n");

        });

        //I am using this to return a random product 
        db.collection("productDetails").aggregate([{$sample:{size:1}}]).toArray(function(err,docs){

            console.log("Random Product Requested: \n\n" + JSON.stringify(docs, null, 2) + "\n");

        });

        //And to return a random order
        db.collection("orderDetails").aggregate([{$sample:{size:1}}]).toArray(function(err,docs){

            console.log("Random Order Requested: \n\n" + JSON.stringify(docs, null, 2) + "\n");

        });
            

    };

    function update(db, custDets, prodDets, ordDets) {

        var randCustPhone ={Phone: custDets[Math.round(Math.random()*(custDets.length-1))].PhoneNumber}; //this will pick a random phone number from my customers details to use
        var newCustDets = { $set: {Title: "Mx", Number: 0892253176, Email: "johnkeating@mu.ie"} }; //using a variable to update the details in one go made the most sense to me as its the easiest to read back over and modify

        db.collection("personalDetails").updateOne(randCustPhone, newCustDets, function (err, result) { //taken from W3 schools

            console.log("Customer with phone number: " + randCustPhone + " details updated!");

        });

        var randPhoneModel = {Model: prodDets[Math.round(Math.random()*(prodDets.length-1))].Model}; //this will pick a random phone model from my product details to use
        var newProdDets = { $set: {Manufacturer: "Samsung", Model: "S14", Price: 899.99} };

        db.collection("productDetails").updateOne(randPhoneModel, newProdDets, function (err, result) {

            console.log("Phone with model: " + randPhoneModel + " details updated!");

        });

        var randOrderModel = {Model: ordDets[Math.round(Math.random()*(ordDets.length-1))].Model}; //this will pick a random phone model from my order details to use
        var newOrdDets = { $set: {Model: "Nord 3", CustomerNumber: 0892253176} };

        db.collection("orderDetails").updateOne(randOrderModel, newOrdDets, function (err, result) {

            console.log("Order with phone model: " + randOrderModel + " details updated!");

        });

    }

    //this is the delete aspect of CRUD, I couldn't use the word delete as its a reserved keyword, so I just named it deleteThree as its deleting three things
    function deleteThree(db, custName, phoneNum, custEmail, phoneModel) {

        var custQuery = {Name: custName, PhoneNumber : phoneNum, Email: custEmail};

        db.collection("personalDetails").deleteOne(custQuery, function (err, result) { //taken from W3 schools

            if (err) throw (err);
            console.log("User with name: " + custName + " and number: " + phoneNum + " deleted from database!");

        }); 

        var prodQuery = {Model: phoneModel};

        db.collection("productDetails").deleteOne(prodQuery, function (err, result) {

            if (err) throw (err);
            console.log("Phone with model: " + phoneModel + " deleted from database!");

        }); 

        var ordQuery = {CustomerNumber : phoneNum};

        db.collection("ordDetails").deleteOne(ordQuery, function (err, result) { 

            if (err) throw (err);
            console.log("Order purchased by customer with number: " + phoneNum + " deleted from database!");

        }); 

    }

    create(db, customerDetails, productDetails, orderDetails); //call the create function and insert the user, phone, and order details into the database
    retrieve(db); //call the retrieve function using the specified database
    update(db, customerDetails, productDetails, orderDetails); //call the update function and a random user using info obtained from the details I inserted earlier
    deleteThree(db, "Sean", 0871170453, "sean.conroy.2021@mumail.ie", "Z Flip"); //delete the user sean with the number and email provided, and delete the z flip and the orders made by sean


});