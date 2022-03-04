async function deleteButtonHandler(event) {
  event.preventDefault();
  const id = this.parentElement.parentElement.parentElement.getAttribute('data-id');
  const deleteConfirm = confirm('Are you sure you want to delete this post?')
  this.removeEventListener('click', deleteButtonHandler);
  if (!deleteConfirm){
    this.addEventListener('click', deleteButtonHandler);
    return;
  }
  const response = await fetch(`/api/posts/${id}`, {
    method: 'delete',
    headers: {'Content-Type': 'application/json'}
  })

  if (response.ok){
    this.parentElement.parentElement.parentElement.style.display = 'none';
  } else {
    alert('Failed to delete post');
    this.addEventListener('click', deleteButtonHandler);
  }
}
  
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach(btn => {
  btn.addEventListener('click', deleteButtonHandler);
})