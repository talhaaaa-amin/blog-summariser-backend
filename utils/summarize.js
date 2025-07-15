function summarizeText(text) {
  const sentences = text.split(".").filter((s) => s.trim().length > 0);
  return sentences.slice(0, 3).join(".") + ".";
}

module.exports = { summarizeText };
