export const isBalanced = (str: string): boolean => {
  const startingBrackets = "([{";
  const closingBrackets = ")]}";
  const bracketsMap = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  let brackets: string[] = [];

  Array.from(str).forEach((s) => {
    if (startingBrackets.includes(s)) brackets.push(s);

    const last = brackets[brackets.length - 1];

    if (closingBrackets.includes(s) && bracketsMap[last] === s) brackets.pop();
    else return false;
  });

  return brackets.length === 0;
};

// export const isBalanced = (str: string) => {
//     let brackets = {
//       "(": 0,
//       "{": 0,
//       "[": 0,
//     };
//     const bracketsMap = {
//       "}": "{",
//       ")": "(",
//       "]": "[",
//     };
//     let startingBracketIndex = 0;
//     let end = str.length - 1;
//     const arrStr = Array.from(str);
//     for (let i = 0; i < arrStr.length; i++) {
//       if (bracketsMap[arrStr[i]]) {
//         startingBracketIndex = i - 1;
//         if (bracketsMap[arrStr[i]] !== arrStr[startingBracketIndex]) {
//         }
//       }
//     }
//   };
//   ("[]{}()");
//   ("[{}]()");
//   ("[{()}]");
//   ("[{([)}]");
