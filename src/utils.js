const DateFormatter = (function() {
    /* Formats date to look like Feb 2, 2022 */
    function format(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    }

    function getHTML5Date(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        if (month < 10) {
            month = `0${month}`;
        }

        if (day < 10) {
            day = `0${day}`;
        }

        if (year < 10) {
            year = `000${year}`;
        }
        else if (year < 100) {
            year = `00${year}`;
        }
        else if (year < 1000) {
            year = `0${year}`;
        }
        
        return `${year}-${month}-${day}`;
    }

    return {format, getHTML5Date};
})();

const storageUtils = (function () {

    const storage = {
        "projectsData": JSON.parse(localStorage.getItem("projectsData")) || {},
        // "Today": JSON.parse(localStorage.getItem("Today")) || []
    }


    function init() {
        const defaultInbox = {
            "name": "Inbox",
            "tasks": [

            ]
        }

        if (storage.projectsData 
            && Object.keys(storage.projectsData).length === 0 
            && Object.getPrototypeOf(storage.projectsData) === Object.prototype) {

            storage.projectsData["Inbox"] = defaultInbox;
            _updateLocalStorage("projectsData")
        }
    }

    function _updateLocalStorage(key) {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(storage[key]));
    }


    function addProject(name) {
        class Project {
            constructor(name) {
                this["name"] = name;
                this["tasks"] = [];
            }
        }

        const project = new Project(name);
        storage.projectsData[name] = project;

        _updateLocalStorage("projectsData");
    }

    function addTask(title, description, date, priority, project) {
        class Task {
            constructor(title, description, date, priority, project) {
                this["title"] = title;
                this["description"] = description;
                this["date"] = DateFormatter.format(new Date(date));
                this["priority"] = priority;
                this["project"] = project;
            }

            setDate(d) {
                const date =  DateFormatter.format(new Date(d));
                
                this["date"] = date;
            }
        }

        const task = new Task(title, description, date, priority, project);
        storage.projectsData[project]["tasks"].push(task);

        _updateLocalStorage("projectsData");
    }

    function removeTask(project, index) {
        storage["projectsData"][project].tasks.splice(index, 1);

        _updateLocalStorage("projectsData");
    }

    function removeProject(name) {
        delete storage["projectsData"].name;
        _updateLocalStorage("projectsData");
    }

    function getProject(name) {
        return storage["projectsData"][name];
    }

    function getProjectAll() {
        return storage["projectsData"];
    }

    function getTodayTasks() {
        const todayTasks = [];

        for (const project in getProjectAll()) {
            const tasks = getProjectAll()[project]["tasks"];

            tasks.forEach(task => {
                const today = DateFormatter.format(new Date());
                const taskDate = task.date;

                if (today === taskDate) {
                    todayTasks.push(task);
                }
            });
        }

        return todayTasks;
    }

    return {
        init, 
        addProject,
        removeProject, 
        addTask,
        removeTask, 
        getTodayTasks, 
        getProject, 
        getProjectAll,
    };
})();

export {DateFormatter, storageUtils};