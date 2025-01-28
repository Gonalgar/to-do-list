class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    set title(title) {
        this.title = title;
    }

    get title() {
        return this.title;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(t => t !== task);
    }
}

class Task {

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    set title(title) {
        this.title = title;
    }

    get title() {
        return this.title;
    }
  
    set description(description) {
        this.description = description;
    }

    get description() {
        return this.description;
    }

    set dueDate(dueDate) {
        this.dueDate = dueDate;
    }

    get dueDate() {
        return this.dueDate;
    }

    set priority(priority) {
        this.priority = priority;
    }

    get priority() {
        return this.priority;
    }
}

export { Project, Task };