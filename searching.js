document.addEventListener("DOMContentLoaded", function() {
// Linear search algorithm
function linearSearch(array, target) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i; // Target found, return index
        }
    }
    return -1; // Target not found
}

// Binary search algorithm (assuming array is sorted)
function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            return mid; // Target found, return index
        } else if (array[mid] < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }

    return -1; // Target not found
}

// Function to create and append array elements to the container
function createArrayElement(value) {
    const element = document.createElement("div");
    element.classList.add("array-element");
    element.textContent = value;
    return element;
}

// Function to visualize the search algorithm
function visualizeSearch(algorithm, array, target) {
    
    const arrayContainer = document.getElementById("array-container");
    const algorithmDescription = document.getElementById("algorithm-description");

    // Clear previous array elements
    arrayContainer.innerHTML = "";
    algorithmDescription.innerHTML = "";

    // Create and append array elements to the container
    array.forEach((value) => {
        const arrayElement = createArrayElement(value);
        arrayContainer.appendChild(arrayElement);
    });

    const arrayElements = document.querySelectorAll(".array-element");

    // Reset previous visualizations
    arrayElements.forEach((element) => {
        element.style.backgroundColor = "";
    });

    // Declare found outside the linearSearchVisualization function
    let found = false;

     // Implement the visualization logic based on the algorithm
    if (algorithm === "linear") {
        algorithmDescription.innerHTML = "Linear Search: This algorithm sequentially checks each element in the array until a match is found or the entire array is traversed.";
            linearSearchVisualization(arrayElements, array, target);
        } else if (algorithm === "binary") {
            algorithmDescription.innerHTML = "Binary Search: This algorithm compares the target value to the middle element of the array and eliminates half of the remaining elements based on the comparison.";
            binarySearchVisualization(arrayElements, array, target);
        }
    
}

    // Visualization logic for linear search
    const linearSearchVisualization = (arrayElements, array, target) => {
        let found = false;
    
        const linearSearchStep = (i) => {
            if (i < array.length) {
                const currentElement = arrayElements[i];
                currentElement.style.backgroundColor = "#3498db"; // Highlight the current element being checked
    
                // Delay the visualization for a short period
                setTimeout(() => {
                    if (array[i] === target) {
                        currentElement.style.backgroundColor = "#2ecc71"; // Highlight the element when found
                        found = true;
                    } else {
                        currentElement.style.backgroundColor = "#e74c3c"; // Highlight the element when not found
                    }
    
                    // Reset the background color after a short delay
                    setTimeout(() => {
                        currentElement.style.backgroundColor = "";
    
                        // Check if it's the last element
                        if (i === array.length - 1) {
                            // Display the result after the visualization completes
                            setTimeout(() => {
                                const searchResult = document.getElementById("searchResult");
                                searchResult.innerHTML = found
                                    ? `<i class="fas fa-check-circle"></i> Element found at index ${array.indexOf(target)}`
                                    : `<i class="fas fa-times-circle"></i> Element not found`;
                            }, 500);
                        } else {
                            // Continue with the next step
                            linearSearchStep(i + 1);
                        }
                    }, 500);
                }, 500);
            }
        };
    
        // Start the linear search visualization
        linearSearchStep(0);
    }
    
    
 
                

// Visualization logic for binary search
function binarySearchVisualization(arrayElements, array, target) {
    let low = 0;
    let high = array.length - 1;

    const binarySearchStep = () => {
        if (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midElement = arrayElements[mid];

            // Highlight the current mid element being checked
            midElement.style.backgroundColor = "#3498db";

            // Delay the visualization for a short period
            setTimeout(() => {
                if (array[mid] === target) {
                    midElement.style.backgroundColor = "#2ecc71"; // Highlight the element when found
                    // Display the result after the visualization completes
                    setTimeout(() => {
                        const searchResult = document.getElementById("searchResult");
                        searchResult.innerHTML = `<span style="color: #2ecc71;">Result: Element found at index ${mid}</span>`;
                    }, 500);
                    return;
                } else if (array[mid] < target) {
                    // Highlight the right half if the target is in the right
                    Array.from(arrayElements).slice(low, high + 1).forEach((el) => {
                        el.style.backgroundColor = "#e74c3c";
                    });
                    low = mid + 1;
                } else {
                    // Highlight the left half if the target is in the left
                    Array.from(arrayElements).slice(mid, high + 1).forEach((el) => {
                        el.style.backgroundColor = "#e74c3c";
                    });
                    high = mid - 1;
                }

                // Reset the background color after a short delay
                setTimeout(() => {
                    arrayElements.forEach((el) => {
                        el.style.backgroundColor = "";
                    });

                    // Check if it's the last step
                    if (low > high) {
                        // Display the result after the visualization completes
                        setTimeout(() => {
                            const searchResult = document.getElementById("searchResult");
                            searchResult.innerHTML = `<i class="fas fa-times-circle"></i> Element not found`;
                        }, 500);
                    } else {
                        // Continue with the next step
                        binarySearchStep();
                    }
                }, 500);
            }, 500);
        }
    };

    // Start the binary search visualization
    binarySearchStep();
}




    

// Event listener for the "Start Search" button
document.getElementById("startSearch").addEventListener("click", () => {
    const arrayInput = document.getElementById("arrayInput").value;
    const targetInput = document.getElementById("targetInput").value;
    const searchAlgorithm = document.getElementById("searchAlgorithm").value;

    // Convert the input array to an array of numbers
    const array = arrayInput.split(",").map((num) => parseInt(num.trim(), 10));

    // Convert the target to a number
    const target = parseInt(targetInput.trim(), 10);

    // Call the visualization function
    visualizeSearch(searchAlgorithm, array, target);
});

// Event listener for the "Reset" button
document.getElementById("resetSearch").addEventListener("click", () => {
    // Clear the array and target input fields
    document.getElementById("arrayInput").value = "";
    document.getElementById("targetInput").value = "";

    // Clear the search result
    document.getElementById("searchResult").innerHTML = "";

    // Clear the array visualization
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = "";
});
    
});

