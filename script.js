// Helper function to sleep for a given number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate a random array for sorting
function generateRandomArray(size = 20, min = 10, max = 400) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min) + min));
}

// Create visual bars for the array
function createBars(array) {
    const visualization = document.getElementById('visualization');
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

// Swap function with visualization
async function swap(array, i, j, bars) {
    [array[i], array[j]] = [array[j], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[j].style.height = `${array[j]}px`;
    await sleep(100); // Adjust sleep time for visualization speed
}

// Visualization function for Bubble Sort
async function visualizeBubbleSort() {
    const array = generateRandomArray();
    const bars = createBars(array);

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
}

// Visualization function for Quick Sort
async function visualizeQuickSort() {
    const array = generateRandomArray();
    const bars = createBars(array);

    async function quickSort(arr, left, right) {
        if (left < right) {
            let pivotIndex = await partition(arr, left, right);
            await quickSort(arr, left, pivotIndex - 1);
            await quickSort(arr, pivotIndex + 1, right);
        }
    }

    async function partition(arr, left, right) {
        let pivot = arr[right];
        let i = left - 1;
        bars[right].style.backgroundColor = 'yellow';
        for (let j = left; j < right; j++) {
            bars[j].style.backgroundColor = 'red';
            if (arr[j] < pivot) {
                i++;
                await swap(arr, i, j, bars);
            }
            bars[j].style.backgroundColor = 'blue';
        }
        await swap(arr, i + 1, right, bars);
        bars[right].style.backgroundColor = 'blue';
        return i + 1;
    }

    await quickSort(array, 0, array.length - 1);

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

// Visualization function for Merge Sort
async function visualizeMergeSort() {
    const array = generateRandomArray();
    const bars = createBars(array);

    async function mergeSort(arr, l, r) {
        if (l >= r) return;
        let m = Math.floor((l + r) / 2);
        await mergeSort(arr, l, m);
        await mergeSort(arr, m + 1, r);
        await merge(arr, l, m, r);
    }

    async function merge(arr, l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let i = 0; i < n2; i++) R[i] = arr[m + 1 + i];

        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                bars[k].style.height = `${arr[k]}px`;
                i++;
            } else {
                arr[k] = R[j];
                bars[k].style.height = `${arr[k]}px`;
                j++;
            }
            k++;
            await sleep(100);
        }

        while (i < n1) {
            arr[k] = L[i];
            bars[k].style.height = `${arr[k]}px`;
            i++;
            k++;
            await sleep(100);
        }

        while (j < n2) {
            arr[k] = R[j];
            bars[k].style.height = `${arr[k]}px`;
            j++;
            k++;
            await sleep(100);
        }
    }

    await mergeSort(array, 0, array.length - 1);

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}

// Visualization function for Insertion Sort
async function visualizeInsertionSort() {
    const array = generateRandomArray();
    const bars = createBars(array);

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'red';

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1]}px`;
            bars[j + 1].style.backgroundColor = 'red';
            j--;
            await sleep(100);
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1]}px`;
        bars[j + 1].style.backgroundColor = 'green';

        for (let k = 0; k < i; k++) {
            bars[k].style.backgroundColor = 'green';
        }
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
}
