/*
 * @lc app=leetcode.cn id=406 lang=javascript
 *
 * [406] 根据身高重建队列
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  // 先拍出来 0号位 大到小 1号位 小到大 的关系
  people.sort((a, b) => {
    if (a[0] == b[0]) {
      return a[1] - b[1];
    } else {
      return b[0] - a[0];
    }
  });
  for (let i = 1; i < people.length; i++) {
    if (people[i][1] != i) {
      let temp = people.splice(i, 1)[0];
      people.splice(temp[1], 0, temp);
    }
  }
  return people;
};
// @lc code=end
