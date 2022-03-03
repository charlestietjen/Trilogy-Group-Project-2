var postBtnEl = document.querySelector("#newpost-btn");
var textEl = document.querySelector(".text-input");
var leftsidebarEl = document.querySelector("#sidebar-left")

let topics = [{id: 1, title:"happiness"},

    {id: 2, title: "sadness"},
    
    {id: 3, title: "madness"},
    
    {id: 4, title: "badness"},

    {id: 5, title: "openness"},

    {id: 6, title: "humerus"},

    {id: 7, title: "bilbo"}
];

function pickCategory (e){
    if (e.target !== e.currentTarget && e.target.id!== "new-topic")
        var clickedItem = e.target.id;
         console.log(clickedItem)
            if (clickedItem === "make-new") {
                document.querySelector(".topic-browser").removeEventListener("click", pickCategory);
                document.querySelector(".topic-browser").innerHTML = ` <input placeholder="new topic" spellcheck="false" id="new-topic" type="text" class="form-control topic-input" required> <button id="button" type="submit" class="spacer text-white-glow tf-h1">submit</button>`;
    }
            else { 
                leftsidebarEl.innerHTML = `<div class = "flex center spacer">
            <p class = "text-white fade tf-h1 new-post">New post</p>
        </div>
        <form class = "flex wrapper-none">
        <textarea class="text-input tf-p1 text-white fade" spellcheck="false" id="post-info" name="post-info" ></textarea>
    </form>
        <div class = "flex space-evenly">
        <p class = "text-3rd-glow tf-h1 delete-post-btn">delete</button>
        <p class = "text-white-glow fade tf-h1" id = "newpost-btn">post</button>
        </div>`;
        postBtnEl.addEventListener("click", postSubmitted);
        }
};

function postSubmitted () {
    if(textEl.value == '')
{
    return textEl.placeholder ="no post :(";
}

let topicStart = `<div class = "flex center spacer">
<p class = "text-white fade tf-h1">topics</p>
<div class = "flex center spacer topic-browser">`

let topicMiddle = "";
let nextNum;

topics.forEach(element => {

if ( element.id < 9) {
    num = "0" + element.id;
}
else {
    num = element.id;
};
    let currentTopic = '<p class = "tf-p2 text-white-glow topic"><span class="double-fade">' + num + '</span> ' + element.title + '</p>';
    topicMiddle += currentTopic;
    nextNum = element.id += 1;

})

if ( nextNum < 9) {
    nextNum = "0" + nextNum;
}

topicMiddle += '<p class = "tf-p2 text-white-glow topic" id = "make-new"><span class="double-fade">' + nextNum + '</span> make new </p></div></div>';
topicSelector = topicStart + topicMiddle;
leftsidebarEl.innerHTML = topicSelector;

document.querySelector(".topic-browser").addEventListener("click", pickCategory);

}




postBtnEl.addEventListener("click", postSubmitted);
