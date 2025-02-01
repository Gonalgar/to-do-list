import "./style.css";
import { Project, Task } from "./tasks";
import { loadData, saveData } from "./storage";

function addProjectUI(project){
    const newProjectButton = document.querySelector('.menu-item.add-project');
    const menu = document.querySelector('.menu');
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    const icon = document.createElement('span');
    icon.textContent = '🛠️';
    const name = document.createElement('span');
    name.textContent = project._title;

    menuItem.appendChild(icon);
    menuItem.appendChild(name);
    menu.insertBefore(menuItem, newProjectButton);
}

function addTaskUI(task) {
    const taskGrid = document.querySelector('.task-grid');
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-task-id', task.id);
    if (task.done) {
        taskCard.classList.add('done');
    }
    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title;
    const doneButton = document.createElement('div');
    doneButton.classList.add('done-button');
    if (task.done) {
        doneButton.classList.add('done');
    }
    doneButton.addEventListener('click', () => {
        task.done = !task.done;
        taskCard.classList.toggle('done');
        doneButton.classList.toggle('done');
        saveData(projects);
    });
    const taskPriority = document.createElement('div');
    taskPriority.classList.add('task-priority');
    if (task.priority === 'Medium') {
        taskPriority.classList.add('medium');
    } else if (task.priority === 'Low') {
        taskPriority.classList.add('low');
    }
    taskPriority.textContent = task.priority;
    const taskDate = document.createElement('div');
    taskDate.classList.add('task-date');
    taskDate.textContent = task.dueDate;
    const taskDesc = document.createElement('div');
    taskDesc.classList.add('task-desc');
    taskDesc.textContent = task.description;

    taskHeader.appendChild(taskTitle);
    taskHeader.appendChild(doneButton);
    taskCard.appendChild(taskHeader);
    taskCard.appendChild(taskPriority);
    taskCard.appendChild(taskDate);
    taskCard.appendChild(taskDesc);
    taskGrid.appendChild(taskCard);
}

function populateProjectsUI(projects) {
    const newProjectButton = document.querySelector('.menu-item.add-project');
    const menu = document.querySelector('.menu');
    menu.innerHTML = '';

    projects.forEach(project => {
        addProjectUI(project);
    });

    menu.appendChild(newProjectButton);
}

function populateTasksUI(tasks) {
    const taskGrid = document.querySelector('.task-grid');
    taskGrid.innerHTML = '';

    tasks.forEach(task => {
        addTaskUI(task);
    });
}

function addTaskCardEventListeners() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const taskId = card.getAttribute('data-task-id');
            const task = activeProject.tasks.find(t => t.id === taskId);
            if (task) {
                editTaskForm.querySelector(".edit-task-name").value = task.title;
                editTaskForm.querySelector(".edit-description").value = task.description;
                editTaskForm.querySelector(".edit-date").value = task.dueDate;
                editTaskForm.querySelector(".edit-priority").value = task.priority;
                editTaskForm.setAttribute('data-task-id', task.id);
                editTaskDialog.showModal();
            }
        });
    });
}


const projects = loadData();

if (projects.length == 0) {
    const project = new Project("Home");
    const task = new Task("Task Example", "This is the description of the task", "2026-01-01", "High");
    project.addTask(task);
    projects.push(project);
    saveData(projects);
}

populateProjectsUI(projects);
populateTasksUI(projects[0].tasks);
addTaskCardEventListeners();

let activeProject = projects[0];

document.querySelectorAll('.menu-item').forEach(item => {
    if (item.querySelector('span:nth-child(2)').textContent === activeProject.title) {
        item.classList.add('active-project');
    }
});

const addProjectButton = document.querySelector(".menu-item.add-project");
const addProjectForm = document.querySelector("#add-project-form");
const addTaskForm = document.querySelector("#add-task-form");
const editTaskForm = document.querySelector("#edit-task-form");

const projectDialog = document.querySelector(".add-project-dialog");
const taskDialog = document.querySelector(".add-task-dialog");
const editTaskDialog = document.querySelector(".edit-task-dialog");

let previousActiveProject = activeProject;

addProjectButton.addEventListener("click", () => {
    previousActiveProject = activeProject;
    addProjectForm.reset();
    projectDialog.showModal();
});

const cancelProjectButton = document.querySelector(".cancel-project-btn");
cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
    activeProject = previousActiveProject;
    document.querySelector('.active-project').classList.remove('active-project');
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.querySelector('span:nth-child(2)').textContent === activeProject.title) {
            item.classList.add('active-project');
        }
    });
    populateTasksUI(activeProject.tasks);
    addTaskCardEventListeners();
});

addProjectForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const projectName = projectDialog.querySelector(".project-name").value;

    const projectExists = projects.some(project => project.title === projectName);
    if (projectExists) {
        alert("A project with this name already exists. Please choose a different name.");
        return;
    }

    const project = new Project(projectName);
    projects.push(project);
    addProjectUI(project);
    saveData(projects);
    projectDialog.close();
});

const addTaskButton = document.querySelector(".add-task");

addTaskButton.addEventListener("click", () => {
    addTaskForm.reset();
    taskDialog.showModal();
});

const cancelTaskButton = document.querySelector(".cancel-task-btn");
cancelTaskButton.addEventListener("click", () => {
    taskDialog.close();
});

addTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskName = taskDialog.querySelector(".task-name").value;
    const taskDescription = taskDialog.querySelector(".description").value;
    const taskDueDate = taskDialog.querySelector(".date").value;
    const taskPriority = taskDialog.querySelector(".priority").value;
    const task = new Task(taskName, taskDescription, taskDueDate, taskPriority);
    activeProject.addTask(task);
    populateTasksUI(activeProject.tasks);
    saveData(projects);
    taskDialog.close();
    addTaskCardEventListeners();
});

const cancelEditTaskButton = document.querySelector(".cancel-edit-task-btn");
cancelEditTaskButton.addEventListener("click", () => {
    editTaskDialog.close();
});

document.querySelectorAll('.menu-item').forEach(item => {
    if (!item.classList.contains('add-project')) {
        item.addEventListener('click', (e) => {
            const projectName = e.target.querySelector('span:nth-child(2)').textContent;
            const newActiveProject = projects.find(project => project.title === projectName);
            if (newActiveProject) {
                document.querySelector('.active-project').classList.remove('active-project');
                e.target.classList.add('active-project');
                activeProject = newActiveProject;
                populateTasksUI(activeProject.tasks);
                addTaskCardEventListeners();
            }
        });
    }
});

editTaskForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskId = editTaskForm.getAttribute('data-task-id');
    const task = activeProject.tasks.find(t => t.id === taskId);
    if (task) {
        task.title = editTaskForm.querySelector(".edit-task-name").value;
        task.description = editTaskForm.querySelector(".edit-description").value;
        task.dueDate = editTaskForm.querySelector(".edit-date").value;
        task.priority = editTaskForm.querySelector(".edit-priority").value;
        populateTasksUI(activeProject.tasks);
        saveData(projects);
        editTaskDialog.close();
        addTaskCardEventListeners();
    }
});
