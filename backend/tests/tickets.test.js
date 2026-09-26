const request = require("supertest");

const BASE_URL = "http://localhost:5000";

let createdTicketId;

describe("Ticket QR Code Generator API", () => {
  // ==========================================
  // CREATE TICKET
  // ==========================================

  describe("POST /api/tickets", () => {
    test("should create a ticket with valid data", async () => {
      const response = await request(BASE_URL)
        .post("/api/tickets")
        .send({
          title: "Printer Issue",
          description: "Floor 2 printer is not working",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.ticket).toBeDefined();

      expect(response.body.ticket.title).toBe("Printer Issue");
      expect(response.body.ticket.description).toBe(
        "Floor 2 printer is not working"
      );

      expect(response.body.ticket.ticketNumber).toBeDefined();
      expect(response.body.ticket.qrCodeData).toBeDefined();

      createdTicketId = response.body.ticket._id;
    });

    test("should reject ticket when title is missing", async () => {
      const response = await request(BASE_URL)
        .post("/api/tickets")
        .send({
          description: "Printer is not working",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Title is required");
    });

    test("should reject ticket when description is missing", async () => {
      const response = await request(BASE_URL)
        .post("/api/tickets")
        .send({
          title: "Printer Issue",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Description is required"
      );
    });

    test("should reject empty title", async () => {
      const response = await request(BASE_URL)
        .post("/api/tickets")
        .send({
          title: "   ",
          description: "Printer issue",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });

    test("should reject empty description", async () => {
      const response = await request(BASE_URL)
        .post("/api/tickets")
        .send({
          title: "Printer issue",
          description: "   ",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // ==========================================
  // GET ALL TICKETS
  // ==========================================

  describe("GET /api/tickets", () => {
    test("should return tickets successfully", async () => {
      const response = await request(BASE_URL).get(
        "/api/tickets"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.tickets)).toBe(true);
      expect(response.body.message).toBeDefined();
    });
  });

  // ==========================================
  // GET SINGLE TICKET
  // ==========================================

  describe("GET /api/tickets/:id", () => {
    test("should return a ticket by ID", async () => {
      const response = await request(
        BASE_URL
      ).get(`/api/tickets/${createdTicketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.ticket).toBeDefined();

      expect(response.body.ticket._id).toBe(
        createdTicketId
      );
    });

    test("should reject invalid ticket ID", async () => {
      const response = await request(BASE_URL).get(
        "/api/tickets/invalid-id"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid ticket ID"
      );
    });

    test("should return 404 for non-existing ticket", async () => {
      const fakeId = "507f1f77bcf86cd799439011";

      const response = await request(
        BASE_URL
      ).get(`/api/tickets/${fakeId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Ticket not found"
      );
    });
  });

  // ==========================================
  // UPDATE TICKET
  // ==========================================

  describe("PUT /api/tickets/:id", () => {
    test("should update ticket successfully", async () => {
      const response = await request(
        BASE_URL
      )
        .put(`/api/tickets/${createdTicketId}`)
        .send({
          title: "Updated Printer Issue",
          status: "IN_PROGRESS",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.ticket).toBeDefined();

      expect(response.body.ticket.title).toBe(
        "Updated Printer Issue"
      );

      expect(response.body.ticket.status).toBe(
        "IN_PROGRESS"
      );
    });

    test("should reject invalid ticket status", async () => {
      const response = await request(
        BASE_URL
      )
        .put(`/api/tickets/${createdTicketId}`)
        .send({
          status: "INVALID_STATUS",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid ticket status"
      );
    });

    test("should reject empty title during update", async () => {
      const response = await request(
        BASE_URL
      )
        .put(`/api/tickets/${createdTicketId}`)
        .send({
          title: "   ",
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // ==========================================
  // QR CODE DATA
  // ==========================================

  describe("GET /api/tickets/:id/qr", () => {
    test("should return QR data for a ticket", async () => {
      const response = await request(
        BASE_URL
      ).get(`/api/tickets/${createdTicketId}/qr`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);

      expect(response.body.ticketId).toBe(
        createdTicketId
      );

      expect(response.body.ticketNumber).toBeDefined();
      expect(response.body.qrData).toBeDefined();

      expect(response.body.qrData).toContain(
        "/tickets/"
      );
    });

    test("should reject invalid ticket ID for QR", async () => {
      const response = await request(BASE_URL).get(
        "/api/tickets/invalid-id/qr"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  // ==========================================
  // DELETE TICKET
  // ==========================================

  describe("DELETE /api/tickets/:id", () => {
    test("should delete ticket successfully", async () => {
      const response = await request(
        BASE_URL
      ).delete(`/api/tickets/${createdTicketId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Ticket deleted successfully"
      );
    });

    test("should return 404 when deleting non-existing ticket", async () => {
      const response = await request(
        BASE_URL
      ).delete(`/api/tickets/${createdTicketId}`);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Ticket not found"
      );
    });

    test("should reject invalid ticket ID during delete", async () => {
      const response = await request(BASE_URL).delete(
        "/api/tickets/invalid-id"
      );

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Invalid ticket ID"
      );
    });
  });
});