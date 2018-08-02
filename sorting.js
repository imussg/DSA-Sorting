const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 
	45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69,
	64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 
	7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5];
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

function bucket(arr, lowest, highest) {
	let hash = new Array(highest+1).fill(0);
	
	for(let i=0; i<arr.length; i++) {
		hash[arr[i]]++;
	}
	let iter = lowest;
	const order = [lowest];
	while(iter <= hash.length) {
		if(hash[iter] !== 0) {
			for(let i=0; i<hash[iter]; i++) {
				order.push(iter);
			}
		}
		iter++;
	}
	return order;
}

function sortInPlace(arr) {
	let count = 0;
	let index1, index2;
	while(count < 100) {
		index1 = Math.floor(Math.random()*arr.length);
		index2 = Math.floor(Math.random()*arr.length);
		swap(arr, index1, index2);
		count++;
	}
	return arr;
}

function bookSort(arr, compareLetter=0) {
	if(arr[0].length <= compareLetter) {
		return arr;
	}
	const hash = new Array('z'.charCodeAt(0));
	let bookObj = createBookObjects(arr);
	let letter;
	for(let i=0; i<arr.length; i++) {
		letter = arr[i].charCodeAt(compareLetter);
		if(hash[letter]) {
			hash[letter].push(arr[i]);
		} else {
			hash[letter] = [arr[i]];
		}
	}
	// console.log(hash);
	// return;
	return assemble(hash, arr, compareLetter);
}

function assemble(hash, arr, compareLetter) {
	let rtn = [];
	let iter = 0;
	let recurse = [];
	// console.log(hash);
	// return;
	for(let i=0; i<hash.length; i++) {
		if(hash[i]) {
			if(hash[i].length > 1) {
				recurse = bookSort(hash[i], ++compareLetter);
				// console.log(recurse, "returning");
				// return recurse;
				for(let j=0; j<recurse.length; j++) {
					rtn.push(recurse[j]);
				}
			} else if(hash[i].length === 1) {
				rtn.push(hash[i][0]);
			}
		}
	}
	return rtn;
}

function createBookObjects(arr) {
	let objs = new Array(arr.length);
	for(let i=0; i<arr.length; i++) {
		objs[i] = {title: arr[i], array: makeArray(arr[i])};
	}
	return objs;
}

function makeArray(book) {
	let wordArray = [];
	let char;
	for(let i=0; i<book.length; i++) {
		char = book[i].toLowerCase();
		if((char.charCodeAt(0) > 48 && char.charCodeAt(0) < 58 ) || (char.charCodeAt(0) > 96 && char.charCodeAt(0) < 122)) {
			wordArray.push(char);
		}
	}
	return wordArray;
}

function main() {
	// console.log("quick sort: ", ...qSort(array));
	// console.log(`# of swaps: ${count}`);
	// console.log(`# of times partition called: ${partitionCount}`);
	// console.log("merge sort: ", ...mSort(array));
	// console.log("bucket sort: ", ...bucket(array, 1, 98));
	// console.log("sort in place: ", ...sortInPlace([1,2,3,4,5,6,7,8,9,10]));
	const books = [
		'Windows for Dummies',
		'10 Facts About Chuck Norris',
		'The REXX Language',
		'The C++ Programming Language',
		'JavaScript: The Good Parts',
		'Starlight and Time',
		'Teach Yourself C++ In 21 Days',
		'Pride and Prejudice',
		'To Kill A Mocking Bird',
		'The Great Gatsby',
		'1984',
		'The Ultimate Guide to Stuff',
		'DaVinci Code',
		'Star Wars: Yoda Stories',
		'The REXX Language',
		'A Series of Unfortunate Events',
		'Jurassic Park',
		'Harry Potter and the Half-Blood Prince',
		'The Lord of the Rings: Two Towers',
		'Moby Dick'
	];
	console.log(bookSort(books));
	// bookSort(books);
}

main();