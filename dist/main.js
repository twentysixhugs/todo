/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ui-loader.js":
/*!**************************!*\
  !*** ./src/ui-loader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
/* When I was building it, I only started to learn to write more or less clean CSS and HTML Code */
/* To that end, there are many long, chained and completely unreadable selectors */
/* that I'm aware of. However, instead of rewriting, I chose to go forward and */
/* make sure I don't repeat such mistakes in the future. */




const UILoader = (function() {

    /* Utility functions */
    const _createContainer = function(direction) {
        const container = document.createElement('div');
        container.classList.add(`${direction}-container`);

        return container;
    }

    const _removeAllChildNodes = function(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    /* On pageload */

    function load() {
        Sidebar.update();
        Sidebar.addEventToToday();
        Sidebar.addEventToInbox();
        Sidebar.addNewProjectEvent();
        ProjectWindow.initWindow("Today", _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getTodayTasks());
        _createNewTaskForm();
        Header.init();
    }

    /* Forms */


    window.onload = () => {};


    function _createNewTaskForm() {
        const background = document.querySelector(".task-input-background");

        const form = document.createElement("div");
        form.classList.add("form-task-input", "row-container");
        background.appendChild(form);

        const fieldSet = document.createElement("fieldset");
        fieldSet.classList.add("task-input-data-fieldset", "col-container");
        form.appendChild(fieldSet);

        const priorityCloseProject = _createContainer("col");
        priorityCloseProject.classList.add("priority-close-project");
        form.appendChild(priorityCloseProject);

        const close = document.createElement("span");
        close.classList.add("close-task-input-form");
        close.textContent = "×";

        close.addEventListener("click", () => {
            _toggleNewTaskForm();
            emptyTitleWarning.classList.remove("show");
            /* form.reset(); */
        });
        
        priorityCloseProject.appendChild(close);

        const priorityProject = _createContainer("row");
        priorityProject.classList.add("priority-and-project");
        priorityCloseProject.appendChild(priorityProject);

        const priority = _createFormDropdown("priority");
        priorityProject.appendChild(priority);

        const project = _createFormDropdown("project");
        priorityProject.appendChild(project);

        const title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("placeholder", "Task name");
        title.classList.add("task-input-title");

        const emptyTitleWarning = document.createElement("span");
        emptyTitleWarning.classList.add("empty-title-warning");
        emptyTitleWarning.textContent = "Please, fill out task name"

        title.addEventListener("click", () => {
            emptyTitleWarning.classList.remove("show");
        });
        fieldSet.appendChild(title);
        fieldSet.appendChild(emptyTitleWarning);

        const description = document.createElement("input");
        description.classList.add("task-input-description");
        description.setAttribute("type", "text");
        description.setAttribute("placeholder", "Description");
        fieldSet.appendChild(description);

        const date = document.createElement("input");
        date.setAttribute("type", "date");
        date.classList.add("date-task-input");
        fieldSet.appendChild(date);

        const formActions = _createContainer("row");
        formActions.classList.add("task-input-form-actions");
        fieldSet.appendChild(formActions);

        const confirmBtn = document.createElement("button");
        confirmBtn.classList.add("task-input-confirm");
        confirmBtn.setAttribute("type", "button");
        confirmBtn.textContent = "Add task";

        confirmBtn.addEventListener("click", () => {
            if (!title.value) {
                emptyTitleWarning.classList.add("show");
                return;
            }
            _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.addTask(
                title.value,
                description.value,
                date.value,
                priority.lastChild.value,
                project.lastChild.value
                );

            if (project.lastChild.value === ProjectWindow.getCurrentProject()) {
                ProjectWindow.updateCurrentProject();
            }

            if (_utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.format(new Date(date.value)) === _utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.format(new Date())
            && ProjectWindow.getCurrentProject() === "Today") { // if task is set to today and today is opened
                ProjectWindow.initWindow("Today", _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getTodayTasks());
            }

            Sidebar.update();

            /* form.reset() */;
            _toggleNewTaskForm();
        });

        formActions.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("task-input-cancel");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.textContent = "Cancel";

        cancelBtn.addEventListener("click", () => {
            emptyTitleWarning.classList.remove("show");
            _toggleNewTaskForm();
        });

        formActions.appendChild(cancelBtn);
    }

    function _predefineFormProject(projectName) {
        const projectInput = document.querySelector("#project-dropdown-input");
        projectInput.value = projectName;
    }

    function _predefineFormDate(HTML5DateInputValue) {
        const taskDateInput = document.querySelector(".date-task-input");

        taskDateInput.value = HTML5DateInputValue;
    }

    function _updateFormData() {
        document.querySelector(".task-input-background").textContent = "";
        _createNewTaskForm();
        _predefineFormProject("Inbox");
    };

    function _createNewProjectForm() {
        const projects = document.querySelector("#projects ul");

        const li = document.createElement("li");
        li.classList.add("col-container", "new-project");
        projects.appendChild(li);

        const form = document.createElement("div");
        form.classList.add("new-project-input", "col-container");
        li.appendChild(form);

        const nameInput = document.createElement("input");
        nameInput.setAttribute("type", "text");
        nameInput.classList.add("new-project-input-name");
        

        const emptyNameWarning = document.createElement("span");
        emptyNameWarning.classList.add("empty-title-warning");
        emptyNameWarning.textContent = "Please, fill out project name";

        const notUniqueNameWarning = document.createElement("span");
        notUniqueNameWarning.classList.add("empty-title-warning");
        notUniqueNameWarning.textContent = "Please, enter a unique project name";

        nameInput.addEventListener("click", () => {
            emptyNameWarning.classList.remove("show");
            notUniqueNameWarning.classList.remove("show");
        });

        form.appendChild(nameInput);
        form.appendChild(emptyNameWarning);
        form.appendChild(notUniqueNameWarning);

        const buttonsContainer = _createContainer("row");
        buttonsContainer.classList.add("new-project-actions");
        form.appendChild(buttonsContainer);

        const confirmBtn = document.createElement("button");
        confirmBtn.classList.add("project-input-confirm");
        confirmBtn.setAttribute("type", "button");
        confirmBtn.textContent = "Add project";

        confirmBtn.addEventListener("click", () => {
            if (!nameInput.value) {
                emptyNameWarning.classList.add("show");
                return;
            }

            const projects = _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProjectAll();

            for (const project in projects) {
                if (projects[project].name === nameInput.value) {
                    notUniqueNameWarning.classList.add("show");
                    return;
                }
            }

            if (nameInput.value === "Today") {
                notUniqueNameWarning.classList.add("show");
                return;
            }

            _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.addProject(nameInput.value);
            _toggleNewProjectForm();
            /* form.reset(); */
            Sidebar.update();
        });

        buttonsContainer.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("project-input-cancel");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.textContent = "Cancel";

        cancelBtn.addEventListener("click", () => {
            _toggleNewProjectForm();
            emptyNameWarning.classList.remove("show");
        });
        buttonsContainer.appendChild(cancelBtn);
    }

    function _toggleNewTaskForm() {
        const formBackground = document.querySelector(".task-input-background");
        formBackground.classList.toggle("show");
    }

    function _toggleNewProjectForm() {
        const formContainer = document.querySelector(".new-project");
        formContainer.classList.toggle("show");
    }

    /* General */

    function _createFormDropdown(input) {
        const container = _createContainer("row");
        container.classList.add(`${input}-input-container`);

        const label = document.createElement("label");
        label.setAttribute("for", `${input}-dropdown-input`);
        label.textContent = `${input.slice(0, 1).toUpperCase() + input.slice(1)}:`; //capitalize first letter
        container.appendChild(label);

        const dropdown = document.createElement("select");
        dropdown.id = `${input}-dropdown-input`;
        dropdown.setAttribute("name", `${input}`);
        dropdown.classList.add(`${input}-dropdown-input`);
        container.appendChild(dropdown);

        if (input === "project") {
            const projectsData = _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProjectAll();

            for (const project in projectsData) {
                const projOption = document.createElement("option");
                projOption.classList.add("dropdown-option");
                projOption.value = projectsData[project]["name"];
                projOption.textContent = projectsData[project]["name"];

                dropdown.appendChild(projOption);
            }
        }

        if (input === "priority") {
            for (let i = 0; i <= 3; i++) {
                const priorOption = document.createElement("option");
                priorOption.classList.add("priority-option");
                priorOption.value = i;

                switch(i) {
                    case 0:
                        priorOption.textContent = "Low";
                        break;
                    case 1:
                        priorOption.textContent = "Medium";
                        break;
                    case 2: 
                        priorOption.textContent = "High";
                        break;
                    case 3: 
                        priorOption.textContent = "Urgent";
                        break;
                }
                

                dropdown.appendChild(priorOption);
            }
        }


        return container;
    }

    const Sidebar = (function() {
        function _createProject(name, tasksCount) {
            const li = document.createElement("li");
            li.classList.add("project", "row-container");
            li.dataset.project = name;
            li.addEventListener("mouseover", () => {
                tasks.classList.remove("show");
                deleteBtn.classList.add("show");
            });
            li.addEventListener("mouseout", () => {
                deleteBtn.classList.remove("show");
                tasks.classList.add("show");
            });
            li.addEventListener('click', () => {
                ProjectWindow.initWindow(name, _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProject(name).tasks);
            });

            const container = _createContainer("row");
            li.appendChild(container);

            const tasks = document.createElement("span");
            tasks.classList.add("project-tasks-count", "show");
            tasks.textContent = tasksCount;
            li.appendChild(tasks);

            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("delete-project-btn");
            deleteBtn.textContent = "×";
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation();

                _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.removeProject(name);
                Sidebar.update();

                if (ProjectWindow.getCurrentProject() === name) { // if currently opened project is the one deleted
                    ProjectWindow.setCurrentProject("Inbox");
                    ProjectWindow.updateCurrentProject();
                } else if (ProjectWindow.getCurrentProject() === "Today") {
                    ProjectWindow.initWindow("Today", _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getTodayTasks());
                }
            });
            li.appendChild(deleteBtn);

            const colorIcon = document.createElement("img");
            colorIcon.classList.add("circle");
            colorIcon.alt = "";
            colorIcon.src= "./assets/circle.png";
            container.appendChild(colorIcon);

            const projectName = document.createElement("span");
            projectName.classList.add("menu-project-name");
            projectName.textContent = name;
            container.appendChild(projectName);



            return li;
        }

        function addProject(name, tasksCount) {
            const project = _createProject(name, tasksCount);

            const projectsList = document.querySelector("#projects ul");
            projectsList.appendChild(project);
        }

        function toggleShow() {
            const sidebar = document.querySelector("#sidebar");
            sidebar.classList.toggle("hidden");
        }

        function addEventsToProjects (projectsData) {

            /* use event delegation for all user-created sidebar projects */
            const projectsList = document.querySelector("#projects ul");
            projectsList.addEventListener("click", (e) => {
                const project = e.target.closest(".project");
				if (!project) return;

                const projectName = project.dataset.project;
					
                if (projectsData[projectName]) {
                    ProjectWindow.initWindow(projectName, projectsData[projectName].tasks);
                }
            }, {capture: true});

        }

        function addEventToToday() {
            const todayButton = document.querySelector('.project[data-project="Today"]');

            todayButton.addEventListener('click', () => {
                ProjectWindow.initWindow("Today", _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getTodayTasks());
            });
        }

        function addEventToInbox() {
            const inbox = document.querySelector('#main-projects .project[data-project="Inbox"]');
            inbox.addEventListener("click", () => {
                ProjectWindow.initWindow("Inbox", _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProject("Inbox").tasks);
            });
        }

        function addNewProjectEvent() {
            const newProjectBtn = document.querySelector("#new-project");

            newProjectBtn.addEventListener("click", () => {
                _toggleNewProjectForm();
            });
        }

        function update() {
            const projectsList = document.querySelector("#projects ul");

            _removeAllChildNodes(projectsList);

            const projectsData = _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProjectAll();

            for (const project in projectsData) {
                if (projectsData[project].name !== "Inbox") {
                    const tasksCount = projectsData[project].tasks.length;

                    addProject(projectsData[project].name, tasksCount);
                }
            }

            _createNewProjectForm();

            const shownInboxTasksCount = document.querySelector(".project[data-project=\"Inbox\"] .project-tasks-count");
            const shownTodayTasksCount = document.querySelector(".project[data-project=\"Today\"] .project-tasks-count");

            shownInboxTasksCount.textContent = projectsData["Inbox"].tasks.length;
            shownTodayTasksCount.textContent = _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getTodayTasks().length;

            // addEventsToProjects(projectsData);


        }

        (function _enableProjectsDropdown() {
            const dropdown = document.querySelector("#projects-menu .open-dropdown");

            dropdown.addEventListener('click', () => {
                const projects = document.querySelector("#projects");

                projects.classList.toggle("hidden");

                const dropdownImg = document.querySelector("#projects-menu .open-dropdown img");
                dropdownImg.classList.toggle("closed");
            });
        })();

        return {
            addProject, 
            toggleShow, 
            addEventsToProjects, 
            addEventToToday,
            addEventToInbox,
            addNewProjectEvent, 
            update,
        };
    })();

    const Header = (function() {
        //build toggle sidebar button, wire it to the private method of Sidebar
        const toggleSidebarBtn = document.querySelector("#toggle-sidebar");
        toggleSidebarBtn.addEventListener('click', () => {Sidebar.toggleShow()});

        function _initNewTaskBtn() {
            const btn = document.querySelector(".new-task-btn");

            btn.addEventListener('click', () => {
                console.log("hug");

                _updateFormData();

                _toggleNewTaskForm();
            });
        }
        
        function init() {
            _initNewTaskBtn();
        }

        return {init};
    })();

    const ProjectWindow = (function() {
        function _displayWindow(projectName) {
            const projectContent = document.querySelector("#project-content");
            _removeAllChildNodes(projectContent);
            // projectContent.textContent = "";

            const projectHeader = document.createElement("header");
            projectHeader.id = "project-header";
            projectHeader.classList.add("row-container");
           
            const projectNameHeading = document.createElement("h1");
            projectNameHeading.id = "project-name-heading";
            projectNameHeading.textContent = projectName;

            projectHeader.appendChild(projectNameHeading);

            if (projectName === "Today") {
                const today = _utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.format(new Date());

                const span = document.createElement("span");
                span.id = "project-current-date";
                span.textContent = today;
                projectHeader.appendChild(span)
            }

            const tasksContainer = _createContainer("col");
            tasksContainer.id = "project-tasks";

            projectContent.appendChild(projectHeader);
            projectContent.appendChild(tasksContainer);
        }
        

        function _createTask(taskInfo, index) {
            
            const _task = _createContainer("row");
            _task.classList.add("task");
            _task.dataset.project = taskInfo.project;
            _task.dataset.index = index;


            const _removeTask = function() {
                const tasksContainer = document.querySelector("#project-tasks");

                tasksContainer.removeChild(_task);

                _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.removeTask(taskInfo.project, index);

                Sidebar.update();
                ProjectWindow.updateCurrentProject();
            };

            const _taskMain = _createContainer("row");
            _taskMain.classList.add("task-main");


            const _completeTaskBtn = document.createElement("button");
            _completeTaskBtn.classList.add("complete-task-btn", `task-priority-${taskInfo.priority}`);

            _completeTaskBtn.addEventListener("click", _removeTask);

            const _taskContent = _createContainer("col");
            _taskContent.classList.add("task-content");

            const _taskName = document.createElement("h2");
            _taskName.classList.add("task-name");
            _taskName.textContent = taskInfo.title;

            const _taskDescription = document.createElement("p");
            _taskDescription.classList.add("task-description");
            _taskDescription.textContent = taskInfo.description;

            const _taskDate = _createContainer("row");
            _taskDate.classList.add("task-date");

            const _calendarImg = document.createElement("img");
            _calendarImg.src = "./assets/calendar.png";
            _calendarImg.alt = "";

            const _dateText = document.createElement("span");


            if (taskInfo.date) {
                const currentDate = _utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.format(new Date());
                const taskDate = _utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.format(new Date(taskInfo.date));

                if (taskDate === currentDate) {
                    _dateText.classList.add("today-text");
                    _dateText.textContent = "Today";
                    
                    _taskDate.appendChild(_calendarImg);
                } else {
                    _dateText.classList.add("date-text");
                    _dateText.textContent = taskInfo.date;
                }
            }

            const _closeAndProject = _createContainer("col");
            _closeAndProject.classList.add("task-close-and-project");
            
            const deleteBtn = document.createElement("span");
            deleteBtn.classList.add("delete-task");
            deleteBtn.textContent = "×";

            deleteBtn.addEventListener("click", _removeTask);

            const projectSection = document.createElement("div"); //used for today, empty in other projects
            projectSection.classList.add("task-project");

            _task.appendChild(_taskMain);
            _taskMain.appendChild(_completeTaskBtn);
            _taskMain.appendChild(_taskContent);
            _taskContent.appendChild(_taskName);
            if (_taskDescription.textContent) _taskContent.appendChild(_taskDescription);
            _taskContent.appendChild(_taskDate);
            _taskDate.appendChild(_dateText);
            _task.appendChild(_closeAndProject);
            _closeAndProject.appendChild(deleteBtn);
            _closeAndProject.appendChild(projectSection);

            return _task;
        }


        function _displayTasks(tasksData, todayIsOpened) {
            tasksData.forEach((taskInfo, i) => {
                const taskNode = _createTask(taskInfo, i);
                _showTask(taskNode);
                
                if (todayIsOpened) {
                    _showTaskProject(i, taskInfo.project);

                    // disable task deletion
                    const deleteButtons = Array.from(document.querySelectorAll(".delete-task"));
                    deleteButtons.forEach(button => {button.style.display = "none"});
                }
            });
        }

        function _showTaskProject(taskIndex, taskProject) { // shows what project the task is associated with (e.g. in today)
            const container = document.querySelector(`.task[data-index="${taskIndex}"] .task-project`);
            container.textContent = taskProject;
        }

        function _showTask(taskNode) {
            // const tasksContainer = document.querySelector("#project-tasks");
            // tasksContainer.appendChild(taskNode);
            const newTaskBtn = document.querySelector(".project-new-task-btn");
            newTaskBtn.insertAdjacentElement("beforebegin", taskNode);
        }

        function _addNewTaskBtn(projectName) {
            const tasks = document.querySelector("#project-tasks");

            const btn = document.createElement("button");
            btn.classList.add("project-new-task-btn", "row-container");
            btn.addEventListener("click", () => {
                if (_currentProject === "Today") {
                    _updateFormData();
                    _predefineFormProject("Inbox");
                    _predefineFormDate(_utils_js__WEBPACK_IMPORTED_MODULE_0__.DateFormatter.getHTML5Date(new Date()));
                } else {
                    _updateFormData();
                    _predefineFormProject(projectName);
                }

                _toggleNewTaskForm();
            });
            tasks.appendChild(btn);

            const img = document.createElement("img");
            img.src = "./assets/plus-blue.png";
            img.classList.add("project-new-task-plus-img");
            btn.appendChild(img);

            const btnText = document.createElement("span");
            btnText.classList.add("project-new-task-text");
            btnText.textContent = "Add task";
            btn.appendChild(btnText);
        }

        function _displayAll(projectName, tasksData) {
            _displayWindow(projectName);   
            _addNewTaskBtn(projectName);
            _displayTasks(tasksData, projectName === "Today");
        }

        let _currentProject;
        let _currentTasksData;

        function getCurrentProject() {
            return _currentProject;
        }

        function setCurrentProject(newProjectName) {
            _currentProject = newProjectName;
        }

        function updateCurrentProject() {
            _currentTasksData = _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.getProject(_currentProject).tasks;
            
            _displayAll(_currentProject, _currentTasksData);
        }

        function initWindow(projectName, tasksData) {
            _currentProject = projectName;
            _displayAll(projectName, tasksData);
        }

        return {
            initWindow, 
            getCurrentProject, 
            setCurrentProject,
            updateCurrentProject,
        };
    })();

    return {Sidebar, Header, ProjectWindow, load};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UILoader);

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DateFormatter": () => (/* binding */ DateFormatter),
/* harmony export */   "storageUtils": () => (/* binding */ storageUtils)
/* harmony export */ });
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
                if (date) this["date"] = DateFormatter.format(new Date(date));
                this["priority"] = priority;
                this["project"] = project;
                this["index"] = storage["projectsData"][project]["tasks"].indexOf(this);
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
        delete storage["projectsData"][name];
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui-loader */ "./src/ui-loader.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");



