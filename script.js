function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateRandomArray(size = 50, max = 300) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1);
}

function createBars(array, visualizationId) {
    const visualization = document.getElementById(visualizationId);
    visualization.innerHTML = '';
    return array.map(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}px`;
        bar.style.width = '20px';
        bar.style.margin = '0 2px';
        bar.style.backgroundColor = 'blue';
        visualization.appendChild(bar);
        return bar;
    });
}

async function swap(array, i, j, bars) {
    [array[i], array[j]] = [array[j], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[j].style.height = `${array[j]}px`;
    await sleep(500);
}

function setDescription(descriptionId, text) {
    const description = document.getElementById(descriptionId);
    description.innerText = text;
}

// Bubble Sort
async function visualizeBubbleSort() {
    setDescription('bubbleSortDescription', "Bubble Sort: Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.");
    const array = generateRandomArray();
    const bars = createBars(array, 'bubbleSortVisualization');

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            
            if (array[j] > array[j + 1]) {
                await swap(array, j, j + 1, bars);
            }

            bars[j].style.backgroundColor = 'blue';
            bars[j + 1].style.backgroundColor = 'blue';
        }
        bars[array.length - i - 1].style.backgroundColor = 'green';
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

// Selection Sort
async function visualizeSelectionSort() {
    setDescription('selectionSortDescription', "Selection Sort: Divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front of the list and a sublist of the remaining unsorted items. The algorithm proceeds by finding the smallest (or largest) element from the unsorted sublist, swapping it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.");
    const array = generateRandomArray();
    const bars = createBars(array, 'selectionSortVisualization');

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'red';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await sleep(500);
            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = 'blue';
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'blue';
            }
        }
        if (minIndex !== i) {
            await swap(array, i, minIndex, bars);
        }
        bars[i].style.backgroundColor = 'green';
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

// Insertion Sort
async function visualizeInsertionSort() {
    setDescription('insertionSortDescription', "Insertion Sort: Builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.");
    const array = generateRandomArray();
    const bars = createBars(array, 'insertionSortVisualization');

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            bars[j + 1].style.backgroundColor = 'red';
            await sleep(500);
            bars[j + 1].style.backgroundColor = 'blue';
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${key}px`;
        bars[j + 1].style.backgroundColor = 'green';
        await sleep(500);
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

// Merge Sort
async function visualizeMergeSort() {
    setDescription('mergeSortDescription', "Merge Sort: An efficient, stable, comparison-based, divide and conquer sorting algorithm. Most implementations produce a stable sort, meaning that the implementation preserves the input order of equal elements in the sorted output.");
    const array = generateRandomArray();
    const bars = createBars(array, 'mergeSortVisualization');

    await mergeSort(array, 0, array.length - 1, bars);
}

async function mergeSort(array, left, right, bars) {
    if (left >= right) {
        return;
    }

    const middle = Math.floor((left + right) / 2);
    await mergeSort(array, left, middle, bars);
    await mergeSort(array, middle + 1, right, bars);
    await merge(array, left, middle, right, bars);
}

async function merge(array, left, middle, right, bars) {
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i]}px`;
            bars[k].style.backgroundColor = 'green';
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j]}px`;
            bars[k].style.backgroundColor = 'green';
            j++;
        }
        k++;
        await sleep(500);
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i]}px`;
        bars[k].style.backgroundColor = 'green';
        i++;
        k++;
        await sleep(500);
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j]}px`;
        bars[k].style.backgroundColor = 'green';
        j++;
        k++;
        await sleep(500);
    }
}

// Quick Sort
async function visualizeQuickSort() {
    setDescription('quickSortDescription', "Quick Sort: An efficient, comparison-based, divide and conquer sorting algorithm. When implemented well, it can be about two or three times faster than its main competitors, merge sort and heapsort.");
    const array = generateRandomArray();
    const bars = createBars(array, 'quickSortVisualization');

    await quickSort(array, 0, array.length - 1, bars);
}

async function quickSort(array, low, high, bars) {
    if (low < high) {
        const pi = await partition(array, low, high, bars);
        await quickSort(array, low, pi - 1, bars);
        await quickSort(array, pi + 1, high, bars);
    }
}

