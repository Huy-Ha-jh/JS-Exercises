(function() {

  // Email validation function
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Password validation function
  function isValidPassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  }

  // Form submission handler
  function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let valid = true;

    // Email validation
    if (!isValidEmail(email)) {
      document.getElementById('emailError').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('emailError').style.display = 'none';
    }

    // Password validation
    if (!isValidPassword(password)) {
      document.getElementById('passwordError').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('passwordError').style.display = 'none';
    }

    // If both are valid, show success message
    if (valid) {
      document.getElementById('validMessage').style.display = 'block';
    } else {
      document.getElementById('validMessage').style.display = 'none';
    }
  }

  // Show/hide password functionality
  function handleShowPassword() {
    const passwordField = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('showPassword');

    showPasswordCheckbox.addEventListener('change', function() {
      if (this.checked) {
        passwordField.type = 'text'; // Show password
      } else {
        passwordField.type = 'password'; // Hide password
      }
    });
  }

  // Attach event listeners on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    // Form validation listener
    document.getElementById('validationForm').addEventListener('submit', handleFormSubmission);
    // Show password listener
    handleShowPassword();
  });

})();