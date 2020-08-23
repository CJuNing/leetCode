/*
 * @lc app=leetcode.cn id=33 lang=javascript
 *
 * [33] 搜索旋转排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    if (!nums) { return -1 }
    let startIndex = 0,
        endIndex = nums.length - 1,
        middleIndex;
    while (endIndex >= startIndex) {
        // [3,4,5,6,7,8,9,0,1,2] => [3,4,5,6,7] [7,8,9,0,1,2]
        // [7,8,9,0,1,2,3,4,5,6] => [7,8,9,0,1] [1,2,3,4,5,6]
        middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
        if (nums[middleIndex] === target) {
            return middleIndex;
        } else if (nums[startIndex] === target) {
            return startIndex;
        } else if (nums[endIndex] === target) {
            return endIndex;
        }

        if (nums[startIndex] <= nums[middleIndex]) {
            if (nums[startIndex] < target && target < nums[middleIndex]) {
                endIndex = middleIndex - 1;
            } else {
                startIndex = middleIndex + 1;
            }
        } else {
            if (nums[middleIndex] < target && target < nums[endIndex]) {
                startIndex = middleIndex + 1;
            } else {
                endIndex = middleIndex - 1;
            }
        }
    }
    return -1;
};
// @lc code=end