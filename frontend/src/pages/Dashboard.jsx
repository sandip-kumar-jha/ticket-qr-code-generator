import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTickets } from "../services/ticketApi";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setLoading(true);

        const result = await getTickets();

        setTickets(result.tickets || []);
      } catch (error) {
        setError(
          "Unable to load tickets. Please check your internet connection."
        );
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <Loading />
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <h1>Ticket Dashboard</h1>
          <p className="subtitle">
            Manage and view generated tickets.
          </p>
        </div>

        <Link to="/create" className="button">
          Create Ticket
        </Link>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {!error && tickets.length === 0 && (
        <EmptyState message="There are no tickets yet." />
      )}

      {tickets.length > 0 && (
        <section className="ticket-grid">
          {tickets.map((ticket) => (
            <article className="ticket-card" key={ticket._id}>
              <span className="ticket-number">
                {ticket.ticketNumber}
              </span>

              <h2>{ticket.title}</h2>

              <p>{ticket.description}</p>

              <span className="status">
                {ticket.status}
              </span>

              <Link to={`/tickets/${ticket._id}`}>
                View Ticket
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Dashboard;