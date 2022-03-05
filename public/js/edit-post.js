const editButtonHandler = function(event) {
  event.preventDefault();
  const post = this.parentElement.parentElement.parentElement;
  const id = post.getAttribute('data-id');
  let postContent = post.querySelector('.post-content').children[0];
  let editBox = document.createElement("textarea");
  editBox.classList = 'tf-p1 text-white text-input post-content-textarea';
  editBox.value = postContent.innerText;
  tempPostContent = postContent.innerText;
  postContent.parentElement.replaceChild(editBox, postContent);
  hide(this);
  hide(this.parentElement.parentElement.querySelector('.edit-focus-btn'));
}

async function editConfirmHandler(event){
  event.preventDefault();
  const post = this.parentElement.parentElement.parentElement;
  const postContent = post.querySelector('.post-content').children[0];
  const id = post.getAttribute('data-id');
  const postTextEl = post.querySelector('.text-input');
  const response = await fetch(`/api/posts/${id}`, {
    method: 'put',
    body: JSON.stringify({
      text: postTextEl.value
    }),
    headers: {'Content-Type': 'application/json'}
  })
  if (response.ok){
    let newTextEl = document.createElement('p');
    newTextEl.classList = 'tf-p2 text-white fade'
    newTextEl.innerText = postTextEl.value;
    postContent.parentElement.replaceChild(newTextEl, postTextEl);
    hide(this);
    hide(this.parentElement.parentElement.querySelector('.edit-btn'));
  } else {
    alert('Failed to update post');
  }
};

const hide = function(element){
  if (element.style.display === 'none'){
    element.style.display = '';
    return;
  }
  element.style.display = 'none';
};

let tempPostContent = '';
const editButtons = document.querySelectorAll('.edit-btn')
const editFocusButtons = document.querySelectorAll('.edit-focus-btn')
editButtons.forEach(btn => {
  btn.addEventListener('click', editButtonHandler)
});
editFocusButtons.forEach(btn => {
  btn.addEventListener('click', editConfirmHandler)
  hide(btn);
});