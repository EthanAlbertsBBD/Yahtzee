// const signInForm = document.getElementById("sign-up-from")
// const notificationMessage = document.getElementById("notification-message")


// signInForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     let formData = new FormData(event.target);
//     // need to send login request
//     // get response and set message or allow navigation? 
    
//     const response = 

//     response.then((data) => {
//         console.log(data)
//     });
//   });



function validatePassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const passwordStrengthMessage = document.getElementById("password-strength-message");

    // Check if password meets the required criteria (e.g., minimum length, contains uppercase and lowercase letters, and a number)
    const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (password === confirmPassword){
        if (strongPasswordRegex.test(password)) {
            // Password meets the requirements
            passwordStrengthMessage.innerHTML = "";
            return true;
        } else {
            // Password does not meet the requirements
            passwordStrengthMessage.innerHTML = "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.";
            return false;
        }
    }
    else{
        passwordStrengthMessage.innerHTML = "Passwords do not match";
        return false;
    }
 
}

validatePassword()