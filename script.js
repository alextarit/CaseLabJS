document.addEventListener("DOMContentLoaded", function () {
    // Получаем ссылки на элементы DOM
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const todoList = document.getElementById("todo-list");
    const evenButton = document.getElementById("even");
    const oddButton = document.getElementById("odd");
    const deleteFirstButton = document.getElementById("deleteFirst");
    const deleteLastButton = document.getElementById("deleteLast");
    const completeButton = document.getElementById("complete");

    // Загружаем задачи из локального хранилища
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Функция для обновления списка задач
    function updateTaskList() {
        todoList.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskItem.appendChild(taskText);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = "&#10006;"; // Здесь используем символ "✖" вместо текста
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            });
            taskItem.appendChild(deleteButton);

            if (task.completed) {
                taskText.classList.add("completed");
            }

            todoList.appendChild(taskItem);
        });
    }

    // Функция для сохранения задач в локальное хранилище
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Функция для удаления задачи по индексу
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        updateTaskList();
    }

    // Обработчик кнопки "Добавить"
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            saveTasks();
            updateTaskList();
        }
    });

    // Обработчик кнопки "Выделить четные"
    evenButton.addEventListener("click", function () {
        const taskItems = document.querySelectorAll(".task-item");
        taskItems.forEach((taskItem, index) => {
            if (index % 2 !== 0) {
                taskItem.classList.toggle("even");
            }
        });
    });

    // Обработчик кнопки "Выделить нечетные"
    oddButton.addEventListener("click", function () {
        const taskItems = document.querySelectorAll(".task-item");
        taskItems.forEach((taskItem, index) => {
            if (index % 2 === 0) {
                taskItem.classList.toggle("odd");
            }
        });
    });

    // Обработчик кнопки "Удалить первый элемент"
    deleteFirstButton.addEventListener("click", function () {
        if (tasks.length > 0) {
            tasks.shift();
            saveTasks();
            updateTaskList();
        }
    });

    // Обработчик кнопки "Удалить последний элемент"
    deleteLastButton.addEventListener("click", function () {
        if (tasks.length > 0) {
            tasks.pop();
            saveTasks();
            updateTaskList();
        }
    });

    // Обработчик кнопки "Complete"
    completeButton.addEventListener("click", function () {
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].completed) {
                tasks[i].completed = true;
                saveTasks();
                updateTaskList();
                break;
            }
        }
    });

    // Обновляем список задач при загрузке страницы
    updateTaskList();
});
