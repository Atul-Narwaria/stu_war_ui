export const truncateHTMLWords = (content: any, words: any) => {
  const regex = /\s+/;
  const wordsArray = content.split(regex);
  console.log(wordsArray);
  const truncatedWords = wordsArray.slice(0, words);
  return truncatedWords.join(" ");
};
export const truncateHTMLChar = (content: any, characters: any) => {
  if (content.length <= characters) {
    return content;
  }
  return content.slice(0, characters) + "...";
};
