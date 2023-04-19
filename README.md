# CMPS415Project

Phase 1 :

- Phase I will focus on the creation of a simple web service using Node and ExpressJS. This phase will focus on setting up the project in Render.com and developing the Create and Read endpoints.

In this phase, tickets will be stored in memory. There will be initial tickets loaded into memory upon service startup. YOU are responsible for providing an initial set of tickets if you want your app to have tickets “loaded”. Your service will allow additions to the collection of tickets as well as access to individual existing tickets. Tickets will be represented/stored in JSON.

 

Summary of Deliverables:



Node Web Service using Node that offers 3 endpoints.

• GET - /rest/list/ = ”Endpoint to get all tickets”

This endpoint requires no input, but will return all of the JSON

objects that are in memory.

• GET - /rest/ticket/id = ”Endpoint to get a single ticket”

This endpoint requires the ID to be sent to the web app. It will return a JSON object of the ticket that has the matching ID.

• POST - /rest/ticket/ = ”Endpoint to create a new ticket”

This endpoint requires a JSON object to be sent to the web app. This object will contain all necessary fields. It will return a JSON

object of the ticket that was created.


Phase 2:

- This purpose of this phase is to extend the services created in Phase I. The extension will require the addition of a database to store the tickets. Two additional endpoints will need to be developed to update and delete tickets.

You should use a database solution provided by Render.com. You may consider the following: https://devcenter.heroku.com/articles/mean-apps-restful-api#provision-a-mongodb-database

Summary of Deliverables
Node Web Service using Node that offers 5 endpoints.
• DELETE - /rest/ticket/id = ”Deletes a ticket record by ID”
• PUT - /rest/ticket/id = ”Updates exsisting ticket record based on ID”
![image](https://user-images.githubusercontent.com/75281930/233196024-2fbbb6fa-40c9-4221-b36f-fc9a988012ac.png)


