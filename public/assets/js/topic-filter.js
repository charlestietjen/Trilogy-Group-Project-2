// Topics filter
const topicFilterHandler = function(event){
    event.preventDefault();
    document.location.replace(`/${this.innerText}`);
}

// Topics right list
const topicRightList = document.querySelectorAll('.topic-right');
topicRightList.forEach(btn => {
    btn.addEventListener('click', topicFilterHandler);
});