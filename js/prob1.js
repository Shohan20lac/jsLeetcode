// PROBLEM 1

// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
// You can return the answer in any order.

// commentary:
// A simple O(n^2) solution, using nested for loops.

var twoSum = function(nums, target) {
    let targetFound = (firstIndex, secondIndex) =>
        (nums[firstIndex] + nums[secondIndex]) == target
    
    for (
        let firstIndex = 0;
        firstIndex < nums.length; 
        firstIndex ++
    ){
        for(
            let secondIndex = 0; 
            secondIndex < nums.length; 
            secondIndex ++
        ){
            if (firstIndex==secondIndex) {
                console.log ("ignoring comparison for duplicate element")
                continue
            }
            if (targetFound(firstIndex, secondIndex)){
                console.log("target found!")
                return [firstIndex, secondIndex]
            }
            else 
                console.log("result not found. Advancing...")
                
        }
    }
}
