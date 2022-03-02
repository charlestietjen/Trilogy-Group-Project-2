async function editButtonHandler(event) {
  event.preventDefault();
  const id = this.parentElement.parentElement.parentElement.getAttribute('data-id');

}
  
const editButtons = document.querySelectorAll('.edit-btn')
editButtons.forEach(btn => {
  btn.addEventListener('click', editButtonHandler)});