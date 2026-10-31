// Select the form and input fields
const form = document.getElementById("signupForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const formMessage = document.getElementById("formMessage");

// Select all input fields
const inputs = form.querySelectorAll("input");

// Validate each input field
function validateField(input) {

    let errorMessage = "";
    const value = input.value.trim();

    // Check full name
    if (input.id === "fullName") {

        if (value === "") {
            errorMessage = "Please enter your name.";
        }

    }

    // Check email format
    else if (input.id === "email") {

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "") {
            errorMessage = "Please enter your email address.";
        }
        else if (!emailPattern.test(value)) {
            errorMessage = "Please enter a valid email address.";
        }

    }

    // Check phone number
    else if (input.id === "phone") {

        const phonePattern = /^[0-9]{10}$/;

        if (value === "") {
            errorMessage = "Please enter your phone number.";
        }
        else if (!phonePattern.test(value)) {
            errorMessage = "Please enter a valid 10 digit phone number.";
        }

    }

    // Check password strength
    else if (input.id === "password") {

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (input.value === "") {
            errorMessage = "Please enter a password.";
        }
        else if (!passwordPattern.test(input.value)) {
            errorMessage =
                "Use 8 characters, uppercase, lowercase, number and special character.";
        }

    }

    // Check confirm password
    else if (input.id === "confirmPassword") {

        if (input.value === "") {
            errorMessage = "Please confirm your password.";
        }
        else if (input.value !== password.value) {
            errorMessage = "Passwords do not match.";
        }

    }

    // Display error message
    const errorElement = document.getElementById(input.id + "Error");

    errorElement.textContent = errorMessage;

    // Add or remove error border
    if (errorMessage !== "") {
        input.classList.add("invalid");
    }
    else {
        input.classList.remove("invalid");
    }

    return errorMessage === "";

}

// Focus and blur events
inputs.forEach(function (input) {

    // Focus event
    input.addEventListener("focus", function () {

        input.classList.add("focused");

    });

    // Blur event
    input.addEventListener("blur", function () {

        input.classList.remove("focused");

        validateField(input);

    });

    // Real-time validation while typing
    input.addEventListener("input", function () {

        validateField(input);

        formMessage.textContent = "";
        formMessage.className = "";

        // Check confirm password again if password changes
        if (input.id === "password" && confirmPassword.value !== "") {
            validateField(confirmPassword);
        }

    });

});

// Form submission
form.addEventListener("submit", function (event) {

    // Stop the page from refreshing
    event.preventDefault();

    let isValid = true;

    // Validate all input fields
    inputs.forEach(function (input) {

        if (!validateField(input)) {
            isValid = false;
        }

    });

    // Show successful submission message
    if (isValid) {

        formMessage.textContent =
            "Account created successfully! This is a demo.";

        formMessage.className = "success";

        // Clear the form
        form.reset();

        // Remove old error messages and borders
        inputs.forEach(function (input) {

            input.classList.remove("invalid", "focused");

            document.getElementById(input.id + "Error").textContent = "";

        });

    }

    // Show error message
    else {

        formMessage.textContent =
            "Please correct the errors above.";

        formMessage.className = "failure";

    }

});
