const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"],
      default: "OPEN",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    qrCodeData: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);