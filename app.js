let taskList = [];
const input = document.querySelector(".input_task");
const add_btn = document.querySelector(".add_task");

const edit_btn = document.querySelector(".edit_btn");
const delete_btn = document.querySelector(".delete_btn");

function saveTasks() {
  localStorage.setItem("todoList", JSON.stringify(taskList));
}

function addTask() {
  let text = input.value;
  if (text) {
    taskList.push({ text: text, completed: false });
  }
  input.value = "";
  updateTasks();
  saveTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);
  updateTasks();
  saveTasks();
}

function toggleCompleted(index) {
  taskList[index].completed = !taskList[index].completed;
  updateTasks();
  saveTasks();
}

function editTask(index) {
  console.log(index);
  input.value = taskList[index].text;
  taskList.splice(index, 1);
  updateTasks();
  saveTasks();
}

function updateTasks() {
  const tasks = document.querySelector(".tasks");
  tasks.innerHTML = "";

  taskList.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <div class="task_container">
            <div style="display: flex; gap: 10px; margin-left: 10px" class="${
              task.completed ? "completedTask" : ""
            }">
              <input type="checkbox" class="checkTask" ${
                task.completed ? "checked" : ""
              } onClick="toggleCompleted(${index})"/>
              <p>${task.text}</p>
            </div>
            <div
              style="
                display: flex;
                gap: 20px;
                align-items: center;
                margin-right: 20px;
              "
            >
              <i class="fa-regular fa-pen-to-square edit_btn" 
              onClick="editTask(${index})"
              ></i>
              <i class="fa-solid fa-trash-can delete_btn" onClick="deleteTask(${index})"></i>
            </div>
          </div>
    `;

    tasks.appendChild(listItem);
  });
}

add_btn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});
