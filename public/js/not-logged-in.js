const buttonHandler = function(event){
    event.preventDefault();
    document.location.replace('/login');
};

const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach(btn => {
    btn.addEventListener('click', buttonHandler);
});
const hideButtons = document.querySelectorAll('.hide-btn')
hideButtons.forEach(btn => {
    btn.addEventListener('click', buttonHandler);
});