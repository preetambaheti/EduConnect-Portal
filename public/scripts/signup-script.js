document.addEventListener("DOMContentLoaded", function () {
    // Ensure the script runs after the page loads
    const signupForm = document.getElementById("signup-form");

    if (!signupForm) {
        console.error("Signup form not found!");
        return;
    }

    // Check if input fields exist before proceeding
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) {
        console.error("One or more input fields not found! Check signup.html IDs.");
        return;
    }

    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch("/public/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                window.location.href = "/public/index"; // Redirect to home after signup
            } else {
                const errorMessage = await response.text();
                alert("Signup failed: " + errorMessage);
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    });
});
