// Set the default value for start_page to 1
const startPageInput = document.getElementById("start_page");
startPageInput.value = 1; // Set the default value

// Hide the default value visually
startPageInput.addEventListener("focus", () => {
    if (startPageInput.value === "1") {
        startPageInput.value = ""; // Clear the value when the user focuses on the input
    }
});

// Restore the default value if the user leaves the input empty
startPageInput.addEventListener("blur", () => {
    if (startPageInput.value === "") {
        startPageInput.value = 1; // Restore the default value
    }
});

let totalPages = 0;

// Handle file input change
document
    .getElementById("fileInput")
    .addEventListener("change", function (event) {
        const file = event.target.files[0];
        const fileNameElement = document.getElementById("fileName");
        const progressBarContainer = document.getElementById(
            "progressBarContainer"
        );
        const progressBar = document.getElementById("progressBar");
        const progressText = document.getElementById("progressText");

        if (!file) {
            fileNameElement.textContent = "No file selected";
            progressBarContainer.style.display = "none";
            return;
        }

        // Check if the file type is supported
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!["pdf", "docx", "txt"].includes(fileExtension)) {
            alert("Unsupported file type. Please upload a PDF, DOCX, or TXT file.");
            fileNameElement.textContent = "No file selected";
            event.target.value = ""; // Clear the file input
            progressBarContainer.style.display = "none";
            return;
        }

        fileNameElement.textContent = file.name;
        progressBarContainer.style.display = "flex"; // Use flex for alignment

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.value = progress;
            progressText.textContent = `${progress}%`;

            if (progress >= 100) {
                clearInterval(interval);
                progressText.textContent = "Upload complete!";
            }
        }, 300);

        if (fileExtension === "pdf") {
            extractPdfPages(file);
        } else if (fileExtension === "docx") {
            extractDocxPages(file);
        } else if (fileExtension === "txt") {
            extractTxtPages(file);
        }
    });

// Extract total pages from PDF
function extractPdfPages(file) {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const typedArray = new Uint8Array(this.result);
        pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
            totalPages = pdf.numPages;
            console.log("Total pages in PDF:", totalPages); // Debugging
            updateEndPageInput(totalPages);
        });
    };
    fileReader.readAsArrayBuffer(file);
}

// Extract total pages from DOCX
// Extract total pages from DOCX
function extractDocxPages(file) {
    const fileReader = new FileReader();

    fileReader.onload = function () {
        let arrayBuffer = fileReader.result;

        // Extract text from DOCX
        mammoth
            .extractRawText({ arrayBuffer: arrayBuffer })
            .then((result) => {
                let text = result.value.trim();

                // Count words
                let wordCount = text.split(/\s+/).length;

                // Detect tables (lines with consistent tabs or spaces)
                let tableLines = text.split("\n").filter((line) => line.match(/(\t|\s{4,})/g));
                let tableCount = tableLines.length;

                // Detect headings (lines in ALL CAPS or with specific formatting)
                let headingCount = (text.match(/(?:\n|^)[A-Z\s\d]+(?:\n|$)/g) || []).length;

                // Count paragraphs
                let paragraphCount = text.split(/\n\n|\r\n\r\n/).length;

                // Estimate pages based on words, tables, and headings
                let wordsPerPage = 300; // Default words per page
                if (tableCount > 5 || headingCount > 5) {
                    wordsPerPage = 200; // Adjust for more complex formatting
                }

                // Estimate pages based on word count
                let estimatedPagesByWords = Math.ceil(wordCount / wordsPerPage);

                // Extract image count using JSZip
                JSZip.loadAsync(arrayBuffer)
                    .then((zip) => {
                        let imageFiles = Object.keys(zip.files).filter((fileName) =>
                            fileName.match(/\.(jpg|jpeg|png|gif)$/i)
                        );

                        let imageCount = imageFiles.length;

                        // Adjust pages for images (assume 100 words per image)
                        let estimatedPagesByImages = Math.ceil(imageCount * 100 / wordsPerPage);

                        // Weighted average calculation
                        totalPages = Math.round(
                            estimatedPagesByWords * 0.6 + // 70% weight to word count
                            estimatedPagesByImages * 0.4 // 30% weight to images
                        );

                        console.log("Word Count:", wordCount);
                        console.log("Table Count:", tableCount);
                        console.log("Heading Count:", headingCount);
                        console.log("Paragraph Count:", paragraphCount);
                        console.log("Image Count:", imageCount);
                        console.log("Estimated Total Pages:", totalPages);

                        updateEndPageInput(totalPages);
                     
                    })
                    .catch((error) => {
                        console.error("Error extracting images from DOCX:", error);
                        alert("Failed to process images in the DOCX file.");
                    });
            })
            .catch((error) => {
                console.error("Error extracting text from DOCX:", error);
                alert("Failed to process the DOCX file.");
            });
    };

    fileReader.readAsArrayBuffer(file);
}
// Extract total pages from TXT
function extractTxtPages(file) {
    const fileReader = new FileReader();
    fileReader.onload = function () {
        const text = this.result;
        const wordCount = text.split(/\s+/).length;
        totalPages = Math.ceil(wordCount / 500);
        console.log("Total pages in TXT:", totalPages); // Debugging
        updateEndPageInput(totalPages);
    };
    fileReader.readAsText(file);
}

// Update the end_page input field
function updateEndPageInput(totalPages) {
    const endPageInput = document.getElementById("end_page");
    if (endPageInput) {
        endPageInput.value = totalPages;
        console.log("Updated end_page input to:", totalPages); // Debugging
    } else {
        console.error("end_page input field not found!"); // Debugging
    }
}

// Validate form submission
document.getElementById("mcqForm").addEventListener("submit", function (event) {
    const numQuestions = document.querySelector(
        'input[name="num_questions"]'
    ).value;
    const startPage = document.getElementById("start_page").value;
    const endPage = document.getElementById("end_page").value;

    console.log("Total Pages:", totalPages); // Debugging
    console.log("Start Page:", startPage); // Debugging
    console.log("End Page:", endPage); // Debugging

    // Validate number of questions
    if (numQuestions > 35) {
        alert("You can only generate a maximum of 35 questions.");
        event.preventDefault(); // Stop form submission
        return;
    }

    // Validate page range
    if (endPage) {
        // If end page is provided, validate it
        if (parseInt(endPage) > totalPages) {
            alert(
                `The document only has ${totalPages} pages. Please enter a valid end page.`
            );
            event.preventDefault(); // Stop form submission
            return;
        }

        // If start page is also provided, validate the range
        if (startPage) {
            if (parseInt(startPage) > parseInt(endPage)) {
                alert("Start page cannot be greater than end page.");
                event.preventDefault(); // Stop form submission
                return;
            }
        }
    }

    // Show loading screen
    document.getElementById("loadingScreen").style.display = "flex";
});

// Update date-time in dd/mm/yyyy, 12-hour format
function updateDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const dateTimeString = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("date-time").textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();
document.getElementById('hard-refresh-back-button').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  window.location.href = '/'; // Navigate to root URL
  window.location.reload(true); // Force reload from server (not from cache)
});