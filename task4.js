document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');

    // Event Listeners
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    registerBtn.addEventListener('click', register);
    loginBtn.addEventListener('click', login);

    // Functions
    function register() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Simple validation
        if (!name || !email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            showAlert('User already exists with this email', 'danger');
            return;
        }

        // Add new user
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        showAlert('Registration successful! Please login.', 'success');
        container.classList.remove("right-panel-active");
        
        // Clear form
        document.getElementById('registerName').value = '';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
    }

    function login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation
        if (!email || !password) {
            showAlert('Please fill in all fields', 'danger');
            return;
        }

        // Check user credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            // Successful login
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            showAlert('Login successful!', 'success');
            
            // Clear form
            document.getElementById('loginEmail').value = '';
            document.getElementById('loginPassword').value = '';
        } else {
            showAlert('Invalid email or password', 'danger');
        }
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.appendChild(document.createTextNode(message));
        document.body.appendChild(alertDiv);
        
        // Remove alert after animation
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }
});