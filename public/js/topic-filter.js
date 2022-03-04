const topicFilterHandler = function(event){
    event.preventDefault();
    document.location.replace(`/${this.innerText}`);
}

const topicRightList = document.querySelectorAll('.topic-right');
topicRightList.forEach(btn => {
    btn.addEventListener('click', topicFilterHandler);
});