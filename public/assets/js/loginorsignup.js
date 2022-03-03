// Redirect to login page form
const loginButtonHandler = function(event){
    event.preventDefault()
    location.replace('/login');
}

// Redirect to sigm up page form
const signupButtonHandler = function(event){
    event.preventDefault()
    location.replace('/login#signup');
}

document.querySelector('#login-btn').addEventListener('click', loginButtonHandler);
document.querySelector('#signup-btn').addEventListener('click', signupButtonHandler);