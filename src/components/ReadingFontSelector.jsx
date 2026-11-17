import { READING_FONT_OPTIONS } from "../utils/readingFonts";

export default function ReadingFontSelector({
  onChange,
  value,
  variant = "dark",
}) {
  const styles =
    variant === "light"
      ? "border-[#6f4c2f40] bg-[#f4e8cf] text-[#5f4738] focus-visible:outline-[#9b4635]"
      : "border-[#eed8b352] bg-[#2a1619] text-[#f4e9d2] focus-visible:outline-[#d3a77c]";

  return (
    <label className="inline-flex items-center gap-2">
      <span className="sr-only">Reading font</span>
      <select
        className={`h-9 max-w-36 rounded-full border px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${styles}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Reading font"
      >
        {READING_FONT_OPTIONS.map((font) => (
          <option key={font.id} value={font.id}>
            {font.label}
          </option>
        ))}
      </select>
    </label>
  );
}
