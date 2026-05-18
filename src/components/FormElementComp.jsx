export default function FormElementComp(label) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}:</label>
      <input type="text" className="form-control" />
    </div>
  );
}
