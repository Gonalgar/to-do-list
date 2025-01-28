import "./style.css"
import { Project, Task } from "./tasks"
import { addProjectUI, addTaskUI } from "./ui"

const project = new Project("Default Project");
const task = new Task("Default Task", "Default Description", "2026-01-01", "High");

const addProjectButton = document.querySelector(".menu-item.add-project");
const addTaskButton = document.querySelector(".add-task");

addProjectButton.addEventListener("click", () => {
    const projectName = prompt("Enter the project name");
    const project = new Project(projectName);
    addProjectUI(project);
});

addTaskButton.addEventListener("click", () => {
    const taskName = prompt("Enter the task name");
    const taskDescription = prompt("Enter the task description");
    const taskDueDate = prompt("Enter the task due date");
    const taskPriority = prompt("Enter the task priority");
    const task = new Task(taskName, taskDescription, taskDueDate, taskPriority);
    addTaskUI(task);
});