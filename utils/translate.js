const dictionary = {
  This: "یہ",
  is: "ہے",
  some: "کچھ",
  dummy: "نقلی",
  content: "مواد",
  from: "سے",
  It: "یہ",
  has: "رکھتا ہے",
  multiple: "کئی",
  sentences: "جملے",
  another: "ایک اور",
  And: "اور",
  more: "مزید",
};

function translateToUrdu(sentence) {
  return sentence
    .split(" ")
    .map((word) => dictionary[word] || word)
    .join(" ");
}

module.exports = { translateToUrdu };
