function A(str, mark) {
  console.time("String.indexOf");
  console.log(str.indexOf(mark));
  console.timeEnd("String.indexOf");
}

function B(str, mark) {
  console.time("Array.match");
  for (var x = 0, y = str.length; x < y; x++) {
    if (mark[0] === str[x]) {
      let tempIndex = x;
      let isMatched = mark.every((markStr) => markStr === str[tempIndex++]);
      if (isMatched) {
        break;
      } else {
        continue;
      }
    }
  }
  console.log(x);
  console.timeEnd("Array.match");
}

function C(str, mark) {
  console.time("Array.indexOf");
  var i = str.indexOf(mark[0]);
  while (i != -1) {
    let tempIndex = i;
    let isMatched = mark.every((markStr) => str[tempIndex++]);
    if (isMatched) {
      break;
    } else {
      i = str.indexOf(mark[0], i + 1);
    }
  }
  console.log(i);
  console.timeEnd("Array.indexOf");
}

var str = "123abc123";
var mark = "yahaha";

while (str.length < 10000000) {
  str += str;
}

str += "yahaha";

A(str, mark);
B(str.split(""), mark.split(""));
C(str.split(""), mark.split(""));

// 18874368
// String.indexOf: 10.591064453125 ms
// 18874368
// Array.match: 210.509033203125 ms
// 18874368
// Array.indexOf: 107.285888671875 ms
