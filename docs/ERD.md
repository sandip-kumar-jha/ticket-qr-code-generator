# Ticket QR Code Generator - ERD

## Entities

### User

- _id
- name
- email
- role
- createdAt
- updatedAt

### Ticket

- _id
- ticketNumber
- title
- description
- status
- createdBy
- qrCodeData
- createdAt
- updatedAt

## Relationship

One User can create many Tickets.

User._id → Ticket.createdBy