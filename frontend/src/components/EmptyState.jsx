const EmptyState = ({ message = "No data found" }) => {
  return (
    <div className="empty-state" role="status">
      <h2>No data found</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;