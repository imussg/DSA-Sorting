const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
let count = 0;
let partitionCount = 0;

function swap(arr, pos1, pos2) {
	const temp = arr[pos1];
	arr[pos1] = arr[pos2];
	arr[pos2] = temp;
}

function qSort(arr, start=0, end=arr.length) {
	start = start;
	end = end;
	if(start >= end) {
		return arr;
	}
	let middle = partition(arr, start, end);
	arr = qSort(arr, start, middle);
	arr = qSort(arr, middle+1, end);
	return arr;
}

function partition(array, start, end) {
	const pivot = array[end-1];
	j = start;
	partitionCount++;
	for(let i=start; i<end-1; i++) {
		if(array[i] <= pivot) {
			swap(array, j, i);
			j++;
			count++;
		}
	}
	swap(array, j, end-1);
	return j;
}

function mSort(array) {
	if(array.length <= 1) {
		return array;
	}
	const middle = Math.floor(array.length/2);
	let left = array.slice(0, middle);
	let right = array.slice(middle, array.length);

	left = mSort(left);
	right = mSort(right);

	return merge(left, right, array);
}

function merge(left, right, array) {
	let leftIndex = 0;
	let rightIndex = 0;
	let index = 0;
	while(leftIndex < left.length && rightIndex < right.length) {
		if(left[leftIndex] < right[rightIndex]) {
			array[index++] = left[leftIndex++];
		} else {
			array[index++] = right[rightIndex++];
		}
	}
	
	for(let i=leftIndex; i<left.length; i++) {
		array[index++] = left[i];
	}
	for(let i=rightIndex; i<right.length; i++) {
		array[index++] = right[i];
	}
	return array;
}

function main() {
	// console.log(...qSort(array));
	// console.log(`# of swaps: ${count}`);
	// console.log(`# of times partition called: ${partitionCount}`);
	console.log(...mSort(array));
}

main();