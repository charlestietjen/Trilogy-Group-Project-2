async function hideButtonHandler(event){
    event.preventDefault();
    const post_id = this.parentElement.parentElement.parentElement.getAttribute('data-id');
    const hideConf = confirm('Are you sure you want to hide this post?')
    if (!hideConf){
        return;
    }
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
        this.parentElement.parentElement.parentElement.style.display = 'none';
        return;
    }
    alert('Failed to hide post')
}

const hideButtons = document.querySelectorAll('.hide-btn')
hideButtons.forEach(btn => {
    btn.addEventListener('click', hideButtonHandler);
})