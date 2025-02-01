import { Project, Task } from './tasks';

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

function addTaskUI(task){
    const taskGrid = document.querySelector('.task-grid');
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute('data-task-id', task.id);
    const taskHeader = document.createElement('div');
    taskHeader.classList.add('task-header');
    const taskTitle = document.createElement('div');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title;
    const doneButton = document.createElement('div');
    doneButton.classList.add('done-button');
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

function populateProjectsUI(projects){
    const newProjectButton = document.querySelector('.menu-item.add-project');
    const menu = document.querySelector('.menu');
    menu.innerHTML = '';

    projects.forEach(project => {
        addProjectUI(project);
    });

    menu.appendChild(newProjectButton);
}

function populateTasksUI(tasks){
    const taskGrid = document.querySelector('.task-grid');
    taskGrid.innerHTML = '';

    tasks.forEach(task => {
        addTaskUI(task);
    });
}


export { addProjectUI, addTaskUI, populateProjectsUI, populateTasksUI };