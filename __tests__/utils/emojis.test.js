import _ from 'lodash';
import { emojis, getEmojiMatches } from '../../src/utils/emojis';

describe('utils/emojis', () => {
  describe('emojis array', () => {
    it('every object in the array should contain a keyword and character', () => {
      let check = true;
      emojis.forEach((emoji) => {
        if (!_.has(emoji, 'keyword') || !_.has(emoji, 'character')) {
          check = false;
        }
      });
      expect(check).toBeTruthy();
    });
  });

  describe('getEmojiMatches', () => {
    it('returns an array with matching emojis', () => {
      const matchesForJoy = getEmojiMatches('joy');
      expect(matchesForJoy.length).toBe(3);
      expect(_.isEqual(matchesForJoy.map(obj => obj.keyword).sort(),
        [':joy:', ':joy_cat:', ':joystick:'])).toBeTruthy();

      const matchesForSmiley = getEmojiMatches('smiley');
      expect(matchesForSmiley.length).toBe(2);
      expect(_.isEqual(matchesForSmiley.map(obj => obj.keyword).sort(),
        [':smiley:', ':smiley_cat:'])).toBeTruthy();
    });

    it('returns an empty array if there are no matches', () => {
      const matchesForAsdf = getEmojiMatches('asdf');
      expect(matchesForAsdf.length).toBe(0);
      expect(_.isEqual(matchesForAsdf.map(obj => obj.keyword).sort(), [])).toBeTruthy();
    });
  });
});
