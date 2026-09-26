import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

import {
  getTicketById,
  getTicketQR,
} from "../services/ticketApi";

import Loading from "../components/Loading";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [qrData, setQrData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTicket = async () => {
      try {
        setLoading(true);

        const [ticketResult, qrResult] = await Promise.all([
          getTicketById(id),
          getTicketQR(id),
        ]);

        setTicket(ticketResult.ticket);
        setQrData(qrResult.qrData);
      } catch (error) {
        setError(
          "Unable to load ticket. Please check your connection."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <Loading />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <div className="error-message" role="alert">
          {error}
        </div>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="page">
        <div className="empty-state">
          <h2>No data found</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="ticket-details">
        <div className="ticket-info">
          <span className="ticket-number">
            {ticket.ticketNumber}
          </span>

          <h1>{ticket.title}</h1>

          <p>{ticket.description}</p>

          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
        </div>

        <div className="qr-section">
          <h2>Ticket QR Code</h2>

          <div
            className="qr-container"
            aria-label={`QR code for ${ticket.ticketNumber}`}
          >
            <QRCodeSVG
              value={qrData}
              size={240}
              level="M"
            />
          </div>

          <p className="qr-help">
            Scan this QR code to open the ticket.
          </p>
        </div>
      </section>
    </main>
  );
};

export default TicketDetails;