import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../services/ticketApi";

const CreateTicket = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const sanitizeInput = (value) => {
    return value
      .replace(/<script.*?>.*?<\/script>/gi, "")
      .replace(/<[^>]*>/g, "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: sanitizeInput(value),
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const result = await createTicket(formData);

      console.log(
        "[Analytics] User interacted with Ticket QR Code Generator Worker"
      );

      navigate(`/tickets/${result.ticket._id}`);
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to create ticket. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="card">
        <h1>Create Ticket</h1>

        <p className="subtitle">
          Enter ticket information to generate a QR code.
        </p>

        {serverError && (
          <div className="error-message" role="alert">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="title">Ticket Title</label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={
                errors.title ? "title-error" : undefined
              }
              placeholder="Example: Printer issue"
            />

            {errors.title && (
              <p id="title-error" className="field-error">
                {errors.title}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={
                errors.description
                  ? "description-error"
                  : undefined
              }
              placeholder="Describe the problem..."
              rows="5"
            />

            {errors.description && (
              <p
                id="description-error"
                className="field-error"
              >
                {errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-label="Create ticket"
          >
            {loading ? "Creating..." : "Create Ticket"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateTicket;