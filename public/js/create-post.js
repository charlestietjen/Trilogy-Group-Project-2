async function createPostHandler(event){
    event.preventDefault();

    const text = document.querySelector('#post-textarea').value.trim();
    const category = 'placeholder'; 

    if (!text){
        alert("A post can't be empty!");
        return;
    }
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
    }
}

function deleteButtonHandler(event){
    event.preventDefault();

    let text = document.querySelector('#post-textarea');
    text.value = '';
}

document.querySelector('#post-btn').addEventListener('click', createPostHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteButtonHandler);