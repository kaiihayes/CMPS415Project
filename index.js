const express = require('express');
const { json } = require('body-parser');
const { TicketsController } = require('./controllers/tickets');
const { MongoClient} = require('mongodb');

// uri string 
const uri = "mongodb+srv://kaitlynhayes2:xSwML2dhL5g64H5E@testdatabase.de9jrjx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('Database');
    const tickets = database.collection('tickets');

    // Query for a ID
    const query = {assignee_id: 435678};
    const ticket = await tickets.find(query).toArray();

    console.log("Found your ticket(s) from your database!");
    console.log("");
    console.log(ticket);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const app = express();

app.use(json());
app.use('/', TicketsController);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
