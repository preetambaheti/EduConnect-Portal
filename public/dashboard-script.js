// Chart.js Data
const ctx1 = document.getElementById('attendanceChart').getContext('2d');
new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ['Present', 'Absent'],
        datasets: [{ data: [95, 5], backgroundColor: ['#FF6600', '#EAF2FF'] }]
    }
});

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Task Manager
function addTask() {
    let taskInput = document.getElementById("new-task").value;
    if (taskInput) {
        document.getElementById("task-list").innerHTML += `<li>✔️ ${taskInput}</li>`;
        document.getElementById("new-task").value = "";
    }
}
