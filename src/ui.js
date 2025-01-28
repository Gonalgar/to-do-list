import { Project, Task } from './tasks';

function addProjectUI(project){
    const newProjectButton = document.querySelector('.menu-item.add-project');
    const menu = document.querySelector('.menu');
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu-item');
    const icon = document.createElement('span');
    icon.textContent = '🛠️';
    const name = document.createElement('span');
    name.textContent = project.title;

    menuItem.appendChild(icon);
    menuItem.appendChild(name);
    menu.insertBefore(menuItem, newProjectButton);
}

export { addProjectUI };