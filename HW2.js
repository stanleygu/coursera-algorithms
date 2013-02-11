//The file contains all of the integers between 1 and 10,000 (inclusive, with no repeats) in unsorted order. The integer in the ith row of the file gives you the ith entry of an input array.
//
//    Your task is to compute the total number of comparisons used to sort the given input file by QuickSort. As you know, the number of comparisons depends on which elements are chosen as pivots, so we'll ask you to explore three different pivoting rules.
//You should not count comparisons one-by-one. Rather, when there is a recursive call on a subarray of length m, you should simply add m−1 to your running total of comparisons. (This is because the pivot element is compared to each of the other m−1 elements in the subarray in this recursive call.)
//
//WARNING: The Partition subroutine can be implemented in several different ways, and different implementations can give you differing numbers of comparisons. For this problem, you should implement the Partition subroutine exactly as it is described in the video lectures (otherwise you might get the wrong answer).
//
//DIRECTIONS FOR THIS PROBLEM:
//
//For the first part of the programming assignment, you should always use the first element of the array as the pivot element.
//
var fs = require('fs');
var array = fs.readFileSync('QuickSort.txt').toString().split("\r\n");
var ints = array.splice(0,10000);
console.log('Loaded in ' + ints.length + ' items in an array')


// test array
var a = [2, 1, 3];

// Quick Sort
var quicksort = function(array, comparisons) {
    comparisons += array.length | 0;
    if (array.length <= 1) {
        return {array: array, comparisons: comparisons};
    } else {
        // choose pivot
        var p = choosePivot(array);
        var pivot = array[p];
        // partition
        part = partition(array, p);
        array = part.array;
        p = part.p; // location of pivot after partitioning
        // sort left
        var left = quicksort(array.slice(0,p), comparisons);
        leftArray = left.array;
        comparisons += left.comparisons;
        // sort right
        var right = quicksort(array.slice(p+1,array.length), comparisons);
        rightArray = right.array;
        comparisons += right.comparisons;
        // recombine
        return {array: leftArray.concat(array[p], rightArray), comparisons: comparisons};
    }
}

var choosePivot = function(array) {
    return 0;
}

var partition = function(array, p){
    var pivot = array[p];
    var length = array.length;
    // move pivot to the front
    array[p] = array[0];
    array[0] = pivot;
    // partition the array
    //console.log('array before partitioning: ' + array)
    var i = 1;
    for (var j = 1; j < length; j++){
        //console.log('i='+i+', j='+j)
        if (array[j] < pivot) {
            var temp = array[j];
            array[j] = array[i];
            array[i] = temp;
            i++;
        }
    }
    //console.log('array after partitioning: ' + array)
    // swap pivot
    array[0] = array[i-1];
    array[i-1] = pivot;
    return {array: array, p: i-1};
}

var testPartition = [3,4,5,1,2];
//var t = partition(testPartition, 0);
//console.log(t.array + ' with pivot at ' + t.p);

console.log(quicksort(testPartition,0));
console.log(quicksort(testPartition.concat(testPartition), 0));
