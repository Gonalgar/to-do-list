class Project {
    constructor(title) {
        this.id = Date.now().toString();
        this._title = title;
        this.tasks = [];
    }

    set title(projectTitle) {
        this._title = projectTitle;
    }

    get title() {
        return this._title;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
}

class Task {
    constructor(title, description, dueDate, priority) {
        this.id = Date.now().toString();
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._done = false;
    }

    set title(taskTitle) {
        this._title = taskTitle;
    }

    get title() {
        return this._title;
    }

    set description(description) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set priority(priority) {
        this._priority = priority;
    }

    get priority() {
        return this._priority;
    }

    set done(done) {
        this._done = done;
    }

    get done() {
        return this._done;
    }
}

export { Project, Task };