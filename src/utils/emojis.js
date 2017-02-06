import emojiKeywords from 'emojis-keywords';
import emojiList from 'emojis-list';

export const emojis = emojiKeywords.map((keyword, index) => {
  return {
    keyword: emojiKeywords[index],
    character: emojiList[index],
  };
});

// Returns a list of { keyword, character } objects with keyword that matches
// the searchTerm sorted by matching index.
export function getEmojiMatches(searchTerm) {
  const matches = [];
  emojis.forEach((emoji) => {
    const matchingIndex = emoji.keyword.indexOf(searchTerm);
    if (matchingIndex !== -1) {
      matches.push(Object.assign({}, emoji, {
        index: matchingIndex,
      }));
    }
  });

  return matches.sort((a, b) => {
    return a.index - b.index;
  });
}
