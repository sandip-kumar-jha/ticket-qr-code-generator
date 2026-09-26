const express = require("express");

const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketQR,
} = require("../controllers/ticketController");

const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.post("/", createTicket);

router.get("/", getTickets);

router.get(
  "/:id",
  validateObjectId,
  getTicketById
);

router.put(
  "/:id",
  validateObjectId,
  updateTicket
);

router.delete(
  "/:id",
  validateObjectId,
  deleteTicket
);

router.get(
  "/:id/qr",
  validateObjectId,
  getTicketQR
);

module.exports = router;