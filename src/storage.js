import { Project, Task } from './tasks';

const STORAGE_KEY = 'DonezoData';

function saveData(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData.map(projectData => {
        const project = new Project(projectData._title);
        project.id = projectData.id;
        project.tasks = projectData.tasks.map(taskData => {
            const task = new Task(taskData._title, taskData._description, taskData._dueDate, taskData._priority);
            task.id = taskData.id;
            task.done = taskData._done;
            return task;
        });
        return project;
    });
}

export { saveData, loadData };