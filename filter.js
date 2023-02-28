//let keywordsListRegex = new RegExp(keywordsList.join("|"), "i"); x1yztbdb

const LOCAL_STORAGE_KEY = "filter.keywords.list";
const keywordsList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

function createFilter() {
  const navbar = document.querySelector('[role="navigation"]').firstElementChild;
  const navli = document.createElement("li");
  navbar.prepend(navli);
  const img = document.createElement("img");
  img.src = "icons/filter-icon-48.png";
  navli.appendChild(img);
  const dialog = document.createElement("dialog");

  dialog.innerHTML = `
  <h1>The Great Facebook Filter</h1>
  <p>Are you fed up with annoying content on Facebook? Are spoilers lurking everytime you scroll?</p>
  <p>Now you can block all of it!</p>
  <form id="form" method="post" action="">
    <label for="keyword">Enter a keyword</label>
    <input type="text" name="keyword" id="keyword" placeholder="keyword" autocomplete="off" autofocus required />
    <button>Add keyword</button>
  </form>
  <ul id="ul"></ul>
  `;

  navli.appendChild(dialog);

  img.addEventListener("click", () => {
    dialog.showModal();
    manageFilter();
  });
}

function manageFilter() {
  //variables

  const form = document.querySelector("#form");
  const ul = document.querySelector("#ul");

  //functions

  function addKeyword() {
    const li = document.createElement("li");
    const keyword = form.elements.keyword.value;
    keywordsList.push(keyword);
    saveKeywordsList();
    li.innerText = keyword;
    const button = document.createElement("button");
    button.innerText = "Remove keyword";
    button.classList.add("delete");
    li.appendChild(button);
    ul.appendChild(li);
    form.elements.keyword.value = "";
    button.addEventListener("click", removeKeyword);
  }

  function removeKeyword() {
    const li = this.parentElement;
    const button = li.firstElementChild;
    button.remove();
    const keyword = li.innerText;
    const index = keywordsList.indexOf(keyword);
    keywordsList.splice(index, 1);
    saveKeywordsList();
    li.remove();
  }

  function saveKeywordsList() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(keywordsList));
  }

  //logic

  if (keywordsList.length > 0) {
    for (const keyword of keywordsList) {
      const li = document.createElement("li");
      li.innerText = keyword;
      const button = document.createElement("button");
      button.innerText = "Remove keyword";
      button.classList.add("delete");
      li.appendChild(button);
      ul.appendChild(li);
      button.addEventListener("click", removeKeyword);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    addKeyword();
  });
}

function hide() {
  const listRegex = new RegExp(keywordsList.join("|"), "i");
  const fbelements = [".x1yztbdb"];
  const elements = document.querySelectorAll(fbelements);
  elements.forEach(function (element) {
    if (keywordsList.length > 0 && !element.classList.contains("hidden") && element.innerText.match(listRegex) !== null) {
      element.classList.add("hidden");
      const warning1 = document.createElement("img");
      warning1.src = "https://raw.githubusercontent.com/NickChach/blockcovidfacebookposts/main/cutecat.png";
      warning1.style = "display: block; margin: auto; width: 50%; height: auto";
      const warning2 = document.createElement("p");
      warning2.innerText = "Beware! Covid-19 content! If you want to read it, click here.";
      warning2.style = "display: block; margin: auto; font-size: 1.5em; color: #33DBFF; text-shadow: 2px 2px 5px #FF5733; text-align: center;";
      element.replaceWith(warning1, warning2);
      warning2.addEventListener("click", function (e) {
        e.target.replaceWith(element);
        warning1.replaceWith();
      });
    }
  });
}

window.onload = function () {
  createFilter();
  hide();
  window.addEventListener("scroll", hide);
};
