// Login 
const buttonHandler = function(event){
    event.preventDefault();
    document.location.replace('/login');
};


const likeButtons = document.querySelectorAll('.like-btn');
// Like a post not logged in
likeButtons.forEach(btn => {
    btn.addEventListener('click', buttonHandler);
});

const hideButtons = document.querySelectorAll('.hide-btn')
// Hide a post not logged in 
hideButtons.forEach(btn => {
    btn.addEventListener('click', buttonHandler);
});