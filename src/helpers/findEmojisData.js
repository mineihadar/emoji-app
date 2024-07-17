import emojiStats from "../data/emoji_statistics.json";

export const findEmojiInData = (emoji) => {
  return emojiStats[emoji];
};
