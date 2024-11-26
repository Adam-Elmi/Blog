export default function limitLength(text) {
  const limit = 15;
  if (text.length > limit) {
    return text.slice(0, limit + 1) + "...";
  }

  return text;
}
