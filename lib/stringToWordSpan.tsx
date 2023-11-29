export function stringToWordSpan(str: string): string {
  let words = str.split(" ");
  let spannedWords = words.map((word) => {
    return `<span>${word}</span>`;
  });
  return spannedWords.join(" ");
}