async function partition(array, low, high, bars) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'yellow';
        if (array[j] < pivot) {
            i++;
            await swap(array, i, j, bars);
        }
        bars[j].style.backgroundColor = 'blue';
    }
    await swap(array, i + 1, high, bars);
    return i + 1;
}

// Bucket Sort
async function visualizeBucketSort() {
    setDescription('bucketSortDescription', "Bucket Sort: A sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sort algorithm.");
    const array = generateRandomArray();
    const bars = createBars(array, 'bucketSortVisualization');

    await bucketSort(array, bars);
}

async function bucketSort(array, bars) {
    const n = array.length;
    if (n <= 0) return;

    const max = Math.max(...array);
    const bucket = Array.from({ length: max + 1 }, () => []);
    array.forEach(num => bucket[num].push(num));

    let index = 0;
    for (let i = 0; i < bucket.length; i++) {
        for (let j = 0; j < bucket[i].length; j++) {
            array[index] = bucket[i][j];
            bars[index].style.height = `${array[index]}px`;
            bars[index].style.backgroundColor = 'green';
            await sleep(300);
            index++;
        }
    }
}

// Heap Sort
async function visualizeHeapSort() {
    setDescription('heapSortDescription', "Heap Sort: A comparison-based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end.");
    const array = generateRandomArray();
    const bars = createBars(array, 'heapSortVisualization');

    await heapSort(array, bars);
}

async function heapSort(array, bars) {
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i, bars);
    }

    for (let i = n - 1; i > 0; i--) {
        await swap(array, 0, i, bars);
        await heapify(array, i, 0, bars);
    }
}

async function heapify(array, n, i, bars) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        await swap(array, i, largest, bars);
        await heapify(array, n, largest, bars);
    }
}

// Counting Sort
async function visualizeCountingSort() {
    setDescription('countingSortDescription', "Counting Sort: An integer sorting algorithm that counts the number of objects that have each distinct key value, and using arithmetic on those counts to determine the positions of each key value in the output sequence.");
    const array = generateRandomArray();
    const bars = createBars(array, 'countingSortVisualization');

    await countingSort(array, bars);
}

async function countingSort(array, bars) {
    const n = array.length;
    const max = Math.max(...array);
    const min = Math.min(...array);
    const range = max - min + 1;
    const count = Array(range).fill(0);
    const output = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        count[array[i] - min]++;
        bars[i].style.backgroundColor = 'red';
        await sleep(500);
    }

    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        output[count[array[i] - min] - 1] = array[i];
        count[array[i] - min]--;
        await sleep(500);
    }

    for (let i = 0; i < n; i++) {
        array[i] = output[i];
        bars[i].style.height = `${output[i]}px`;
        bars[i].style.backgroundColor = 'green';
        await sleep(500);
    }
}

// Radix Sort
async function visualizeRadixSort() {
    setDescription('radixSortDescription', "Radix Sort: A non-comparative sorting algorithm that sorts numbers by processing individual digits. It groups numbers by each digit position and uses a stable sorting algorithm to sort within each digit group.");
    const array = generateRandomArray();
    const bars = createBars(array, 'radixSortVisualization');

    await radixSort(array, bars);
}

async function radixSort(array, bars) {
    const max = Math.max(...array);
    let exp = 1;

    while (Math.floor(max / exp) > 0) {
        await countingSortForRadix(array, exp, bars);
        exp *= 10;
    }
}

async function countingSortForRadix(array, exp, bars) {
    const n = array.length;
    const output = Array(n).fill(0);
    const count = Array(10).fill(0);

    for (let i = 0; i < n; i++) {
        count[Math.floor(array[i] / exp) % 10]++;
        bars[i].style.backgroundColor = 'red';
        await sleep(500);
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(array[i] / exp) % 10;
        output[count[index] - 1] = array[i];
        count[index]--;
    }

    for (let i = 0; i < n; i++) {
        array[i] = output[i];
        bars[i].style.height = `${output[i]}px`;
        bars[i].style.backgroundColor = 'green';
        await sleep(500);
    }
}
