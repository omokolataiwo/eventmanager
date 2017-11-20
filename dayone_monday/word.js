function wordCount(word) {
  let words = word.toLowerCase().split(" ");
  let retObject = {};

  words.forEach((word) => {
    retObject[word] = retObject.hasOwnProperty(word) ? retObject[word]+1 : 1;
  });
  return retObject;
}

console.log(wordCount("olly olly in come free"));