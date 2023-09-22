"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Получаем ссылки на элементы DOM
  var taskInput = document.getElementById("task");
  var addTaskButton = document.getElementById("addTask");
  var todoList = document.getElementById("todo-list");
  var evenButton = document.getElementById("even");
  var oddButton = document.getElementById("odd");
  var deleteFirstButton = document.getElementById("deleteFirst");
  var deleteLastButton = document.getElementById("deleteLast");
  var completeButton = document.getElementById("complete"); // Загружаем задачи из локального хранилища

  var tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Функция для обновления списка задач

  function updateTaskList() {
    todoList.innerHTML = "";
    tasks.forEach(function (task, index) {
      var taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      var taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskItem.appendChild(taskText);
      var deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.innerHTML = "&#10006;"; // Здесь используем символ "✖" вместо текста

      deleteButton.addEventListener("click", function () {
        deleteTask(index);
      });
      taskItem.appendChild(deleteButton);

      if (task.completed) {
        taskText.classList.add("completed");
      }

      todoList.appendChild(taskItem);
    });
  } // Функция для сохранения задач в локальное хранилище


  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } // Функция для удаления задачи по индексу


  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    updateTaskList();
  } // Обработчик кнопки "Добавить"


  addTaskButton.addEventListener("click", function () {
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
      tasks.push({
        text: taskText,
        completed: false
      });
      taskInput.value = "";
      saveTasks();
      updateTaskList();
    }
  }); // Обработчик кнопки "Выделить четные"

  evenButton.addEventListener("click", function () {
    var taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(function (taskItem, index) {
      if (index % 2 !== 0) {
        taskItem.classList.toggle("even");
      }
    });
  }); // Обработчик кнопки "Выделить нечетные"

  oddButton.addEventListener("click", function () {
    var taskItems = document.querySelectorAll(".task-item");
    taskItems.forEach(function (taskItem, index) {
      if (index % 2 === 0) {
        taskItem.classList.toggle("odd");
      }
    });
  }); // Обработчик кнопки "Удалить первый элемент"

  deleteFirstButton.addEventListener("click", function () {
    if (tasks.length > 0) {
      tasks.shift();
      saveTasks();
      updateTaskList();
    }
  }); // Обработчик кнопки "Удалить последний элемент"

  deleteLastButton.addEventListener("click", function () {
    if (tasks.length > 0) {
      tasks.pop();
      saveTasks();
      updateTaskList();
    }
  }); // Обработчик кнопки "Complete"

  completeButton.addEventListener("click", function () {
    for (var i = 0; i < tasks.length; i++) {
      if (!tasks[i].completed) {
        tasks[i].completed = true;
        saveTasks();
        updateTaskList();
        break;
      }
    }
  }); // Обновляем список задач при загрузке страницы

  updateTaskList();
});