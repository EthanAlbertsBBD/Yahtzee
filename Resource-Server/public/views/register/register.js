function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordStrengthMessage = document.getElementById("password-strength-message");

    // Check if password meets the required criteria (e.g., minimum length, contains uppercase and lowercase letters, and a number)
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (password === confirmPassword && strongPasswordRegex.test(password)) {
        // Password meets the requirements
        passwordStrengthMessage.innerHTML = "";
        return true;
    } else {
        // Password does not meet the requirements
        passwordStrengthMessage.innerHTML = "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
        return false;
    }
}

validatePassword()