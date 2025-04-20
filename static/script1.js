// Update Date and Time in dd/mm/yyyy, 12-hour format
function updateDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format

    const dateTimeString = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
    document.getElementById("date-time").textContent = dateTimeString;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Copy All MCQs to Clipboard
function copyAllMCQs() {
    const mcqs = document.querySelectorAll(".mcq");
    let textToCopy = "";

    mcqs.forEach((mcq, index) => {
        const question = mcq.querySelector(".question").textContent.trim(); // Remove extra spaces
        const options = mcq.querySelectorAll(".option");
        const correctAnswer = mcq
            .querySelector(".correct-answer")
            .textContent.trim(); // Remove extra spaces

        // Format the question
        textToCopy += `${question}\n`;

        // Format the options
        options.forEach((option) => {
            textToCopy += `${option.textContent.trim()}\n`; // Remove extra spaces
        });

        // Format the correct answer
        textToCopy += `${correctAnswer}\n`;

        // Add an extra newline only between MCQs, not after the last one
        if (index < mcqs.length - 1) {
            textToCopy += "\n";
        }
    });

    // Remove extra spaces and newlines
    textToCopy = textToCopy.trim();

    // Create a temporary textarea to copy the text
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();

    try {
        // Try using the modern Clipboard API
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert("All MCQs copied to clipboard!");
            });
        } else {
            // Fallback for older browsers or mobile devices
            document.execCommand("copy");
            alert("All MCQs copied to clipboard!");
        }
    } catch (err) {
        alert("Failed to copy MCQs. Please try again.");
    } finally {
        // Clean up
        document.body.removeChild(tempTextarea);
    }
}

