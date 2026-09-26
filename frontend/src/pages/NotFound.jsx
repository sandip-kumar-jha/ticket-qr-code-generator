import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="page">
      <section className="card">
        <h1>404</h1>
        <p>Page not found.</p>

        <Link to="/" className="button">
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
};

export default NotFound;