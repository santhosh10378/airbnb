const LoadingMessage = ({
  text = "Hang tight! We're fetching the best properties for you...",
}) => (
  <section className="flex items-center justify-center h-full text-center">
    <p className="text-secondary-800 text-lg font-medium">{text}</p>
  </section>
);

export default LoadingMessage;
