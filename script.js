let config = {
    'name_surname': {
        required: true,
        minlength: 3,
        maxlength: 50
    },
    'username': {
        required: true,
        minlength: 5,
        maxlength: 50
    },
    'email': {
        email: true,
        required: true,
        minlength: 7,
        maxlength: 50
    },
    'phone': {
        minlength: 9,
        maxlength: 13
    },
    'password': {
        required: true,
        minlength: 7,
        maxlength: 20,
    },
    'confirm_password': {
        required: true,
        minlength: 7,
        maxlength: 20,
        matching: 'password'
    }
};

let validator = new Validator(config);

const passwordField = document.getElementById('password');
const confirmPasswordField = document.getElementById('confirmPassword');
const showPasswordIcon = document.getElementById('showPassword');
const showConfirmPasswordIcon = document.getElementById('showConfirmPassword');

showPasswordIcon.addEventListener('click', function () {
    togglePasswordVisibility(passwordField, showPasswordIcon);
});

showConfirmPasswordIcon.addEventListener('click', function () {
    togglePasswordVisibility(confirmPasswordField, showConfirmPasswordIcon);
});

function togglePasswordVisibility(field, icon) {
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}