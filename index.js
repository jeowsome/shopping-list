import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-89e87-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");
const addBtnEl = document.getElementById("add-button");
const inputEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");
let itemsArray = [];

onValue(itemsInDB, function (snapshot) {
  itemsArray = Object.entries(snapshot.val() || { Empty: "No Item" });
  renderList(itemsArray, shoppingListEl);
});

addBtnEl.onclick = () => {
  push(itemsInDB, inputEl.value);
  inputEl.value = "";
};

function renderList(itemList, ulEl) {
  ulEl.innerHTML = "";
  itemList.map((e) => ulEl.appendChild(createLi(e)));
}

function createLi(value) {
  const liEl = document.createElement("li");
  const [key, val] = value;
  liEl.setAttribute("id", key);
  liEl.setAttribute("class", "item");
  liEl.textContent = val;
  liEl.ondblclick = () => {
    remove(ref(database, `items/${key}`));
    setTimeout(function () {
      alert(`${val} has been removed`);
    }, 1);
  };
  return liEl;
}
