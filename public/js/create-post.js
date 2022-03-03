async function createPostHandler(event){
    event.preventDefault();

    const textField = document.querySelector('#post-info');
    const text = textField.value.trim();
    const postCategories = ''; 
    const topicListEl = document.querySelector('#topic-list');

    if (!text){
        textField.setAttribute('placeholder', 'Please enter some text first.')
        return;
    }
    console.log(textField);
    textField.parentElement.style.display = 'none';
    document.querySelector('#delete-btn').parentElement.style.display = 'none';
    topicListEl.style.display = '';
}

function deleteButtonHandler(event){
    event.preventDefault();

    let text = document.querySelector('#post-info');
    text.value = '';
}

async function topicBtnHandler(event){
    event.preventDefault();
    const textField = document.querySelector('#post-info');
    const text = textField.value.trim();
    const category = this.innerText.trim();

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({
            text,
            category
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok){
        document.location.replace('/');
    } else {
        alert('Failed to create post');
        document.location.replace('/');
    }
}

document.querySelector('#post-btn').addEventListener('click', createPostHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteButtonHandler); 
const topicButtons = document.querySelectorAll('.topic');
topicButtons.forEach(btn => {
    btn.addEventListener('click', topicBtnHandler);
});