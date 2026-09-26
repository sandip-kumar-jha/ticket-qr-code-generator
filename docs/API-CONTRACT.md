# Ticket QR Code Generator API Contract

## Create Ticket

POST /api/tickets

Request:

{
  "title": "Printer issue",
  "description": "Printer is not working"
}

Response:

{
  "success": true,
  "message": "Ticket created successfully",
  "ticket": {}
}

---

## Get All Tickets

GET /api/tickets

---

## Get Single Ticket

GET /api/tickets/:id

---

## Update Ticket

PUT /api/tickets/:id

---

## Delete Ticket

DELETE /api/tickets/:id

---

## Get Ticket QR

GET /api/tickets/:id/qr