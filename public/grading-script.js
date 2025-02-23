document.addEventListener("DOMContentLoaded", () => {
    const fileUpload = document.getElementById("fileUpload");

    fileUpload.addEventListener("change", () => {
        if (fileUpload.files.length > 0) {
            document.getElementById("resultContainer").classList.add("hidden");
        }
    });
});

function gradeAssignment() {
    const fileInput = document.getElementById("fileUpload");
    const resultContainer = document.getElementById("resultContainer");
    const gradeElement = document.getElementById("grade");
    const feedbackElement = document.getElementById("feedback");

    if (!fileInput.files.length) {
        alert("Please upload a file first.");
        return;
    }

    const file = fileInput.files[0];
    const fileType = file.name.split('.').pop().toLowerCase();

    if (!['pdf', 'docx', 'txt'].includes(fileType)) {
        alert("Invalid file type. Please upload a PDF, DOCX, or TXT file.");
        return;
    }

    // Simulate AI grading logic (Replace with real AI integration)
    const grades = ["A", "B", "C", "D", "F"];
    const feedbacks = [
        "Excellent work! Keep it up.",
        "Good job, but there's room for improvement.",
        "Average performance, try to refine your content.",
        "Needs improvement. Focus on clarity and depth.",
        "Poor quality submission, please revise and resubmit."
    ];

    const randomIndex = Math.floor(Math.random() * grades.length);

    gradeElement.textContent = `Grade: ${grades[randomIndex]}`;
    feedbackElement.textContent = `Feedback: ${feedbacks[randomIndex]}`;

    resultContainer.classList.remove("hidden");
}
