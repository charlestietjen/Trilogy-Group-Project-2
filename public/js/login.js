async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (email && password) {
  this.removeEventListener('submit', loginFormHandler);
  const response = await fetch('/api/users/login', {
  method: 'post',
  body: JSON.stringify({
    email,
    password
  }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  }
  } else {
    alert('Username or password incorrect');
    this.addEventListener('submit', loginFormHandler);
  }
}
   
  
async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector("#confirm-passsword-signup").value.trim();
  const isSamePassword = (password == confirmPassword)

  if (email && password && isSamePassword) {
    this.removeEventListener('submit', signupFormHandler);
   const response = await fetch('/api/users', {
    method: 'post',
    body: JSON.stringify({
    email,
    password
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace('/');
    return;
  } 
  } else if (!isSamePassword) {
    alert("Password must be the same!")
  } else if (!email) {
    alert("Please provide an email!")
  } else if (!password) {
    alert ("Please provide a password!")
  }
  this.addEventListener('submit', signupFormHandler);
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);