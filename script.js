let inputTask = document.getElementById("add-task-input");
let addTaskBtn = document.querySelector(".add-task-btn");
let tasksList = document.querySelector(".tasks-list");
let emptyList = document.querySelector(".tasks-list-empty");
let dbTasks = [];
let counterCreated = document.querySelector(".counter-created");
let counterDone = document.querySelector(".counter-done");

inputTask.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let tarefa = inputTask.value;

    addTask(tarefa);
  }
});

addTaskBtn.addEventListener("click", (e) => {
  let tarefa = inputTask.value;

  addTask(tarefa);
});

function addTask(tarefa) {
  if (!tarefa || tarefa.trim() === "") return;

  dbTasks.push({
    descricao: tarefa.trim(),
    concluida: false,
  });

  counterCreated.textContent = dbTasks.length;
  renderListTask();
  updateDoneCounter();
}

function createTagLi(taskObj) {
  if (!taskObj || !taskObj.descricao === "") {
    return null;
  }

  let newTask = document.createElement("li");
  newTask.classList.add("task");
  if (taskObj.concluida) {
    newTask.classList.add("task-concluida");
  }

  let divTask = document.createElement("div");
  divTask.classList.add("div-task");

  let divIcons = document.createElement("div");
  divIcons.classList.add("div-icons");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = taskObj.concluida;

  let taskText = document.createElement("span");
  taskText.textContent = taskObj.descricao;

  checkbox.addEventListener("change", () => {
    taskObj.concluida = checkbox.checked;
    newTask.classList.toggle("task-concluida");
    updateDoneCounter();
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskObj, newTask);
  });

  let iconTrashBtn = document.createElement("img");
  iconTrashBtn.src = "./img/trash.svg";

  deleteBtn.appendChild(iconTrashBtn);

  divTask.appendChild(checkbox);
  divTask.appendChild(taskText);

  divIcons.appendChild(deleteBtn);

  newTask.appendChild(divTask);
  newTask.appendChild(divIcons);

  return newTask;
}

function deleteTask(taskObj, liElement) {
  let confirmacao = confirm("tem certeza que deseja excluir essa tarefa?");
  if (confirmacao) {
    let index = dbTasks.indexOf(taskObj);
    if (index >= 0) {
      dbTasks.splice(index, 1);
      tasksList.removeChild(liElement);
      counterCreated.textContent = dbTasks.length;
      updateDoneCounter();
    }
  }

  if (dbTasks.length === 0) {
    tasksList.replaceWith(emptyList);
  }
}

function renderListTask() {
  tasksList.innerHTML = "";
  for (let i = 0; i < dbTasks.length; i++) {
    let li = createTagLi(dbTasks[i]);
    if (li) {
      tasksList.appendChild(li);
    }
  }

  if (dbTasks.length >= 1) {
    emptyList.replaceWith(tasksList);
  }

  inputTask.value = "";
}

function updateDoneCounter() {
    let total = dbTasks.length
  let done = dbTasks.filter((task) => task.concluida).length;
  if (total > 0) {
    counterDone.textContent = `${done} de ${total}`;
  } else {
    counterDone.textContent = `${total}`;
  }
}