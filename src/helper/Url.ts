export const isUrl = (url: string) => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
};
export const getLastpartFromString = (identifier: any, str: string) => {
  const lastDotIndex = str.lastIndexOf(identifier);
  if (lastDotIndex !== -1) {
    const lastPart = str.substring(lastDotIndex + 1);
    return lastPart;
  }
  return null; // Return null if there is no dot in the string
};
