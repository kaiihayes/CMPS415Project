const tickets = [
{    
  "id": 1,    
  "created_at": "2023-04-07T08:30:00Z",   
  "updated_at": "2023-04-07T08:30:00Z",    
  "type": "incident",    
  "subject": "Internet connectivity issue",    
  "description": "Users are reporting issues with connecting to the internet. We suspect it may be due to a network outage.",   
  "priority": "high",    
  "status": "open",    
  "recipient": "network team",    
  "submitter": "John Doe",   
  "assignee_id": 1,    
  "follower_ids": [2, 3],
  "tags": ["network", "internet"]
},
{
  "id": 2,
  "created_at": "2023-04-07T09:00:00Z",
  "updated_at": "2023-04-07T09:00:00Z",
  "type": "problem",
  "subject": "Printer not working",
  "description": "The printer in the third floor conference room is not printing. It says there's a paper jam but we've checked and there's no paper jammed.",
  "priority": "medium",
  "status": "open",
  "recipient": "IT department",
  "submitter": "Jane Smith",
  "assignee_id": 2,
  "follower_ids": [1, 3],
  "tags": ["printer", "conference room"]
},
{
  "id": 3,
  "created_at": "2023-04-07T10:00:00Z",
  "updated_at": "2023-04-07T10:00:00Z",
  "type": "question",
  "subject": "How do I set up my email?",
  "description": "I'm a new employee and I need help setting up my email account.",
  "priority": "low",
  "status": "open",
  "recipient": "HR department",
  "submitter": "Bob Johnson",
  "assignee_id": 3,
  "follower_ids": [1, 2],
  "tags": ["email", "new employee"]
}
]

module.exports = tickets;
