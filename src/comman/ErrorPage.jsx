/* eslint-disable react/prop-types */
const ErrorPage = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full text-black text-lg font-semibold">
      <p>{message || "An error occurred. Please try again."}</p>
    </div>
  );
};

export default ErrorPage;
