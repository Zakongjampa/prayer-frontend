export default function CollectionResults({
  children,
  emptyMessage,
  error,
  loading,
  loadingMessage,
}) {
  if (loading) {
    return (
      <p
        className="rounded-2xl border border-[#eed8b333] bg-[#eed8b30e] p-6 text-[#f4e9d2b8]"
        role="status"
      >
        {loadingMessage}
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="rounded-2xl border border-[#ffb8a833] bg-[#a8323210] p-6 text-[#ffb8a8]"
        role="alert"
      >
        {error}
      </p>
    );
  }

  if (emptyMessage) {
    return (
      <p className="rounded-2xl border border-[#eed8b333] bg-[#eed8b30e] p-6 text-[#f4e9d2a6]">
        {emptyMessage}
      </p>
    );
  }

  return children;
}
