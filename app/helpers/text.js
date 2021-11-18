exports.capitalize = text => {
  const words = text.split(' ');
  const wordsCapitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  return wordsCapitalized.join(' ');
};
