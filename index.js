const express = require('express');
const tickets = require('./tickets');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get all tickets
app.get('/rest/list', (req, res) => {
  res.json(tickets.getAllTickets());
});

// Endpoint to get a single ticket
app.get('/rest/ticket/:id', (req, res) => {
  const ticket = tickets.getTicketById(req.params.id);
  if (ticket) {
    res.json(ticket);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
});

// Endpoint to create a new ticket
app.post('/rest/ticket', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: 'Incomplete ticket info' });
  } else {
    const newTicket = tickets.addTicket(title, description);
    res.json(newTicket);
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
