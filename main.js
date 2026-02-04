/*
  =============
  HTML ELEMENTS
  =============
*/
const inputCreate = document.querySelector("#inputCreate");
const submit = document.querySelector("#submit");
const listRead = document.querySelector("#listRead");
const spanAlert = document.querySelector("#spanAlert");

/*
  Riprendere i dati inseriti, ogni volta che si ricarichi la pagina browser
*/
document.addEventListener("DOMContentLoaded", () => {
  const items = getItems();
  items.forEach((item) => {
    createList(item);
  });
});

submit.addEventListener("click", () => {
  create();
});

inputCreate.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    create();
  }
});

/*
  =============
  MAIN FUNCTION
  =============
*/
function create() {
  let item = inputCreate.value.trim();
  if (item) {
    createList(item);
    addItem(item);
    alerts("Aggiunto alla lista!", "success");
    inputCreate.value = "";
  }
}

/*
  Funzione che crea un elemento <li> con il contenuto passato,
  aggiunge il bottone di rimozione e lo inserisce nella lista HTML.
*/
function createList(content) {
  const li = document.createElement("li");
  li.textContent = content;
  li.classList.add("list");

  const buttonRemove = createButtonRemove("Rimuovi!");
  buttonRemove.addEventListener("click", () => {
    alerts("Rimosso dalla lista", "danger");
    removeItems(content);
    li.remove();
  });
  li.appendChild(buttonRemove);
  listRead.appendChild(li);
  return li;
}

/*
  Crea un bottone per rimuovere un elemento dalla lista.
*/
function createButtonRemove(content) {
  const buttonRemove = document.createElement("button");
  buttonRemove.textContent = content;
  buttonRemove.classList.add("btn", "btn-danger", "button-remove");
  return buttonRemove;
}

/*
  Mostrare un messaggio di alert con stile dinamico,
  e aggiungere l'icona di chiusura.
*/
function alerts(message, typeAlert) {
  spanAlert.textContent = message;
  spanAlert.classList.remove("d-none", "span-success", "span-danger");
  spanAlert.classList.add(`span-${typeAlert}`);

  if (typeAlert === "success") {
    const audio = new Audio("audio/level-up-03-199576.mp3");
    audio.play();
  }

  const closeAlerts = alertsClose();
  closeAlerts.onclick = () => spanAlert.classList.add("d-none");
  spanAlert.appendChild(closeAlerts);
}

/*
  Creare l'elemento per chiudere l'alert
*/
function alertsClose() {
  const alertCloseElement = document.createElement("div");
  alertCloseElement.classList.add("fa-solid", "fa-x", "fa-2xs", "closeIcon");
  return alertCloseElement;
}

/*
  =============
  LOCAL STORAGE
  =============
*/

// salvare gli elementi
function saveItems(items) {
  localStorage.setItem("list", JSON.stringify(items));
}

// recupare gli elementi
function getItems() {
  return JSON.parse(localStorage.getItem("list")) || [];
}

// aggiungere elemti
function addItem(item) {
  const items = getItems();
  items.push(item);
  saveItems(items);
}

//rimuovere elementi
function removeItems(removeItems) {
  let items = getItems();
  items = items.filter((item) => item !== removeItems);
  saveItems(items);
}