_utils__WEBPACK_IMPORTED_MODULE_1__.storageUtils.init();
//INIT!!!
_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].load();
// UILoader.Sidebar.update();
// // UILoader.Sidebar.addEventsToProjects(projectsData);
// UILoader.Sidebar.addEventToToday();
// UILoader.Sidebar.addEventToInbox();
// UILoader.Sidebar.addNewProjectEvent();

// UILoader.ProjectWindow.initWindow("Today", storageUtils.getTodayTasks());
// UILoader.Header.init();
//
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O1VDMUpEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ0U7O0FBRXBDLHFEQUFpQjtBQUNqQjtBQUNBLHVEQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvdWktbG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogV2hlbiBJIHdhcyBidWlsZGluZyBpdCwgSSBvbmx5IHN0YXJ0ZWQgdG8gbGVhcm4gdG8gd3JpdGUgbW9yZSBvciBsZXNzIGNsZWFuIENTUyBhbmQgSFRNTCBDb2RlICovXG4vKiBUbyB0aGF0IGVuZCwgdGhlcmUgYXJlIG1hbnkgbG9uZywgY2hhaW5lZCBhbmQgY29tcGxldGVseSB1bnJlYWRhYmxlIHNlbGVjdG9ycyAqL1xuLyogdGhhdCBJJ20gYXdhcmUgb2YuIEhvd2V2ZXIsIGluc3RlYWQgb2YgcmV3cml0aW5nLCBJIGNob3NlIHRvIGdvIGZvcndhcmQgYW5kICovXG4vKiBtYWtlIHN1cmUgSSBkb24ndCByZXBlYXQgc3VjaCBtaXN0YWtlcyBpbiB0aGUgZnV0dXJlLiAqL1xuXG5pbXBvcnQge0RhdGVGb3JtYXR0ZXJ9IGZyb20gXCIuL3V0aWxzLmpzXCJcbmltcG9ydCB7c3RvcmFnZVV0aWxzfSBmcm9tIFwiLi91dGlscy5qc1wiXG5cbmNvbnN0IFVJTG9hZGVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyogVXRpbGl0eSBmdW5jdGlvbnMgKi9cbiAgICBjb25zdCBfY3JlYXRlQ29udGFpbmVyID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtkaXJlY3Rpb259LWNvbnRhaW5lcmApO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgY29uc3QgX3JlbW92ZUFsbENoaWxkTm9kZXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogT24gcGFnZWxvYWQgKi9cblxuICAgIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG4gICAgICAgIFNpZGViYXIuYWRkRXZlbnRUb1RvZGF5KCk7XG4gICAgICAgIFNpZGViYXIuYWRkRXZlbnRUb0luYm94KCk7XG4gICAgICAgIFNpZGViYXIuYWRkTmV3UHJvamVjdEV2ZW50KCk7XG4gICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuICAgICAgICBfY3JlYXRlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgSGVhZGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKiBGb3JtcyAqL1xuXG5cbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge307XG5cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVOZXdUYXNrRm9ybSgpIHtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pbnB1dC1iYWNrZ3JvdW5kXCIpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJmb3JtLXRhc2staW5wdXRcIiwgXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICBiYWNrZ3JvdW5kLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGZpZWxkU2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuICAgICAgICBmaWVsZFNldC5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC1kYXRhLWZpZWxkc2V0XCIsIFwiY29sLWNvbnRhaW5lclwiKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChmaWVsZFNldCk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlDbG9zZVByb2plY3QgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICBwcmlvcml0eUNsb3NlUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktY2xvc2UtcHJvamVjdFwiKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChwcmlvcml0eUNsb3NlUHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2xvc2UuY2xhc3NMaXN0LmFkZChcImNsb3NlLXRhc2staW5wdXQtZm9ybVwiKTtcbiAgICAgICAgY2xvc2UudGV4dENvbnRlbnQgPSBcIsOXXCI7XG5cbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICAvKiBmb3JtLnJlc2V0KCk7ICovXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcHJpb3JpdHlDbG9zZVByb2plY3QuYXBwZW5kQ2hpbGQoY2xvc2UpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5UHJvamVjdCA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgIHByaW9yaXR5UHJvamVjdC5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktYW5kLXByb2plY3RcIik7XG4gICAgICAgIHByaW9yaXR5Q2xvc2VQcm9qZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5UHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBfY3JlYXRlRm9ybURyb3Bkb3duKFwicHJpb3JpdHlcIik7XG4gICAgICAgIHByaW9yaXR5UHJvamVjdC5hcHBlbmRDaGlsZChwcmlvcml0eSk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IF9jcmVhdGVGb3JtRHJvcGRvd24oXCJwcm9qZWN0XCIpO1xuICAgICAgICBwcmlvcml0eVByb2plY3QuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIlRhc2sgbmFtZVwiKTtcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtdGl0bGVcIik7XG5cbiAgICAgICAgY29uc3QgZW1wdHlUaXRsZVdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcImVtcHR5LXRpdGxlLXdhcm5pbmdcIik7XG4gICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLnRleHRDb250ZW50ID0gXCJQbGVhc2UsIGZpbGwgb3V0IHRhc2sgbmFtZVwiXG5cbiAgICAgICAgdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgZmllbGRTZXQuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZChlbXB0eVRpdGxlV2FybmluZyk7XG5cbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LWRlc2NyaXB0aW9uXCIpO1xuICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJEZXNjcmlwdGlvblwiKTtcbiAgICAgICAgZmllbGRTZXQuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGRhdGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImRhdGVcIik7XG4gICAgICAgIGRhdGUuY2xhc3NMaXN0LmFkZChcImRhdGUtdGFzay1pbnB1dFwiKTtcbiAgICAgICAgZmllbGRTZXQuYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cbiAgICAgICAgY29uc3QgZm9ybUFjdGlvbnMgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICBmb3JtQWN0aW9ucy5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC1mb3JtLWFjdGlvbnNcIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGZvcm1BY3Rpb25zKTtcblxuICAgICAgICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC1jb25maXJtXCIpO1xuICAgICAgICBjb25maXJtQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgIGNvbmZpcm1CdG4udGV4dENvbnRlbnQgPSBcIkFkZCB0YXNrXCI7XG5cbiAgICAgICAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aXRsZS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFxuICAgICAgICAgICAgICAgIHRpdGxlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgcHJpb3JpdHkubGFzdENoaWxkLnZhbHVlLFxuICAgICAgICAgICAgICAgIHByb2plY3QubGFzdENoaWxkLnZhbHVlXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHByb2plY3QubGFzdENoaWxkLnZhbHVlID09PSBQcm9qZWN0V2luZG93LmdldEN1cnJlbnRQcm9qZWN0KCkpIHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LnVwZGF0ZUN1cnJlbnRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZShkYXRlLnZhbHVlKSkgPT09IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKCkpXG4gICAgICAgICAgICAmJiBQcm9qZWN0V2luZG93LmdldEN1cnJlbnRQcm9qZWN0KCkgPT09IFwiVG9kYXlcIikgeyAvLyBpZiB0YXNrIGlzIHNldCB0byB0b2RheSBhbmQgdG9kYXkgaXMgb3BlbmVkXG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KFwiVG9kYXlcIiwgc3RvcmFnZVV0aWxzLmdldFRvZGF5VGFza3MoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIC8qIGZvcm0ucmVzZXQoKSAqLztcbiAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtQWN0aW9ucy5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtY2FuY2VsXCIpO1xuICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcblxuICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICAgICAgX3RvZ2dsZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm1BY3Rpb25zLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3ByZWRlZmluZUZvcm1Qcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1kcm9wZG93bi1pbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdElucHV0LnZhbHVlID0gcHJvamVjdE5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3ByZWRlZmluZUZvcm1EYXRlKEhUTUw1RGF0ZUlucHV0VmFsdWUpIHtcbiAgICAgICAgY29uc3QgdGFza0RhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGF0ZS10YXNrLWlucHV0XCIpO1xuXG4gICAgICAgIHRhc2tEYXRlSW5wdXQudmFsdWUgPSBIVE1MNURhdGVJbnB1dFZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF91cGRhdGVGb3JtRGF0YSgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWlucHV0LWJhY2tncm91bmRcIikudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICBfY3JlYXRlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgX3ByZWRlZmluZUZvcm1Qcm9qZWN0KFwiSW5ib3hcIik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVOZXdQcm9qZWN0Rm9ybSgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzIHVsXCIpO1xuXG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiY29sLWNvbnRhaW5lclwiLCBcIm5ldy1wcm9qZWN0XCIpO1xuICAgICAgICBwcm9qZWN0cy5hcHBlbmRDaGlsZChsaSk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcIm5ldy1wcm9qZWN0LWlucHV0XCIsIFwiY29sLWNvbnRhaW5lclwiKTtcbiAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgICAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIG5hbWVJbnB1dC5jbGFzc0xpc3QuYWRkKFwibmV3LXByb2plY3QtaW5wdXQtbmFtZVwiKTtcbiAgICAgICAgXG5cbiAgICAgICAgY29uc3QgZW1wdHlOYW1lV2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBlbXB0eU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS10aXRsZS13YXJuaW5nXCIpO1xuICAgICAgICBlbXB0eU5hbWVXYXJuaW5nLnRleHRDb250ZW50ID0gXCJQbGVhc2UsIGZpbGwgb3V0IHByb2plY3QgbmFtZVwiO1xuXG4gICAgICAgIGNvbnN0IG5vdFVuaXF1ZU5hbWVXYXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIG5vdFVuaXF1ZU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS10aXRsZS13YXJuaW5nXCIpO1xuICAgICAgICBub3RVbmlxdWVOYW1lV2FybmluZy50ZXh0Q29udGVudCA9IFwiUGxlYXNlLCBlbnRlciBhIHVuaXF1ZSBwcm9qZWN0IG5hbWVcIjtcblxuICAgICAgICBuYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGVtcHR5TmFtZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICBub3RVbmlxdWVOYW1lV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChuYW1lSW5wdXQpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGVtcHR5TmFtZVdhcm5pbmcpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKG5vdFVuaXF1ZU5hbWVXYXJuaW5nKTtcblxuICAgICAgICBjb25zdCBidXR0b25zQ29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibmV3LXByb2plY3QtYWN0aW9uc1wiKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b25zQ29udGFpbmVyKTtcblxuICAgICAgICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY29uZmlybUJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pbnB1dC1jb25maXJtXCIpO1xuICAgICAgICBjb25maXJtQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgIGNvbmZpcm1CdG4udGV4dENvbnRlbnQgPSBcIkFkZCBwcm9qZWN0XCI7XG5cbiAgICAgICAgY29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFuYW1lSW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbXB0eU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHMgPSBzdG9yYWdlVXRpbHMuZ2V0UHJvamVjdEFsbCgpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb2plY3QgaW4gcHJvamVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNbcHJvamVjdF0ubmFtZSA9PT0gbmFtZUlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vdFVuaXF1ZU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmFtZUlucHV0LnZhbHVlID09PSBcIlRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICBub3RVbmlxdWVOYW1lV2FybmluZy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHN0b3JhZ2VVdGlscy5hZGRQcm9qZWN0KG5hbWVJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICBfdG9nZ2xlTmV3UHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIC8qIGZvcm0ucmVzZXQoKTsgKi9cbiAgICAgICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWlucHV0LWNhbmNlbFwiKTtcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG5cbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBfdG9nZ2xlTmV3UHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIGVtcHR5TmFtZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3RvZ2dsZU5ld1Rhc2tGb3JtKCkge1xuICAgICAgICBjb25zdCBmb3JtQmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pbnB1dC1iYWNrZ3JvdW5kXCIpO1xuICAgICAgICBmb3JtQmFja2dyb3VuZC5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdG9nZ2xlTmV3UHJvamVjdEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy1wcm9qZWN0XCIpO1xuICAgICAgICBmb3JtQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xuICAgIH1cblxuICAgIC8qIEdlbmVyYWwgKi9cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVGb3JtRHJvcGRvd24oaW5wdXQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7aW5wdXR9LWlucHV0LWNvbnRhaW5lcmApO1xuXG4gICAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgYCR7aW5wdXR9LWRyb3Bkb3duLWlucHV0YCk7XG4gICAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gYCR7aW5wdXQuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIGlucHV0LnNsaWNlKDEpfTpgOyAvL2NhcGl0YWxpemUgZmlyc3QgbGV0dGVyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChsYWJlbCk7XG5cbiAgICAgICAgY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgICAgICBkcm9wZG93bi5pZCA9IGAke2lucHV0fS1kcm9wZG93bi1pbnB1dGA7XG4gICAgICAgIGRyb3Bkb3duLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgYCR7aW5wdXR9YCk7XG4gICAgICAgIGRyb3Bkb3duLmNsYXNzTGlzdC5hZGQoYCR7aW5wdXR9LWRyb3Bkb3duLWlucHV0YCk7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkcm9wZG93bik7XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBcInByb2plY3RcIikge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNEYXRhID0gc3RvcmFnZVV0aWxzLmdldFByb2plY3RBbGwoKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9qZWN0IGluIHByb2plY3RzRGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2pPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHByb2pPcHRpb24uY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLW9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBwcm9qT3B0aW9uLnZhbHVlID0gcHJvamVjdHNEYXRhW3Byb2plY3RdW1wibmFtZVwiXTtcbiAgICAgICAgICAgICAgICBwcm9qT3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdHNEYXRhW3Byb2plY3RdW1wibmFtZVwiXTtcblxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmFwcGVuZENoaWxkKHByb2pPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0ID09PSBcInByaW9yaXR5XCIpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDM7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByaW9yT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi5jbGFzc0xpc3QuYWRkKFwicHJpb3JpdHktb3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLnZhbHVlID0gaTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLnRleHRDb250ZW50ID0gXCJMb3dcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi50ZXh0Q29udGVudCA9IFwiTWVkaXVtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiBcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLnRleHRDb250ZW50ID0gXCJVcmdlbnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIGRyb3Bkb3duLmFwcGVuZENoaWxkKHByaW9yT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBjb25zdCBTaWRlYmFyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiBfY3JlYXRlUHJvamVjdChuYW1lLCB0YXNrc0NvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0XCIsIFwicm93LWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGxpLmRhdGFzZXQucHJvamVjdCA9IG5hbWU7XG4gICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0YXNrcy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgIHRhc2tzLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3cobmFtZSwgc3RvcmFnZVV0aWxzLmdldFByb2plY3QobmFtZSkudGFza3MpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgdGFza3MuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGFza3MtY291bnRcIiwgXCJzaG93XCIpO1xuICAgICAgICAgICAgdGFza3MudGV4dENvbnRlbnQgPSB0YXNrc0NvdW50O1xuICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQodGFza3MpO1xuXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCLDl1wiO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICBzdG9yYWdlVXRpbHMucmVtb3ZlUHJvamVjdChuYW1lKTtcbiAgICAgICAgICAgICAgICBTaWRlYmFyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKFByb2plY3RXaW5kb3cuZ2V0Q3VycmVudFByb2plY3QoKSA9PT0gbmFtZSkgeyAvLyBpZiBjdXJyZW50bHkgb3BlbmVkIHByb2plY3QgaXMgdGhlIG9uZSBkZWxldGVkXG4gICAgICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuc2V0Q3VycmVudFByb2plY3QoXCJJbmJveFwiKTtcbiAgICAgICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy51cGRhdGVDdXJyZW50UHJvamVjdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUHJvamVjdFdpbmRvdy5nZXRDdXJyZW50UHJvamVjdCgpID09PSBcIlRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KFwiVG9kYXlcIiwgc3RvcmFnZVV0aWxzLmdldFRvZGF5VGFza3MoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgICAgICBjb25zdCBjb2xvckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgY29sb3JJY29uLmNsYXNzTGlzdC5hZGQoXCJjaXJjbGVcIik7XG4gICAgICAgICAgICBjb2xvckljb24uYWx0ID0gXCJcIjtcbiAgICAgICAgICAgIGNvbG9ySWNvbi5zcmM9IFwiLi9hc3NldHMvY2lyY2xlLnBuZ1wiO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbG9ySWNvbik7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwibWVudS1wcm9qZWN0LW5hbWVcIik7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xuXG5cblxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lLCB0YXNrc0NvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gX2NyZWF0ZVByb2plY3QobmFtZSwgdGFza3NDb3VudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVTaG93KCkge1xuICAgICAgICAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKTtcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50c1RvUHJvamVjdHMgKHByb2plY3RzRGF0YSkge1xuXG4gICAgICAgICAgICAvKiB1c2UgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYWxsIHVzZXItY3JlYXRlZCBzaWRlYmFyIHByb2plY3RzICovXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzIHVsXCIpO1xuICAgICAgICAgICAgcHJvamVjdHNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnByb2plY3RcIik7XG5cdFx0XHRcdGlmICghcHJvamVjdCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmRhdGFzZXQucHJvamVjdDtcblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNEYXRhW3Byb2plY3ROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3cocHJvamVjdE5hbWUsIHByb2plY3RzRGF0YVtwcm9qZWN0TmFtZV0udGFza3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtjYXB0dXJlOiB0cnVlfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50VG9Ub2RheSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RbZGF0YS1wcm9qZWN0PVwiVG9kYXlcIl0nKTtcblxuICAgICAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KFwiVG9kYXlcIiwgc3RvcmFnZVV0aWxzLmdldFRvZGF5VGFza3MoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50VG9JbmJveCgpIHtcbiAgICAgICAgICAgIGNvbnN0IGluYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tcHJvamVjdHMgLnByb2plY3RbZGF0YS1wcm9qZWN0PVwiSW5ib3hcIl0nKTtcbiAgICAgICAgICAgIGluYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KFwiSW5ib3hcIiwgc3RvcmFnZVV0aWxzLmdldFByb2plY3QoXCJJbmJveFwiKS50YXNrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE5ld1Byb2plY3RFdmVudCgpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1wcm9qZWN0XCIpO1xuXG4gICAgICAgICAgICBuZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgX3RvZ2dsZU5ld1Byb2plY3RGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG5cbiAgICAgICAgICAgIF9yZW1vdmVBbGxDaGlsZE5vZGVzKHByb2plY3RzTGlzdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzRGF0YSA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0QWxsKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBwcm9qZWN0c0RhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNEYXRhW3Byb2plY3RdLm5hbWUgIT09IFwiSW5ib3hcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrc0NvdW50ID0gcHJvamVjdHNEYXRhW3Byb2plY3RdLnRhc2tzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RzRGF0YVtwcm9qZWN0XS5uYW1lLCB0YXNrc0NvdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9jcmVhdGVOZXdQcm9qZWN0Rm9ybSgpO1xuXG4gICAgICAgICAgICBjb25zdCBzaG93bkluYm94VGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFtkYXRhLXByb2plY3Q9XFxcIkluYm94XFxcIl0gLnByb2plY3QtdGFza3MtY291bnRcIik7XG4gICAgICAgICAgICBjb25zdCBzaG93blRvZGF5VGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFtkYXRhLXByb2plY3Q9XFxcIlRvZGF5XFxcIl0gLnByb2plY3QtdGFza3MtY291bnRcIik7XG5cbiAgICAgICAgICAgIHNob3duSW5ib3hUYXNrc0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHNEYXRhW1wiSW5ib3hcIl0udGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgc2hvd25Ub2RheVRhc2tzQ291bnQudGV4dENvbnRlbnQgPSBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gYWRkRXZlbnRzVG9Qcm9qZWN0cyhwcm9qZWN0c0RhdGEpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIChmdW5jdGlvbiBfZW5hYmxlUHJvamVjdHNEcm9wZG93bigpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1tZW51IC5vcGVuLWRyb3Bkb3duXCIpO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZHJvcGRvd25JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLW1lbnUgLm9wZW4tZHJvcGRvd24gaW1nXCIpO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duSW1nLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkUHJvamVjdCwgXG4gICAgICAgICAgICB0b2dnbGVTaG93LCBcbiAgICAgICAgICAgIGFkZEV2ZW50c1RvUHJvamVjdHMsIFxuICAgICAgICAgICAgYWRkRXZlbnRUb1RvZGF5LFxuICAgICAgICAgICAgYWRkRXZlbnRUb0luYm94LFxuICAgICAgICAgICAgYWRkTmV3UHJvamVjdEV2ZW50LCBcbiAgICAgICAgICAgIHVwZGF0ZSxcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgSGVhZGVyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2J1aWxkIHRvZ2dsZSBzaWRlYmFyIGJ1dHRvbiwgd2lyZSBpdCB0byB0aGUgcHJpdmF0ZSBtZXRob2Qgb2YgU2lkZWJhclxuICAgICAgICBjb25zdCB0b2dnbGVTaWRlYmFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGUtc2lkZWJhclwiKTtcbiAgICAgICAgdG9nZ2xlU2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtTaWRlYmFyLnRvZ2dsZVNob3coKX0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIF9pbml0TmV3VGFza0J0bigpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stYnRuXCIpO1xuXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJodWdcIik7XG5cbiAgICAgICAgICAgICAgICBfdXBkYXRlRm9ybURhdGEoKTtcblxuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBfaW5pdE5ld1Rhc2tCdG4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aW5pdH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IFByb2plY3RXaW5kb3cgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9kaXNwbGF5V2luZG93KHByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1jb250ZW50XCIpO1xuICAgICAgICAgICAgX3JlbW92ZUFsbENoaWxkTm9kZXMocHJvamVjdENvbnRlbnQpO1xuICAgICAgICAgICAgLy8gcHJvamVjdENvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIuaWQgPSBcInByb2plY3QtaGVhZGVyXCI7XG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy5pZCA9IFwicHJvamVjdC1uYW1lLWhlYWRpbmdcIjtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lSGVhZGluZyk7XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gXCJUb2RheVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICBzcGFuLmlkID0gXCJwcm9qZWN0LWN1cnJlbnQtZGF0ZVwiO1xuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0b2RheTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcImNvbFwiKTtcbiAgICAgICAgICAgIHRhc2tzQ29udGFpbmVyLmlkID0gXCJwcm9qZWN0LXRhc2tzXCI7XG5cbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVUYXNrKHRhc2tJbmZvLCBpbmRleCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBfdGFzayA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBfdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgICAgICAgIF90YXNrLmRhdGFzZXQucHJvamVjdCA9IHRhc2tJbmZvLnByb2plY3Q7XG4gICAgICAgICAgICBfdGFzay5kYXRhc2V0LmluZGV4ID0gaW5kZXg7XG5cblxuICAgICAgICAgICAgY29uc3QgX3JlbW92ZVRhc2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10YXNrc1wiKTtcblxuICAgICAgICAgICAgICAgIHRhc2tzQ29udGFpbmVyLnJlbW92ZUNoaWxkKF90YXNrKTtcblxuICAgICAgICAgICAgICAgIHN0b3JhZ2VVdGlscy5yZW1vdmVUYXNrKHRhc2tJbmZvLnByb2plY3QsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy51cGRhdGVDdXJyZW50UHJvamVjdCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tNYWluID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5jbGFzc0xpc3QuYWRkKFwidGFzay1tYWluXCIpO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IF9jb21wbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgX2NvbXBsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGUtdGFzay1idG5cIiwgYHRhc2stcHJpb3JpdHktJHt0YXNrSW5mby5wcmlvcml0eX1gKTtcblxuICAgICAgICAgICAgX2NvbXBsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX3JlbW92ZVRhc2spO1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza0NvbnRlbnQgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRlbnRcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgICAgICAgIF90YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgICAgICAgICAgX3Rhc2tOYW1lLnRleHRDb250ZW50ID0gdGFza0luZm8udGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIF90YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICBfdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFza0luZm8uZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrRGF0ZSA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBfdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcInRhc2stZGF0ZVwiKTtcblxuICAgICAgICAgICAgY29uc3QgX2NhbGVuZGFySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIF9jYWxlbmRhckltZy5zcmMgPSBcIi4vYXNzZXRzL2NhbGVuZGFyLnBuZ1wiO1xuICAgICAgICAgICAgX2NhbGVuZGFySW1nLmFsdCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IF9kYXRlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG5cbiAgICAgICAgICAgIGlmICh0YXNrSW5mby5kYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKHRhc2tJbmZvLmRhdGUpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXNrRGF0ZSA9PT0gY3VycmVudERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0b2RheS10ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQudGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBfdGFza0RhdGUuYXBwZW5kQ2hpbGQoX2NhbGVuZGFySW1nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQuY2xhc3NMaXN0LmFkZChcImRhdGUtdGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LnRleHRDb250ZW50ID0gdGFza0luZm8uZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IF9jbG9zZUFuZFByb2plY3QgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwidGFzay1jbG9zZS1hbmQtcHJvamVjdFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrXCIpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCLDl1wiO1xuXG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF9yZW1vdmVUYXNrKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvL3VzZWQgZm9yIHRvZGF5LCBlbXB0eSBpbiBvdGhlciBwcm9qZWN0c1xuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2stcHJvamVjdFwiKTtcblxuICAgICAgICAgICAgX3Rhc2suYXBwZW5kQ2hpbGQoX3Rhc2tNYWluKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5hcHBlbmRDaGlsZChfY29tcGxldGVUYXNrQnRuKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5hcHBlbmRDaGlsZChfdGFza0NvbnRlbnQpO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrTmFtZSk7XG4gICAgICAgICAgICBpZiAoX3Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCkgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrRGF0ZSk7XG4gICAgICAgICAgICBfdGFza0RhdGUuYXBwZW5kQ2hpbGQoX2RhdGVUZXh0KTtcbiAgICAgICAgICAgIF90YXNrLmFwcGVuZENoaWxkKF9jbG9zZUFuZFByb2plY3QpO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0U2VjdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBfdGFzaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gX2Rpc3BsYXlUYXNrcyh0YXNrc0RhdGEsIHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgIHRhc2tzRGF0YS5mb3JFYWNoKCh0YXNrSW5mbywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tOb2RlID0gX2NyZWF0ZVRhc2sodGFza0luZm8sIGkpO1xuICAgICAgICAgICAgICAgIF9zaG93VGFzayh0YXNrTm9kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Nob3dUYXNrUHJvamVjdChpLCB0YXNrSW5mby5wcm9qZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHRhc2sgZGVsZXRpb25cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGUtdGFza1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFza1Byb2plY3QodGFza0luZGV4LCB0YXNrUHJvamVjdCkgeyAvLyBzaG93cyB3aGF0IHByb2plY3QgdGhlIHRhc2sgaXMgYXNzb2NpYXRlZCB3aXRoIChlLmcuIGluIHRvZGF5KVxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhc2tbZGF0YS1pbmRleD1cIiR7dGFza0luZGV4fVwiXSAudGFzay1wcm9qZWN0YCk7XG4gICAgICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSB0YXNrUHJvamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFzayh0YXNrTm9kZSkge1xuICAgICAgICAgICAgLy8gY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGFza3NcIik7XG4gICAgICAgICAgICAvLyB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrTm9kZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW5ldy10YXNrLWJ0blwiKTtcbiAgICAgICAgICAgIG5ld1Rhc2tCdG4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgdGFza05vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2FkZE5ld1Rhc2tCdG4ocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRhc2tzXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5ldy10YXNrLWJ0blwiLCBcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoX2N1cnJlbnRQcm9qZWN0ID09PSBcIlRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZUZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wcmVkZWZpbmVGb3JtUHJvamVjdChcIkluYm94XCIpO1xuICAgICAgICAgICAgICAgICAgICBfcHJlZGVmaW5lRm9ybURhdGUoRGF0ZUZvcm1hdHRlci5nZXRIVE1MNURhdGUobmV3IERhdGUoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF91cGRhdGVGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBfcHJlZGVmaW5lRm9ybVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IFwiLi9hc3NldHMvcGx1cy1ibHVlLnBuZ1wiO1xuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5ldy10YXNrLXBsdXMtaW1nXCIpO1xuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGJ0blRleHQuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmV3LXRhc2stdGV4dFwiKTtcbiAgICAgICAgICAgIGJ0blRleHQudGV4dENvbnRlbnQgPSBcIkFkZCB0YXNrXCI7XG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGlzcGxheUFsbChwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfZGlzcGxheVdpbmRvdyhwcm9qZWN0TmFtZSk7ICAgXG4gICAgICAgICAgICBfYWRkTmV3VGFza0J0bihwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBfZGlzcGxheVRhc2tzKHRhc2tzRGF0YSwgcHJvamVjdE5hbWUgPT09IFwiVG9kYXlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuICAgICAgICBsZXQgX2N1cnJlbnRUYXNrc0RhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVudFByb2plY3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJlbnRQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIF9jdXJyZW50UHJvamVjdCA9IG5ld1Byb2plY3ROYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ3VycmVudFByb2plY3QoKSB7XG4gICAgICAgICAgICBfY3VycmVudFRhc2tzRGF0YSA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0KF9jdXJyZW50UHJvamVjdCkudGFza3M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF9kaXNwbGF5QWxsKF9jdXJyZW50UHJvamVjdCwgX2N1cnJlbnRUYXNrc0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFdpbmRvdyhwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfY3VycmVudFByb2plY3QgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgICAgIF9kaXNwbGF5QWxsKHByb2plY3ROYW1lLCB0YXNrc0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXRXaW5kb3csIFxuICAgICAgICAgICAgZ2V0Q3VycmVudFByb2plY3QsIFxuICAgICAgICAgICAgc2V0Q3VycmVudFByb2plY3QsXG4gICAgICAgICAgICB1cGRhdGVDdXJyZW50UHJvamVjdCxcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtTaWRlYmFyLCBIZWFkZXIsIFByb2plY3RXaW5kb3csIGxvYWR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVUlMb2FkZXI7IiwiY29uc3QgRGF0ZUZvcm1hdHRlciA9IChmdW5jdGlvbigpIHtcbiAgICAvKiBGb3JtYXRzIGRhdGUgdG8gbG9vayBsaWtlIEZlYiAyLCAyMDIyICovXG4gICAgZnVuY3Rpb24gZm9ybWF0KGRhdGUpIHtcbiAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4gICAgICAgIHJldHVybiBgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldERhdGUoKX0sICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SFRNTDVEYXRlKGRhdGUpIHtcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICAgICAgbW9udGggPSBgMCR7bW9udGh9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXkgPCAxMCkge1xuICAgICAgICAgICAgZGF5ID0gYDAke2RheX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHllYXIgPCAxMCkge1xuICAgICAgICAgICAgeWVhciA9IGAwMDAke3llYXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyID0gYDAwJHt5ZWFyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeWVhciA8IDEwMDApIHtcbiAgICAgICAgICAgIHllYXIgPSBgMCR7eWVhcn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4ge2Zvcm1hdCwgZ2V0SFRNTDVEYXRlfTtcbn0pKCk7XG5cbmNvbnN0IHN0b3JhZ2VVdGlscyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBzdG9yYWdlID0ge1xuICAgICAgICBcInByb2plY3RzRGF0YVwiOiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNEYXRhXCIpKSB8fCB7fSxcbiAgICAgICAgLy8gXCJUb2RheVwiOiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVG9kYXlcIikpIHx8IFtdXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0SW5ib3ggPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJJbmJveFwiLFxuICAgICAgICAgICAgXCJ0YXNrc1wiOiBbXG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdG9yYWdlLnByb2plY3RzRGF0YSBcbiAgICAgICAgICAgICYmIE9iamVjdC5rZXlzKHN0b3JhZ2UucHJvamVjdHNEYXRhKS5sZW5ndGggPT09IDAgXG4gICAgICAgICAgICAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3RvcmFnZS5wcm9qZWN0c0RhdGEpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG5cbiAgICAgICAgICAgIHN0b3JhZ2UucHJvamVjdHNEYXRhW1wiSW5ib3hcIl0gPSBkZWZhdWx0SW5ib3g7XG4gICAgICAgICAgICBfdXBkYXRlTG9jYWxTdG9yYWdlKFwicHJvamVjdHNEYXRhXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdXBkYXRlTG9jYWxTdG9yYWdlKGtleSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2Vba2V5XSkpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGNsYXNzIFByb2plY3Qge1xuICAgICAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJuYW1lXCJdID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzW1widGFza3NcIl0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbbmFtZV0gPSBwcm9qZWN0O1xuXG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgICAgIGNsYXNzIFRhc2sge1xuICAgICAgICAgICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJ0aXRsZVwiXSA9IHRpdGxlO1xuICAgICAgICAgICAgICAgIHRoaXNbXCJkZXNjcmlwdGlvblwiXSA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlKSB0aGlzW1wiZGF0ZVwiXSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKGRhdGUpKTtcbiAgICAgICAgICAgICAgICB0aGlzW1wicHJpb3JpdHlcIl0gPSBwcmlvcml0eTtcbiAgICAgICAgICAgICAgICB0aGlzW1wicHJvamVjdFwiXSA9IHByb2plY3Q7XG4gICAgICAgICAgICAgICAgdGhpc1tcImluZGV4XCJdID0gc3RvcmFnZVtcInByb2plY3RzRGF0YVwiXVtwcm9qZWN0XVtcInRhc2tzXCJdLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldERhdGUoZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSAgRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoZCkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXNbXCJkYXRlXCJdID0gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbcHJvamVjdF1bXCJ0YXNrc1wiXS5wdXNoKHRhc2spO1xuXG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayhwcm9qZWN0LCBpbmRleCkge1xuICAgICAgICBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdW3Byb2plY3RdLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgZGVsZXRlIHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl1bbmFtZV07XG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHJldHVybiBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdW25hbWVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3RBbGwoKSB7XG4gICAgICAgIHJldHVybiBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRvZGF5VGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5VGFza3MgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3QgaW4gZ2V0UHJvamVjdEFsbCgpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IGdldFByb2plY3RBbGwoKVtwcm9qZWN0XVtcInRhc2tzXCJdO1xuXG4gICAgICAgICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSB0YXNrLmRhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9kYXkgPT09IHRhc2tEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2RheVRhc2tzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQsIFxuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LCBcbiAgICAgICAgYWRkVGFzayxcbiAgICAgICAgcmVtb3ZlVGFzaywgXG4gICAgICAgIGdldFRvZGF5VGFza3MsIFxuICAgICAgICBnZXRQcm9qZWN0LCBcbiAgICAgICAgZ2V0UHJvamVjdEFsbCxcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IHtEYXRlRm9ybWF0dGVyLCBzdG9yYWdlVXRpbHN9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJTG9hZGVyIGZyb20gXCIuL3VpLWxvYWRlclwiXG5pbXBvcnQge3N0b3JhZ2VVdGlsc30gZnJvbSBcIi4vdXRpbHNcIlxuXG5zdG9yYWdlVXRpbHMuaW5pdCgpO1xuLy9JTklUISEhXG5VSUxvYWRlci5sb2FkKCk7XG4vLyBVSUxvYWRlci5TaWRlYmFyLnVwZGF0ZSgpO1xuLy8gLy8gVUlMb2FkZXIuU2lkZWJhci5hZGRFdmVudHNUb1Byb2plY3RzKHByb2plY3RzRGF0YSk7XG4vLyBVSUxvYWRlci5TaWRlYmFyLmFkZEV2ZW50VG9Ub2RheSgpO1xuLy8gVUlMb2FkZXIuU2lkZWJhci5hZGRFdmVudFRvSW5ib3goKTtcbi8vIFVJTG9hZGVyLlNpZGViYXIuYWRkTmV3UHJvamVjdEV2ZW50KCk7XG5cbi8vIFVJTG9hZGVyLlByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuLy8gVUlMb2FkZXIuSGVhZGVyLmluaXQoKTtcbi8vIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9