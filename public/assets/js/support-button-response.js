var supportBtnEl = document.querySelector("#support")
var rbarEl = document.querySelector("#right-sidebar")

// On click support button function
function supportButton () {
    rbarEl.innerHTML = `<div class = "flex center spacer" style = "align-items: center; height:75%;">
    <p class = "spacer text-white fade tf-h1" style="text-align:center;">Support</p>
    <button id="login-btn" href="mailto:support@spacedout.com" class=" spacer text-white-glow tf-h1">contact us</button>
</div>`

}

supportBtnEl.addEventListener("click", supportButton);