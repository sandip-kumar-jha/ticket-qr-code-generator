const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const ticketNumber = `TKT-${Date.now()}`;

    const ticket = await Ticket.create({
      ticketNumber,
      title: title.trim(),
      description: description.trim(),
      qrCodeData: ticketNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      ticket,
    });
  } catch (error) {
    console.error("Create ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
  }
};


const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      tickets,
      message:
        tickets.length === 0
          ? "No data found"
          : "Tickets retrieved successfully",
    });
  } catch (error) {
    console.error("Get tickets error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tickets",
    });
  }
};


const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).lean();

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error("Get ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve ticket",
    });
  }
};


const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty",
        });
      }

      updateData.title = title.trim();
    }

    if (description !== undefined) {
      if (!description.trim()) {
        return res.status(400).json({
          success: false,
          message: "Description cannot be empty",
        });
      }

      updateData.description = description.trim();
    }

    if (status !== undefined) {
      const allowedStatuses = [
        "OPEN",
        "IN_PROGRESS",
        "RESOLVED",
        "CLOSED",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid ticket status",
        });
      }

      updateData.status = status;
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Update ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update ticket",
    });
  }
};


const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Delete ticket error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete ticket",
    });
  }
};


const getTicketQR = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).lean();

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    const qrData = `${frontendUrl}/tickets/${ticket._id}`;

    return res.status(200).json({
      success: true,
      ticketId: ticket._id,
      ticketNumber: ticket.ticketNumber,
      qrData,
    });
  } catch (error) {
    console.error("Get QR data error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate QR data",
    });
  }
};


module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getTicketQR,
};