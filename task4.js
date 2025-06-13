// DOM Elements
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const authContainer = document.getElementById('auth-container');
const securedPage = document.getElementById('secured-page');

// Social login buttons
const socialButtons = [
    ...document.querySelectorAll('#google-btn, #github-btn, #apple-btn, #google-btn-register, #github-btn-register, #apple-btn-register')
];

document.getElementById('show-register').addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    clearErrors();
});

document.getElementById('show-login').addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    clearErrors();
});


function clearErrors() {
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById('register-success').style.display = 'none';
}

// Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Check if user is logged in (on page load)
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        authContainer.style.display = 'none';
        securedPage.style.display = 'block';
    }
}

// Social login handler
function handleSocialLogin(type) {
    
    localStorage.setItem('currentUser', 'social-auth');
    authContainer.style.display = 'none';
    securedPage.style.display = 'block';
}

// Add social login event listeners
socialButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        let type = '';
        if (btn.id.includes('google')) type = 'Google';
        if (btn.id.includes('github')) type = 'GitHub';
        if (btn.id.includes('apple')) type = 'Apple';
        
        handleSocialLogin(type);
    });
});

// Registration
document.getElementById('register-btn').addEventListener('click', () => {
    clearErrors();
    
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    let isValid = true;
    
    if (!name) {
        document.getElementById('register-name-error').style.display = 'block';
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        document.getElementById('register-email-error').style.display = 'block';
        isValid = false;
    }
    
    if (password.length < 6) {
        document.getElementById('register-password-error').style.display = 'block';
        isValid = false;
    }
    
    if (password !== confirmPassword) {
        document.getElementById('register-confirm-error').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        
        if (userExists) {
            document.getElementById('register-email-error').textContent = 'Email already registered';
            document.getElementById('register-email-error').style.display = 'block';
        } else {
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
        
            document.getElementById('register-success').style.display = 'block';
            
            document.getElementById('register-name').value = '';
            document.getElementById('register-email').value = '';
            document.getElementById('register-password').value = '';
            document.getElementById('register-confirm-password').value = '';
            
            setTimeout(() => {
                registerForm.style.display = 'none';
                loginForm.style.display = 'block';
                document.getElementById('register-success').style.display = 'none';
            }, 2000);
        }
    }
});

// Login
document.getElementById('login-btn').addEventListener('click', () => {
    clearErrors();
    
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    let isValid = true;
    
    if (!isValidEmail(email)) {
        document.getElementById('login-email-error').style.display = 'block';
        isValid = false;
    }
    
    if (!password) {
        document.getElementById('login-password-error').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            // Login successful
            localStorage.setItem('currentUser', JSON.stringify(user));
            authContainer.style.display = 'none';
            securedPage.style.display = 'block';
        } else {
            document.getElementById('login-error').style.display = 'block';
        }
    }
});

window.addEventListener('DOMContentLoaded', checkAuth);