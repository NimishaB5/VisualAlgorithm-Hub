document.addEventListener("DOMContentLoaded", function () {
    // Typing animation for algorithm names
    const algorithmNameElement = document.getElementById("algorithm-name");

    if (algorithmNameElement) {
        const algorithmNames = ["Bubble Sort", "Quick Sort", "Dijkstra's Algorithm", "Binary Search"];
        let currentAlgorithmIndex = 0;

        function typeAlgorithmName() {
            const currentAlgorithm = algorithmNames[currentAlgorithmIndex];
            const speed = 100; // typing speed in milliseconds per character

            let charIndex = 0;
            algorithmNameElement.textContent = ""; // clear existing text

            function typeNextCharacter() {
                if (charIndex < currentAlgorithm.length) {
                    algorithmNameElement.innerHTML += currentAlgorithm.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeNextCharacter, speed);

                    // Add blinking cursor during typing
                    if (charIndex === currentAlgorithm.length) {
                        algorithmNameElement.innerHTML += '<span class="cursor">|</span>';
                    }

                } else {

                    // Wait for a moment before erasing
                    setTimeout(eraseAlgorithmName, 1000);
                }
            }

            function eraseAlgorithmName() {
                // Hide cursor during erasing
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.display = 'none';
                }
                if (charIndex >= 0) {
                    algorithmNameElement.innerHTML = currentAlgorithm.substring(0, charIndex);
                    charIndex--;
                    setTimeout(eraseAlgorithmName, speed / 2);
                } else {
                    // Move to the next algorithm name
                    currentAlgorithmIndex = (currentAlgorithmIndex + 1) % algorithmNames.length;
                    // Wait for a moment before typing the next algorithm name
                    setTimeout(typeAlgorithmName, 500);
                }
            }

            // Start typing the algorithm name
            typeNextCharacter();
        }

        // Start the typing animation
        typeAlgorithmName();
    }
    const menuIcon = document.getElementById('menu-icon');
    const menuList = document.getElementById('nav-content');

    menuList.style.display = 'none';

    menuIcon.addEventListener('click', function () {
        // Toggle the visibility of the menu list
        menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
    });

    // Add an event listener to hide the menu on larger screens
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            menuList.style.display = 'none';
        }
    });
}); 




    const arrayContainer = document.getElementById("array-container");
    let originalArray = [];
    let currentArray = [];
    let animationSpeed = 5; // Default animation speed
    
    const arraySection = document.getElementById("sorting-section");
    const generateArrayButton = document.getElementById("generateArrayButton");
    
    document.getElementById("speedControl").addEventListener("input", function () {
        animationSpeed = this.value;
    });
    
    
    // Algorithm descriptions
    const algorithmDescriptions = {
        bubbleSort: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
        selectionSort: "Selection Sort is a simple sorting algorithm that sorts an array by repeatedly finding the minimum element and moving it to the beginning of the array.",
        insertionSort: "Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time.",
        quickSort: "Quick Sort is a fast and efficient sorting algorithm by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays.",
        mergeSort: "Merge Sort is a divide-and-conquer algorithm that divides an array into two sub-arrays, sorts each sub-array, and then merges them to create a sorted array."
    };
    
    // Function to display algorithm description
    function displayAlgorithmDescription(selectedAlgorithm) {
        console.log("Displaying description for:", selectedAlgorithm);
        const descriptionContainer = document.getElementById("algorithm-description");
        const complexityTable = document.getElementById("complexity-table");
        descriptionContainer.textContent = algorithmDescriptions[selectedAlgorithm] || "";

        // Update complexity table based on the selected algorithm
    const algorithmNameCell = document.getElementById("algorithm-name-cell");
    const averageCaseCell = document.getElementById("average-case-cell");
    const worstCaseCell = document.getElementById("worst-case-cell");
    const bestCaseCell = document.getElementById("best-case-cell");
    const spaceComplexityCell = document.getElementById("space-complexity-cell");

    algorithmNameCell.textContent = selectedAlgorithm;

    switch (selectedAlgorithm) {
        case "bubbleSort":
            averageCaseCell.textContent = "O(n^2)";
            worstCaseCell.textContent = "O(n^2)";
            bestCaseCell.textContent = "O(n)";
            spaceComplexityCell.textContent = "O(1)";
            break;
        case "selectionSort":
            averageCaseCell.textContent = "O(n^2)";
            worstCaseCell.textContent = "O(n^2)";
            bestCaseCell.textContent = "O(n^2)";
            spaceComplexityCell.textContent = "O(1)";
            break;
        case "insertionSort":
            averageCaseCell.textContent = "O(n^2)";
            worstCaseCell.textContent = "O(n^2)";
            bestCaseCell.textContent = "O(n)";
            spaceComplexityCell.textContent = "O(1)";
            break;
        case "quickSort":
            averageCaseCell.textContent = "O(n log n)";
            worstCaseCell.textContent = "O(n^2)";
            bestCaseCell.textContent = "O(n log n)";
            spaceComplexityCell.textContent = "O(log n)";
            break;
        case "mergeSort":
            averageCaseCell.textContent = "O(n log n)";
            worstCaseCell.textContent = "O(n log n)";
            bestCaseCell.textContent = "O(n log n)";
            spaceComplexityCell.textContent = "O(n)";
            break;
        default:
            // Handle other algorithms as needed
            break;
    }
       // Show the complexity table header after updating the content
    complexityTable.style.display = "table";
    }
    
    // Run the selected algorithm
    async function runAlgorithm() {
        const algorithmSelect = document.getElementById("algorithmSelection");
        const selectedAlgorithm = algorithmSelect.value;
    
        if (selectedAlgorithm === "generateArray") {
            generateArray();
        } else if (selectedAlgorithm === "bubbleSort") {
            await bubbleSort();
            displayAlgorithmDescription("bubbleSort");
        } else if (selectedAlgorithm === "selectionSort") {
            await selectionSort();
            displayAlgorithmDescription("selectionSort");
        } else if (selectedAlgorithm === "insertionSort") {
            await insertionSort();
            displayAlgorithmDescription("insertionSort");
        } else if (selectedAlgorithm === "quickSort") {
            await quickSort();
            displayAlgorithmDescription("quickSort");
    
        } else if (selectedAlgorithm === "mergeSort") {
            await mergeSort();
            
        }
    }
    
    
    // Event listeners
    document.getElementById("runAlgorithmButton").addEventListener("click", runAlgorithm);
    document.getElementById("generateArrayButton").addEventListener("click", generateArray);
    
    //Generate a random array
    function generateRandomArray(size) {
        console.log("aray is generated");
        return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    }
    
    
    //Generate an array based on user input
    function generateArray() {
        // Get the value from the "arraySize" input field
        const arraySizeInput = document.getElementById("arraySize");
        const arraySize = parseInt(arraySizeInput.value, 10);
    
        // Generate an array of random numbers with the specified size and display bars
        originalArray = generateRandomArray(arraySize);
        console.log("araay is returned");
        currentArray = [...originalArray];
        console.log(currentArray);
        displayArray(currentArray);
    }
    
    generateArrayButton.addEventListener("click", () =>{
        arraySection.style.display = "block";
    });
    
    
    // Reset the array
    function resetArray() {
        currentArray = [...originalArray];
        displayArray(currentArray);
    }
    
    //Display the array using bars
    function displayArray(array) {
        arrayContainer.innerHTML = "";
        console.log(arrayContainer);
        for (const num of array) {
            const bar = document.createElement("div");
            bar.classList.add("bar");
            bar.style.height = `${num}%`;
            arrayContainer.appendChild(bar);
        }
    }

    async function highlight(index1, index2, highlightColor) {
        const bars = document.querySelectorAll(".bar");
        bars[index1].style.backgroundColor = highlightColor;
        bars[index2].style.backgroundColor = highlightColor;
    
        await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
    
        // Reset the color after a short delay
        await new Promise((resolve) => setTimeout(() => {
            bars[index1].style.backgroundColor = "lightblue";
            bars[index2].style.backgroundColor = "lightblue";
            resolve();
        }, 100 / animationSpeed));
    }
    
    
    async function bubbleSort() {
        const n = currentArray.length;
        let swapped=true;
        
    
        async function swap(i, j) {
            await highlight(i, j, "orange"); 
            await new Promise((resolve) => setTimeout(resolve, 100/ animationSpeed));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
            displayArray(currentArray);

            // Reset the highlight after the swap
             await new Promise((resolve) => setTimeout(() => {
                 highlight(i, j, "lightblue"); // Reset to original color
                 resolve();
             }, 100 / animationSpeed));
        }
    
        /*async function highlight(i, j) {
            const bars = document.querySelectorAll(".bar");
            bars[i].classList.add("bar-highlight");
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
            bars[i].classList.remove("bar-highlight");
            bars[j].classList.add("bar-highlight");
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
            
            bars[j].classList.remove("bar-highlight");
        }*/
    
        async function bubble() {
            swapped = false;
            for (let i = 0; i < n - 1; i++) {
                await highlight(i, i + 1, "yellow");
                if (currentArray[i] > currentArray[i + 1]) {
                    await swap(i, i + 1);
                    swapped = true;
                }
            }
        }
    
        async function bubbleSortAnimation() {
            do {
                await bubble();
            } while (swapped);
            
        }
    
        bubbleSortAnimation();
    }
    
    async function selectionSort() {
        const n = currentArray.length;
    
        async function swap(i, j) {
            await highlight(i, j, "orange"); // Highlight bars being swapped
            await new Promise((resolve) => setTimeout(resolve, 100/ animationSpeed));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
            displayArray(currentArray);

            // Reset the highlight after the swap
            await new Promise((resolve) => setTimeout(() => {
                highlight(i, j, "lightblue"); // Reset to original color
                resolve();
            }, 100 / animationSpeed));
        }
    
        /*async function highlight(i, j) {
            const bars = document.querySelectorAll(".bar");
            bars[i].classList.add("bar-highlight");
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
            bars[i].classList.remove("bar-highlight");
            bars[j].classList.add("bar-highlight");
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
            
            bars[j].classList.remove("bar-highlight");
        }*/
    
        async function selectionSortAnimation() {
            for (let i = 0; i < n - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < n; j++) {
                    highlight(i,j,"yellow");
                    if (currentArray[j] < currentArray[minIndex]) {
                        minIndex = j;
                    }
                }
                if (minIndex !== i) {
                    await swap(i, minIndex);
                }
            }
        }
    
        selectionSortAnimation();
    }
    
    async function insertionSort() {
        const n = currentArray.length;
    
        async function swap(i, j) {
            await highlight(i, j, "orange");
            await new Promise((resolve) => setTimeout(resolve, 100/ animationSpeed));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
            displayArray(currentArray);

            // Reset the highlight after the swap
            await new Promise((resolve) => setTimeout(() => {
                highlight(i, j, "lightblue"); // Reset to original color
                resolve();
            }, 100 / animationSpeed));
        }
    
    
        async function insertionSortAnimation() {
            for (let i = 1; i < n; i++) {
                let current = currentArray[i];
                let j = i - 1;
                while (j >= 0 && current < currentArray[j]) {
                    await highlight(j,j+1,"yellow");
                    await swap(j + 1, j);
                    j--;
                }
            }
        }
    
        insertionSortAnimation();
    }
    
    async function mergeSort() {
        currentArray = await mergeSortAnimation(currentArray);
        displayArray(currentArray);
    }
    
    async function mergeSortAnimation(array) {
        if (array.length <= 1) {
            return array;
        }
    
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
    
        return merge(await mergeSortAnimation(left), await mergeSortAnimation(right));
    }
    
    async function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
    
        while (leftIndex < left.length && rightIndex < right.length) {
            await highlight(leftIndex, rightIndex, "yellow");
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
             
            await displayArray(result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)));
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
      

        // Highlight bars being swapped
        await highlight(result.length - 1, result.length, "orange");
        await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
    }

        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
    
    async function quickSort() {
        await quickSortAnimation(0, currentArray.length - 1);
        displayAlgorithmDescription("quickSort");
    }
    
    async function quickSortAnimation(start, end) {
        if (start < end) {
            const pivotIndex = await partition(start, end);
            await quickSortAnimation(start, pivotIndex - 1);
            await quickSortAnimation(pivotIndex + 1, end);
        }
    }
    
    async function partition(start, end) {
        const pivotValue = currentArray[end];
    
        async function highlight(i, j, highlightColor = "yellow") {
            const bars = document.querySelectorAll(".bar");
            bars[i].style.backgroundColor = highlightColor;
            bars[j].style.backgroundColor = highlightColor;
    
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
    
            // Reset the color after a short delay
            await new Promise((resolve) => setTimeout(() => {
                bars[i].style.backgroundColor = "lightblue";
                bars[j].style.backgroundColor = "lightblue";
                resolve();
            }, 100 / animationSpeed));
        }
    
        async function swap(i, j) {
            await highlight(i, j, "orange"); // Highlight bars being swapped
            await new Promise((resolve) => setTimeout(resolve, 100 / animationSpeed));
            [currentArray[i], currentArray[j]] = [currentArray[j], currentArray[i]];
            displayArray(currentArray);
    
            // Reset the highlight after the swap
            await new Promise((resolve) => setTimeout(() => {
                highlight(i, j, "lightblue"); // Reset to original color
                resolve();
            }, 100 / animationSpeed));
        }
    
        let pivotIndex = start;
    
        for (let i = start; i < end; i++) {
            await highlight(i, pivotIndex, "yellow"); // Highlight bars being compared
            if (currentArray[i] < pivotValue) {
                await swap(i, pivotIndex);
                pivotIndex++;
            }
        }
    
        // Highlight the last comparison
        await highlight(pivotIndex, end, "yellow");
        
        // Swap the pivot into its final position
        await swap(pivotIndex, end);
    
        // Reset the color of the pivot bar after the last swap
        const bars = document.querySelectorAll(".bar");
        bars[pivotIndex].style.backgroundColor = "lightblue";
    
        return pivotIndex;
    }
    
    
    
    
    // Function to handle sorting algorithms page
    function handleSortingPage() {
        const sortingSection = document.getElementById("sorting-section");
        sortingSection.style.display = "block";
    }
    
    // Function to handle pathfinding algorithms page (if needed in the future)
    function handlePathfindingPage() {
        // Add logic for pathfinding page if needed
        window.location.href = "pathfinding.html";
    }
    
    // Event listeners
    document.getElementById("sorting-link").addEventListener("click", function (e) {
        e.preventDefault();
        handleSortingPage();
    });
    
    document.getElementById("pathfinding-link").addEventListener("click", function (e) {
        e.preventDefault();
        handlePathfindingPage();
    });
    document.addEventListener("DOMContentLoaded", function () {
        const currentLocation = window.location.href;
        const sortingLink = document.getElementById("sorting-link");
    
        if (currentLocation.includes("sorting.html")) {
            sortingLink.classList.add("active");
        }
        // Add similar logic for other pages if needed
    });
    // Function to handle navigation to the pathfinding page

// Event listener for a button or link that triggers the navigation
document.getElementById("goToPathfindingButton").addEventListener("click", function (e) {
    e.preventDefault();
    navigateToPathfindingPage();
});

    
    // Add any additional logic specific to sorting page
    
    // Generate an array when the page loads
    generateArray();
    
 