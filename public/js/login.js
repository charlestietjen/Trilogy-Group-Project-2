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
      alert('Username or password incorrect');
       }
     }
   
  
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector("#confirm-passsword-signup").value.trim();
    const isSamePassword = (password == confirmPassword)
    // const matchpass = document.querySelector("text/javascript");
    // function matchpass(){  
    // var firstpassword=document.f1.password.value;  
    // var secondpassword=document.f1.password2.value;  
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
     alert ("Please provide a password!")
}
        // console.log(response)
        // alert(response.statusText);
      }
    // }
    // if(firstpassword==secondpassword){  
      // return true;  
      // document.location.replace('/');
      // }  
      // else{  
      // alert("password must be same!");  
      // return false;  
      // }  
      // }  
  // }    
  // }
  
  

  document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);