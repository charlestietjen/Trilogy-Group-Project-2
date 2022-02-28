const loginButtonHandler = function(event){
    event.preventDefault()
    location.replace('/login');
}

const signupButtonHandler = function(event){
    event.preventDefault()
    location.replace('/login#signup');
}

document.querySelector('#login-btn').addEventListener('click', loginButtonHandler);
document.querySelector('#signup-btn').addEventListener('click', signupButtonHandler);