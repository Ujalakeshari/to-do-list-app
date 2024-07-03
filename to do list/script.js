document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Task cannot be empty!");
            return;
        }

        const task = {
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        tasks.push(task);
        saveTasks();

        taskInput.value = "";
    });

    function addTaskToDOM(task) {
        const li = document.createElement("li");
        if (task.completed) {
            li.classList.add("completed");
        }

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        taskText.classList.add("task-text");
        li.appendChild(taskText);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = !task.completed;
            li.classList.toggle("completed");
            saveTasks();
        });
        li.appendChild(checkbox);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.addEventListener("click", () => {
            const newTaskText = prompt("Edit task:", task.text);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                task.text = newTaskText.trim();
                taskText.textContent = task.text;
                saveTasks();
            }
        });
        li.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            taskList.removeChild(li);
            const index = tasks.indexOf(task);
            tasks.splice(index, 1);
            saveTasks();
        });
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
