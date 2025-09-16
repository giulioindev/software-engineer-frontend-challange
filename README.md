# Frontend Challenge

## Overview

This repository contains the Frontend Challenge for candidates.
You must build a frontend application (choose between React or Flutter) that integrates with the provided mocked Invoice Management API.

The backend is not real: it is mocked with Mockoon and runs locally via Docker.

If you encounter any issues or need troubleshooting assistance, please contact `maglie@multicerta.it`.

## Scoring Criteria

Each feature and best practice contributes to a total score of 110 base points (+15 bonus possible), allowing candidates to self-evaluate their implementation.
- Project Structure & Architecture (20 points)
- Well-organized folder structure (10)
- Clear use of design patterns (Provider, BLoC, Redux, or equivalent in React) (10)
- API Integration (20 points)
- Correct usage of the provided OpenAPI endpoints (10)
- Pagination & filters correctly handled in the UI (5)
- Error states & loading states handled gracefully (5)
- UI/UX (15 points)
- Clean, responsive, and user-friendly UI (10)
- Mobile-first approach (Flutter or responsive React) (5)
- State Management & Logic (15 points)
- Proper handling of global state (10)
- Decoupling UI and business logic (5)
- Testing (15 points)
- Unit tests for components/widgets (5)
- Integration tests for API interactions (5)
- Coverage & fixtures (5)
- Docker & Mock Setup (10 points)
- Local mock API runs correctly with Docker (5)
- Correct use of the mocked endpoints in the frontend (5)
- Documentation (10 points)
- README with setup instructions (5)
- Clear explanation of design decisions (5)
- Other Best Practices (15 points)
- Meaningful commit messages (5)
- Code linting & formatting (5)
- Error handling & logging (5)

Bonus (+15 points):
- Usage of advanced UI libraries or animations (+5)
- Implementation of offline mode with caching (+5)
- Strong accessibility support (+5)

## Use Case: Invoice Management

The app must allow the user to:
1. List invoices with pagination and filtering by status (draft, sent, paid).
2. View invoice details (customer, date, amount, status).
3. Create a new invoice (basic form with title, amount, customer name).
4. Update an existing invoice (status change + edit details).
5. Delete an invoice.


## Getting Started

1. Fork this repository

Click the "Fork" button at the top right of the GitHub page to create your own copy of the repository.

2. Clone your forked repository

3. Start the Mock API with Docker

Make sure you have Docker and docker-compose installed.
Then run:

```
docker-compose up
```

This will start the mock API on:

http://localhost:3000/api

The API is defined in:
- openapi.yml → OpenAPI 3.0 specification
- mockoon/mock-api.json → Mockoon config (already included)


## API Endpoints

Base URL:

http://localhost:3000/api

Endpoints:
- GET `/invoices` → List invoices (supports ?page and ?status query params)
- POST `/invoices` → Create new invoice
- GET `/invoices/{id}` → Get invoice by ID
- PUT `/invoices/{id}` → Update invoice
- DELETE `/invoices/{id}` → Delete invoice


## Test the Mock API

You can test the API before starting frontend development.

Example: list invoices

`curl http://localhost:3000/api/invoices`

Response:

```
{
  "page": 1,
  "totalPages": 2,
  "items": [
    {
      "id": "1",
      "title": "Website redesign",
      "customer": "Acme Corp",
      "amount": 1500.5,
      "status": "draft",
      "date": "2025-09-01"
    },
    {
      "id": "2",
      "title": "Consulting services",
      "customer": "Beta Ltd",
      "amount": 800,
      "status": "sent",
      "date": "2025-09-03"
    }
  ]
}
```

Example: create invoice

```
curl -X POST http://localhost:3000/api/invoices \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New invoice",
    "customer": "New client",
    "amount": 500,
    "status": "draft"
  }'
```

Response:

```
{
  "id": "c56a4180-65aa-42ec-a945-5fd21dec0538",
  "title": "New invoice",
  "customer": "New client",
  "amount": 500,
  "status": "draft",
  "date": "2025-09-11"
}
```

## Your Task

You must implement a frontend application (React or Flutter) that connects to this mock API and supports:
1. List invoices (with pagination and filtering by status).
2. View invoice details.
3. Create a new invoice.
4. Update an existing invoice.
5. Delete an invoice.


### Deliverables
- A working React webapp or Flutter app.
- Clear README with setup instructions.
- Meaningful Git commit history.
- Tests (unit + integration where possible).


### Notes
- You do not need to build a backend.
- You do not need to connect to a database.
- Use the provided mock API only.
- You may use any libraries you consider useful (UI components, state management, etc.).
