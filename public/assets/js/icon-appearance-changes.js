var hideEl = document.querySelector(".hide");
var likeEl = document.querySelector(".like");
var editEl = document.querySelector(".edit")
var deleteEl = document.querySelector(".edit")

let likedThis = false
let editingThis = false

// Post liked and Unliked
function likeClicked () {
    if ( likedThis === false ){
        console.log("you liked this");
        likedThis = true;
        likeEl.style.backgroundImage = "url('/assets/img/icons/heart_fill.svg')";
    }
    else {
        console.log ("you unliked this");
        likedThis = false;
        likeEl.style.backgroundImage = "url('/assets/img/icons/heart_outline.svg')";
    }
}

// Edited post and complete edit function
function editClicked () {
    if ( editingThis === false ){
        console.log("youre editing this");
        editingThis = true;
        editEl.style.backgroundImage = "url('/assets/img/icons/message_check.svg')";
    }
    else {
        console.log ("youre done editing this this");
        editingThis = false;
        editEl.style.backgroundImage = "url('/assets/img/icons/message_writing.svg')";
    }
}

likeEl.addEventListener("click", likeClicked);
editEl.addEventListener("click", editClicked);