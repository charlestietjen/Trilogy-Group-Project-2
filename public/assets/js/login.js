// Login form handler (Email and password required)
async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
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
    alert('Email or password incorrect');
  }
}

// Sign up form handler (email + password and comfirmation of password required)
async function signupFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector("#confirm-passsword-signup").value.trim();
  const isSamePassword = (password == confirmPassword)

  if (email && password && isSamePassword) {
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
    }
  } else if (!isSamePassword) {
    alert("Password must be the same!")
  } else if (!email) {
    alert("Please provide an email!")
  } else if (!password) {
    alert("Please provide a password!")
  }

}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);