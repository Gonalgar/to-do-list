import "./style.css"
import { Project, Task } from "./tasks"
import { addProjectUI, addTaskUI, populateProjectsUI, populateTasksUI } from "./ui"
import { loadData, saveData } from "./storage"

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

let activeProject = projects[0];

const addProjectButton = document.querySelector(".menu-item.add-project");
const addProjectForm = document.querySelector("#add-project-form");
const addTaskForm = document.querySelector("#add-task-form");

const projectDialog = document.querySelector(".add-project-dialog");
addProjectButton.addEventListener("click", () => {
    addProjectForm.reset();
    projectDialog.showModal();
});

const cancelProjectButton = document.querySelector(".cancel-project-btn");
cancelProjectButton.addEventListener("click", () => {
    projectDialog.close();
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
const taskDialog = document.querySelector(".add-task-dialog");

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
});
