import { useState } from "react";
import {
  DEFAULT_READING_FONT_ID,
  READING_FONT_OPTIONS,
} from "../utils/readingFonts";

const STORAGE_KEY = "readingFont";

export default function useReadingFont() {
  const [fontId, setFontId] = useState(() => {
    const savedFontId = localStorage.getItem(STORAGE_KEY);
    return READING_FONT_OPTIONS.some((font) => font.id === savedFontId)
      ? savedFontId
      : DEFAULT_READING_FONT_ID;
  });

  const selectFont = (nextFontId) => {
    if (!READING_FONT_OPTIONS.some((font) => font.id === nextFontId)) {
      throw new Error(`Unknown reading font: ${nextFontId}`);
    }

    localStorage.setItem(STORAGE_KEY, nextFontId);
    setFontId(nextFontId);
  };

  const font = READING_FONT_OPTIONS.find((option) => option.id === fontId);
  return { font, selectFont };
}
