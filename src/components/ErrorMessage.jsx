const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-700 p-2 mt-2 rounded border border-red-300">
      {message}
    </div>
  );
};

export default ErrorMessage;
