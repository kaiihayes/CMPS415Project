const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = "../tickets-db.json";

function getTickets() {
  const rawData = fs.readFileSync(path.resolve(__dirname, filePath));
  const jsonData = JSON.parse(rawData.toString());
  return jsonData.map((data) => ({
    id: data.id,
    created_at: data.created_at,
    updated_at: data.updated_at,
    type: data.type,
    subject: data.subject,
    description: data.description,
    priority: data.priority,
    status: data.status,
    recipient: data.recipient,
    submitter: data.submitter,
    assignee_id: data.assignee_id,
    follower_ids: data.follower_ids,
    tags: data.tags,
  }));
}

function getNextId(tickets) {
  return tickets.reduce((maxId, ticket) => {
    return Math.max(maxId, ticket.id) + 1;
  }, 1);
}

function validateTicket(ticket) {
  const requiredProperties = [
    "type",
    "subject",
    "description",
    "priority",
    "status",
    "recipient",
    "submitter",
    "assignee_id",
  ];

  const errorMessages = requiredProperties
    .filter((property) => !ticket[property])
    .map(getRequiredText);

  return {
    hasErrors: errorMessages.length > 0,
    errorMessages,
  };
}

function getRequiredText(property) {
  return `${property} is required`;
}

async function writeTicket(ticket) {
  const tickets = getTickets();

  const nextTicketId = getNextId(tickets);
  ticket.id = nextTicketId;
  ticket.created_at = new Date().toISOString();
  ticket.updated_at = new Date().toISOString();

  const validationResult = validateTicket(ticket);

  if (validationResult.hasErrors) {
    return Promise.resolve({
      data: "",
      validationResult: validationResult,
    });
  }

  tickets.push(ticket);
  const updatedContent = JSON.stringify(tickets, null, 2);

  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), updatedContent);
    return Promise.resolve({
      data: JSON.stringify(ticket, null, 2),
    });
  } catch (err) {
    console.log(err);
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: ["Failed to write ticket to file"],
      },
    });
  }
}

async function updateTicket(ticket) {
  const tickets = getTickets();

  const validationResult = validateTicket(ticket);

  if (validationResult.hasErrors) {
    return Promise.resolve({
      data: "",
      validationResult: validationResult,
    });
  }

  const ticketIndex = tickets.findIndex((t) => t.id === ticket.id);
  if (ticketIndex === -1) {
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: [`Ticket with id ${ticket.id} not found`],
      },
    });
  }

  const updatedTicket = {
    ...tickets[ticketIndex],
    ...ticket,
    updated_at: new Date().toISOString(),
  };
  tickets[ticketIndex] = updatedTicket;

  const updatedContent = JSON.stringify(tickets, null, 2);
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), updatedContent);
    return Promise.resolve({
      data: JSON.stringify(updatedTicket, null, 2),
    });
  } catch (err) {
    console.log(err);
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: ["Failed to update ticket in file"],
      },
    });
  }
}

async function deleteTicket(ticket) {
  const tickets = getTickets();

  const ticketIndex = tickets.findIndex((t) => t.id === ticket.id);
  if (ticketIndex === -1) {
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: [`Ticket with id ${ticket.id} not found`],
      },
    });
  }

  tickets.splice(ticketIndex, 1);

  const updatedContent = JSON.stringify(tickets, null, 2);
  try {
    fs.writeFileSync(path.resolve(__dirname, filePath), updatedContent);
    return Promise.resolve({
      data: "",
    });
  } catch (err) {
    console.log(err);
    return Promise.resolve({
      data: "",
      validationResult: {
        hasErrors: true,
        errorMessages: ["Failed to delete ticket from file"],
      },
    });
  }
}


router.get("/rest/list", function(req, res) {
  const tickets = getTickets();

  return res.status(200).send(JSON.stringify(tickets, null, 2));
});

router.post("/rest/ticket", async function(req, res) {
  const response = await writeTicket(req.body);

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  return res.status(201).send(response.data);
});

router.get("/rest/ticket/:id", function(req, res) {
  const tickets = getTickets();

  const ticket = tickets.find(function(x) {
    return x.id === Number(req.params.id);
  });

  return ticket
    ? res.status(200).send(JSON.stringify(ticket, null, 2))
    : res.status(404).send(`Ticket with id ${req.params.id} not found.`);
});

router.put('/rest/ticket/:id', async function(req, res) {
  const tickets = getTickets();
  const ticketIndex = tickets.findIndex(function(x) {
    return x.id === Number(req.params.id);
  });

  if (ticketIndex === -1) {
    return res.status(404).send(`Ticket with id ${req.params.id} not found.`);
  }

  const updatedTicket = { ...tickets[ticketIndex], ...req.body };
  const response = await updateTicket(updatedTicket);

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  tickets[ticketIndex] = updatedTicket;

  return res.status(200).send(JSON.stringify(updatedTicket, null, 2));
});

router.delete('/rest/ticket/:id', async function(req, res) {
  const tickets = getTickets();
  const ticketIndex = tickets.findIndex(function(x) {
    return x.id === Number(req.params.id);
  });

  if (ticketIndex === -1) {
    return res.status(404).send(`Ticket with id ${req.params.id} not found.`);
  }

  const response = await deleteTicket(tickets[ticketIndex]);

  if (response.validationResult?.hasErrors) {
    return res
      .status(400)
      .send(JSON.stringify(response.validationResult.errorMessages, null, 2));
  }

  tickets.splice(ticketIndex, 1);

  return res.status(204).send();
});

module.exports = { TicketsController: router };
