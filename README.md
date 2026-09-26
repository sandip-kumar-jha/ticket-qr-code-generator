# Ticket QR Code Generator Worker

A full-stack MERN application for digitally creating, managing, and viewing support tickets with unique QR codes.

This project was developed as part of the **Core Infrastructure Overhaul** module and focuses on replacing manual paper/Excel-based ticket management with a simple digital workflow.

---

## 🚀 Features

### Ticket Management

* Create new tickets
* View all tickets
* View individual ticket details
* Update ticket information
* Delete tickets
* Ticket status management

### QR Code

* Automatically generates QR data for every ticket
* Each ticket has a unique ticket number
* QR code links directly to the corresponding ticket
* Easy ticket identification through QR scanning

### Validation & Error Handling

* Required field validation
* Invalid input handling
* Invalid MongoDB ObjectId handling
* 404 handling for unavailable tickets
* Network/API error handling
* Loading states
* Empty states
* User-friendly error messages

### Security

* Text input sanitization
* Restricted CORS configuration
* JSON request body size limit
* Environment variables for configuration
* No API keys or sensitive credentials committed to the repository

### Accessibility

* Semantic HTML
* Accessible labels
* ARIA attributes
* Keyboard navigation
* Visible validation states
* Accessible loading/error messages

### Analytics Simulation

The application includes a simulated analytics event:

```text
[Analytics] User interacted with Ticket QR Code Generator Worker
```

This is logged after successful primary actions.

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv

### Development & Testing

* Git
* GitHub
* Nodemon
* Jest
* Supertest

---

## 📁 Project Structure

```text
ticket-qr-code-generator/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── tickets.test.js
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
├── .gitignore
├── PROMPTS.md
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/sandip-kumar-jha/ticket-qr-code-generator.git
```

Move into the project:

```bash
cd ticket-qr-code-generator
```

---

# 🔧 Backend Setup

Open a terminal inside the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Start the development server:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

# 🔌 API Endpoints

Base URL:

```text
/api/tickets
```

## Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "title": "Printer Issue",
  "description": "Floor 2 printer is not working"
}
```

---

## Get All Tickets

```http
GET /api/tickets
```

---

## Get Single Ticket

```http
GET /api/tickets/:id
```

---

## Update Ticket

```http
PUT /api/tickets/:id
```

Example:

```json
{
  "title": "Updated Printer Issue",
  "status": "IN_PROGRESS"
}
```

---

## Delete Ticket

```http
DELETE /api/tickets/:id
```

---

## Get Ticket QR Data

```http
GET /api/tickets/:id/qr
```

---

## Health Check

```http
GET /api/health
```

---

# 📊 Ticket Status

Tickets can have the following statuses:

```text
OPEN
IN_PROGRESS
RESOLVED
CLOSED
```

---

# 🧪 Testing

The backend includes automated API tests covering the main happy and unhappy paths.

Run:

```bash
cd backend
npm test
```

The test suite covers:

* Ticket creation
* Required field validation
* Empty input validation
* Fetching all tickets
* Fetching a single ticket
* Invalid ticket ID
* Non-existing ticket
* Updating tickets
* Invalid ticket status
* QR endpoint
* Deleting tickets
* Delete error handling
* API health check

---

# 🛡️ Error Handling

The application handles common failure scenarios including:

### Empty Data

Displays:

```text
No data found
```

instead of leaving the UI blank.

### Loading

Asynchronous operations display a loading state.

### Invalid Input

Invalid form fields are highlighted and submission is prevented.

### Network Failure

The frontend displays a user-friendly error message when the backend cannot be reached.

### Invalid Ticket ID

The backend validates MongoDB ObjectIds before processing requests.

---

# ♿ Accessibility

The application follows accessibility-focused practices including:

* Proper form labels
* `aria-label`
* `aria-invalid`
* `aria-describedby`
* Accessible status messages
* Keyboard navigation
* Semantic navigation elements
* Visible focus states

The interface is designed to be usable without relying only on a mouse.

---

# 🔐 Environment Variables

Sensitive configuration is stored using environment variables.

Example backend:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Example frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

`.env` files are excluded from Git using `.gitignore`.

**Never commit real credentials, API keys, database passwords, or other secrets.**

---

# 📱 Application Flow

```text
User
 │
 ▼
Frontend
 │
 │ HTTP Request
 ▼
Express API
 │
 ▼
Controller
 │
 ▼
Mongoose
 │
 ▼
MongoDB
 │
 ▼
Response
 │
 ▼
Frontend
 │
 ▼
Ticket + QR Code
```

---

# 🔄 Ticket Workflow

```text
Create Ticket
      │
      ▼
Generate Ticket Number
      │
      ▼
Store Ticket in MongoDB
      │
      ▼
Generate QR Data
      │
      ▼
Display Ticket
      │
      ▼
User Scans QR
      │
      ▼
Ticket Details
```

---

# 🎯 Acceptance Criteria

The project addresses the specified acceptance criteria:

| Requirement                         | Status |
| ----------------------------------- | ------ |
| Clear Ticket QR Generator interface | ✅      |
| Immediate user feedback             | ✅      |
| Consistent data structure           | ✅      |
| Empty state handling                | ✅      |
| Loading state                       | ✅      |
| Invalid input handling              | ✅      |
| Network/API error handling          | ✅      |
| Accessibility support               | ✅      |
| Analytics simulation                | ✅      |
| Input sanitization                  | ✅      |
| MongoDB database                    | ✅      |
| API contracts                       | ✅      |
| Automated tests                     | ✅      |

---

# 📋 Development Checklist

Before submission:

```text
[✓] Application runs successfully
[✓] Backend connected to MongoDB
[✓] Frontend connected to backend
[✓] Ticket CRUD working
[✓] QR generation working
[✓] Empty state tested
[✓] Loading state tested
[✓] Invalid input tested
[✓] Network error tested
[✓] Invalid ID tested
[✓] Accessibility tested
[✓] Analytics tested
[✓] Automated tests added
[✓] Environment variables protected
[✓] GitHub repository created
[ ] Production deployment
[ ] Final live testing
[ ] Final deliverable submission
```

---

# 🚀 Deployment

The application can be deployed using:

### Backend

Render or another Node.js hosting platform.

### Frontend

Vercel or another React-compatible hosting platform.

Production environment variables must be configured in the respective hosting platforms rather than committed to the repository.

---

# 📌 Project Information

**Project:** Ticket QR Code Generator Worker

**Ticket ID:** ENG-139055

**Epic:** Core Infrastructure Overhaul

**Priority:** P1

**Story Points:** 5

**Primary Owner:** Sandip Kumar Jha

---

## 👨‍💻 Author

**Sandip Kumar Jha**

GitHub:

https://github.com/sandip-kumar-jha

---

## 📄 License

This project was developed for educational/training and client-deliverable purposes.
