const STORAGE_KEY = 'DonezoData';

function saveData(projects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export { saveData, loadData };