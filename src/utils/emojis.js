import emojiKeywords from 'emojis-keywords';
import emojiList from 'emojis-list';

export const emojis = emojiKeywords.map((keyword, index) => {
  return {
    keyword: emojiKeywords[index],
    character: emojiList[index],
  };
});

// Returns a list of { keyword, character } objects with keyword that matches
// the query sorted by matching index.
export function getEmojiMatches(query) {
  const matches = [];
  emojis.forEach((emoji) => {
    const matchingIndex = emoji.keyword.indexOf(query);
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
