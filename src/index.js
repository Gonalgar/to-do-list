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


const addProjectButton = document.querySelector(".menu-item.add-project");

const ProjectDialog = document.querySelector(".add-project-dialog");
addProjectButton.addEventListener("click", () => {
    ProjectDialog.showModal();
});

const cancelProjectButton = document.querySelector(".cancel-project-btn");
cancelProjectButton.addEventListener("click", () => {
    ProjectDialog.close();
});


ProjectDialog.querySelector(".create-project-btn").addEventListener("click", () => {
    const projectName = ProjectDialog.querySelector(".project-name").value;
    const project = new Project(projectName);
    projects.push(project);
    addProjectUI(project);
    saveData(projects);
    ProjectDialog.close();
});


const addTaskButton = document.querySelector(".add-task");
const taskDialog = document.querySelector(".add-task-dialog");
addTaskButton.addEventListener("click", () => {
    taskDialog.showModal();
});
