// AI-Based Smart Scheduling Simulation
function generateSchedule() {
    let subjects = document.getElementById("subjects").value;
    let teachers = document.getElementById("teachers").value;
    let hours = document.getElementById("hours").value;
    
    if (!subjects || !teachers || !hours) {
        alert("Please enter all fields!");
        return;
    }

    let schedule = `✅ AI Suggests:\nEach subject gets ${Math.floor(hours / subjects)} hours daily.\nTeachers rotate every ${Math.floor(subjects / teachers)} periods.`;

    document.getElementById("schedule-output").innerText = schedule;
}
