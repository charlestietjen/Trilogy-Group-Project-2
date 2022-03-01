async function hideButtonHandler(event){
    event.preventDefault();
    const post_id = this.parentElement.parentElement.getAttribute('data-id');
    console.log(post_id);
    const response = await fetch('/api/posts/hide', {
        method: 'put',
        body: JSON.stringify({
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok){
        this.parentElement.parentElement.style.display = 'none';
        return;
    }
    alert('Failed to hide post')
}

const buttons = document.querySelectorAll('.hide-btn')
buttons.forEach(btn => {
    btn.addEventListener('click', hideButtonHandler);
})