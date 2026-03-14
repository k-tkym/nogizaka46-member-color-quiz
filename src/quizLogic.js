export const getPairKey = (colorIds) => [...colorIds].sort().join('-');

export const isCorrectColorPair = (answerColorIds, correctColorIds) =>
    getPairKey(answerColorIds) === getPairKey(correctColorIds);
