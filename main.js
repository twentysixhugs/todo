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
_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].load();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7VUMxSkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFDRTs7QUFFcEMscURBQWlCO0FBQ2pCLHVEQUFhLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLy4vc3JjL3VpLWxvYWRlci5qcyIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL3V0aWxzLmpzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIFdoZW4gSSB3YXMgYnVpbGRpbmcgaXQsIEkgb25seSBzdGFydGVkIHRvIGxlYXJuIHRvIHdyaXRlIG1vcmUgb3IgbGVzcyBjbGVhbiBDU1MgYW5kIEhUTUwgQ29kZSAqL1xuLyogVG8gdGhhdCBlbmQsIHRoZXJlIGFyZSBtYW55IGxvbmcsIGNoYWluZWQgYW5kIGNvbXBsZXRlbHkgdW5yZWFkYWJsZSBzZWxlY3RvcnMgKi9cbi8qIHRoYXQgSSdtIGF3YXJlIG9mLiBIb3dldmVyLCBpbnN0ZWFkIG9mIHJld3JpdGluZywgSSBjaG9zZSB0byBnbyBmb3J3YXJkIGFuZCAqL1xuLyogbWFrZSBzdXJlIEkgZG9uJ3QgcmVwZWF0IHN1Y2ggbWlzdGFrZXMgaW4gdGhlIGZ1dHVyZS4gKi9cblxuaW1wb3J0IHtEYXRlRm9ybWF0dGVyfSBmcm9tIFwiLi91dGlscy5qc1wiXG5pbXBvcnQge3N0b3JhZ2VVdGlsc30gZnJvbSBcIi4vdXRpbHMuanNcIlxuXG5jb25zdCBVSUxvYWRlciA9IChmdW5jdGlvbigpIHtcblxuICAgIC8qIFV0aWxpdHkgZnVuY3Rpb25zICovXG4gICAgY29uc3QgX2NyZWF0ZUNvbnRhaW5lciA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYCR7ZGlyZWN0aW9ufS1jb250YWluZXJgKTtcblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIGNvbnN0IF9yZW1vdmVBbGxDaGlsZE5vZGVzID0gZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICAgIHdoaWxlIChwYXJlbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKHBhcmVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qIE9uIHBhZ2Vsb2FkICovXG5cbiAgICBmdW5jdGlvbiBsb2FkKCkge1xuICAgICAgICBTaWRlYmFyLnVwZGF0ZSgpO1xuICAgICAgICBTaWRlYmFyLmFkZEV2ZW50VG9Ub2RheSgpO1xuICAgICAgICBTaWRlYmFyLmFkZEV2ZW50VG9JbmJveCgpO1xuICAgICAgICBTaWRlYmFyLmFkZE5ld1Byb2plY3RFdmVudCgpO1xuICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJUb2RheVwiLCBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpKTtcbiAgICAgICAgX2NyZWF0ZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgIEhlYWRlci5pbml0KCk7XG4gICAgfVxuXG4gICAgLyogRm9ybXMgKi9cblxuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZU5ld1Rhc2tGb3JtKCkge1xuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWlucHV0LWJhY2tncm91bmRcIik7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImZvcm0tdGFzay1pbnB1dFwiLCBcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgIGJhY2tncm91bmQuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgICAgY29uc3QgZmllbGRTZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmllbGRzZXRcIik7XG4gICAgICAgIGZpZWxkU2V0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LWRhdGEtZmllbGRzZXRcIiwgXCJjb2wtY29udGFpbmVyXCIpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGZpZWxkU2V0KTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eUNsb3NlUHJvamVjdCA9IF9jcmVhdGVDb250YWluZXIoXCJjb2xcIik7XG4gICAgICAgIHByaW9yaXR5Q2xvc2VQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1jbG9zZS1wcm9qZWN0XCIpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKHByaW9yaXR5Q2xvc2VQcm9qZWN0KTtcblxuICAgICAgICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjbG9zZS5jbGFzc0xpc3QuYWRkKFwiY2xvc2UtdGFzay1pbnB1dC1mb3JtXCIpO1xuICAgICAgICBjbG9zZS50ZXh0Q29udGVudCA9IFwiw5dcIjtcblxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RvZ2dsZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgICAgICBlbXB0eVRpdGxlV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgICAgIC8qIGZvcm0ucmVzZXQoKTsgKi9cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBwcmlvcml0eUNsb3NlUHJvamVjdC5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHlQcm9qZWN0ID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgcHJpb3JpdHlQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1hbmQtcHJvamVjdFwiKTtcbiAgICAgICAgcHJpb3JpdHlDbG9zZVByb2plY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHlQcm9qZWN0KTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eSA9IF9jcmVhdGVGb3JtRHJvcGRvd24oXCJwcmlvcml0eVwiKTtcbiAgICAgICAgcHJpb3JpdHlQcm9qZWN0LmFwcGVuZENoaWxkKHByaW9yaXR5KTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0ID0gX2NyZWF0ZUZvcm1Ecm9wZG93bihcInByb2plY3RcIik7XG4gICAgICAgIHByaW9yaXR5UHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIHRpdGxlLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiVGFzayBuYW1lXCIpO1xuICAgICAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC10aXRsZVwiKTtcblxuICAgICAgICBjb25zdCBlbXB0eVRpdGxlV2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBlbXB0eVRpdGxlV2FybmluZy5jbGFzc0xpc3QuYWRkKFwiZW1wdHktdGl0bGUtd2FybmluZ1wiKTtcbiAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcudGV4dENvbnRlbnQgPSBcIlBsZWFzZSwgZmlsbCBvdXQgdGFzayBuYW1lXCJcblxuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGVtcHR5VGl0bGVXYXJuaW5nKTtcblxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtZGVzY3JpcHRpb25cIik7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICBkZXNjcmlwdGlvbi5zZXRBdHRyaWJ1dGUoXCJwbGFjZWhvbGRlclwiLCBcIkRlc2NyaXB0aW9uXCIpO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICAgICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwiZGF0ZS10YXNrLWlucHV0XCIpO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZChkYXRlKTtcblxuICAgICAgICBjb25zdCBmb3JtQWN0aW9ucyA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgIGZvcm1BY3Rpb25zLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LWZvcm0tYWN0aW9uc1wiKTtcbiAgICAgICAgZmllbGRTZXQuYXBwZW5kQ2hpbGQoZm9ybUFjdGlvbnMpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LWNvbmZpcm1cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY29uZmlybUJ0bi50ZXh0Q29udGVudCA9IFwiQWRkIHRhc2tcIjtcblxuICAgICAgICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRpdGxlLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RvcmFnZVV0aWxzLmFkZFRhc2soXG4gICAgICAgICAgICAgICAgdGl0bGUudmFsdWUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24udmFsdWUsXG4gICAgICAgICAgICAgICAgZGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eS5sYXN0Q2hpbGQudmFsdWUsXG4gICAgICAgICAgICAgICAgcHJvamVjdC5sYXN0Q2hpbGQudmFsdWVcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAocHJvamVjdC5sYXN0Q2hpbGQudmFsdWUgPT09IFByb2plY3RXaW5kb3cuZ2V0Q3VycmVudFByb2plY3QoKSkge1xuICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cudXBkYXRlQ3VycmVudFByb2plY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKGRhdGUudmFsdWUpKSA9PT0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoKSlcbiAgICAgICAgICAgICYmIFByb2plY3RXaW5kb3cuZ2V0Q3VycmVudFByb2plY3QoKSA9PT0gXCJUb2RheVwiKSB7IC8vIGlmIHRhc2sgaXMgc2V0IHRvIHRvZGF5IGFuZCB0b2RheSBpcyBvcGVuZWRcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJUb2RheVwiLCBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgU2lkZWJhci51cGRhdGUoKTtcblxuICAgICAgICAgICAgLyogZm9ybS5yZXNldCgpICovO1xuICAgICAgICAgICAgX3RvZ2dsZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm1BY3Rpb25zLmFwcGVuZENoaWxkKGNvbmZpcm1CdG4pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC1jYW5jZWxcIik7XG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZW1wdHlUaXRsZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICBfdG9nZ2xlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybUFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJlZGVmaW5lRm9ybVByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWRyb3Bkb3duLWlucHV0XCIpO1xuICAgICAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSBwcm9qZWN0TmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfcHJlZGVmaW5lRm9ybURhdGUoSFRNTDVEYXRlSW5wdXRWYWx1ZSkge1xuICAgICAgICBjb25zdCB0YXNrRGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kYXRlLXRhc2staW5wdXRcIik7XG5cbiAgICAgICAgdGFza0RhdGVJbnB1dC52YWx1ZSA9IEhUTUw1RGF0ZUlucHV0VmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3VwZGF0ZUZvcm1EYXRhKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staW5wdXQtYmFja2dyb3VuZFwiKS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgIF9jcmVhdGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICBfcHJlZGVmaW5lRm9ybVByb2plY3QoXCJJbmJveFwiKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZU5ld1Byb2plY3RGb3JtKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG5cbiAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJjb2wtY29udGFpbmVyXCIsIFwibmV3LXByb2plY3RcIik7XG4gICAgICAgIHByb2plY3RzLmFwcGVuZENoaWxkKGxpKTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwibmV3LXByb2plY3QtaW5wdXRcIiwgXCJjb2wtY29udGFpbmVyXCIpO1xuICAgICAgICBsaS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIG5hbWVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgbmFtZUlucHV0LmNsYXNzTGlzdC5hZGQoXCJuZXctcHJvamVjdC1pbnB1dC1uYW1lXCIpO1xuICAgICAgICBcblxuICAgICAgICBjb25zdCBlbXB0eU5hbWVXYXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGVtcHR5TmFtZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcImVtcHR5LXRpdGxlLXdhcm5pbmdcIik7XG4gICAgICAgIGVtcHR5TmFtZVdhcm5pbmcudGV4dENvbnRlbnQgPSBcIlBsZWFzZSwgZmlsbCBvdXQgcHJvamVjdCBuYW1lXCI7XG5cbiAgICAgICAgY29uc3Qgbm90VW5pcXVlTmFtZVdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgbm90VW5pcXVlTmFtZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcImVtcHR5LXRpdGxlLXdhcm5pbmdcIik7XG4gICAgICAgIG5vdFVuaXF1ZU5hbWVXYXJuaW5nLnRleHRDb250ZW50ID0gXCJQbGVhc2UsIGVudGVyIGEgdW5pcXVlIHByb2plY3QgbmFtZVwiO1xuXG4gICAgICAgIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZW1wdHlOYW1lV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgICAgIG5vdFVuaXF1ZU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKG5hbWVJbnB1dCk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZW1wdHlOYW1lV2FybmluZyk7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobm90VW5pcXVlTmFtZVdhcm5pbmcpO1xuXG4gICAgICAgIGNvbnN0IGJ1dHRvbnNDb250YWluZXIgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICBidXR0b25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJuZXctcHJvamVjdC1hY3Rpb25zXCIpO1xuICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGJ1dHRvbnNDb250YWluZXIpO1xuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25maXJtQnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWlucHV0LWNvbmZpcm1cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY29uZmlybUJ0bi50ZXh0Q29udGVudCA9IFwiQWRkIHByb2plY3RcIjtcblxuICAgICAgICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIW5hbWVJbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGVtcHR5TmFtZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0cyA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0QWxsKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBwcm9qZWN0cykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c1twcm9qZWN0XS5uYW1lID09PSBuYW1lSW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbm90VW5pcXVlTmFtZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuYW1lSW5wdXQudmFsdWUgPT09IFwiVG9kYXlcIikge1xuICAgICAgICAgICAgICAgIG5vdFVuaXF1ZU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3RvcmFnZVV0aWxzLmFkZFByb2plY3QobmFtZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIF90b2dnbGVOZXdQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgLyogZm9ybS5yZXNldCgpOyAqL1xuICAgICAgICAgICAgU2lkZWJhci51cGRhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjb25maXJtQnRuKTtcblxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInByb2plY3QtaW5wdXQtY2FuY2VsXCIpO1xuICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcblxuICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIF90b2dnbGVOZXdQcm9qZWN0Rm9ybSgpO1xuICAgICAgICAgICAgZW1wdHlOYW1lV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdG9nZ2xlTmV3VGFza0Zvcm0oKSB7XG4gICAgICAgIGNvbnN0IGZvcm1CYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWlucHV0LWJhY2tncm91bmRcIik7XG4gICAgICAgIGZvcm1CYWNrZ3JvdW5kLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF90b2dnbGVOZXdQcm9qZWN0Rm9ybSgpIHtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXByb2plY3RcIik7XG4gICAgICAgIGZvcm1Db250YWluZXIuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG4gICAgfVxuXG4gICAgLyogR2VuZXJhbCAqL1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZUZvcm1Ecm9wZG93bihpbnB1dCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtpbnB1dH0taW5wdXQtY29udGFpbmVyYCk7XG5cbiAgICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBgJHtpbnB1dH0tZHJvcGRvd24taW5wdXRgKTtcbiAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgJHtpbnB1dC5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc2xpY2UoMSl9OmA7IC8vY2FwaXRhbGl6ZSBmaXJzdCBsZXR0ZXJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICBjb25zdCBkcm9wZG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIGRyb3Bkb3duLmlkID0gYCR7aW5wdXR9LWRyb3Bkb3duLWlucHV0YDtcbiAgICAgICAgZHJvcGRvd24uc2V0QXR0cmlidXRlKFwibmFtZVwiLCBgJHtpbnB1dH1gKTtcbiAgICAgICAgZHJvcGRvd24uY2xhc3NMaXN0LmFkZChgJHtpbnB1dH0tZHJvcGRvd24taW5wdXRgKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRyb3Bkb3duKTtcblxuICAgICAgICBpZiAoaW5wdXQgPT09IFwicHJvamVjdFwiKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0RhdGEgPSBzdG9yYWdlVXRpbHMuZ2V0UHJvamVjdEFsbCgpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb2plY3QgaW4gcHJvamVjdHNEYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvak9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgcHJvak9wdGlvbi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24tb3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHByb2pPcHRpb24udmFsdWUgPSBwcm9qZWN0c0RhdGFbcHJvamVjdF1bXCJuYW1lXCJdO1xuICAgICAgICAgICAgICAgIHByb2pPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0c0RhdGFbcHJvamVjdF1bXCJuYW1lXCJdO1xuXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQocHJvak9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQgPT09IFwicHJpb3JpdHlcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1vcHRpb25cIik7XG4gICAgICAgICAgICAgICAgcHJpb3JPcHRpb24udmFsdWUgPSBpO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JPcHRpb24udGV4dENvbnRlbnQgPSBcIkxvd1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW9yT3B0aW9uLnRleHRDb250ZW50ID0gXCJNZWRpdW1cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6IFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JPcHRpb24udGV4dENvbnRlbnQgPSBcIkhpZ2hcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JPcHRpb24udGV4dENvbnRlbnQgPSBcIlVyZ2VudFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgZHJvcGRvd24uYXBwZW5kQ2hpbGQocHJpb3JPcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIGNvbnN0IFNpZGViYXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVQcm9qZWN0KG5hbWUsIHRhc2tzQ291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcInByb2plY3RcIiwgXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICAgICAgbGkuZGF0YXNldC5wcm9qZWN0ID0gbmFtZTtcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRhc2tzLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICAgICAgdGFza3MuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhuYW1lLCBzdG9yYWdlVXRpbHMuZ2V0UHJvamVjdChuYW1lKS50YXNrcyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICB0YXNrcy5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC10YXNrcy1jb3VudFwiLCBcInNob3dcIik7XG4gICAgICAgICAgICB0YXNrcy50ZXh0Q29udGVudCA9IHRhc2tzQ291bnQ7XG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZCh0YXNrcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG4gICAgICAgICAgICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcIsOXXCI7XG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIHN0b3JhZ2VVdGlscy5yZW1vdmVQcm9qZWN0KG5hbWUpO1xuICAgICAgICAgICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoUHJvamVjdFdpbmRvdy5nZXRDdXJyZW50UHJvamVjdCgpID09PSBuYW1lKSB7IC8vIGlmIGN1cnJlbnRseSBvcGVuZWQgcHJvamVjdCBpcyB0aGUgb25lIGRlbGV0ZWRcbiAgICAgICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5zZXRDdXJyZW50UHJvamVjdChcIkluYm94XCIpO1xuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LnVwZGF0ZUN1cnJlbnRQcm9qZWN0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChQcm9qZWN0V2luZG93LmdldEN1cnJlbnRQcm9qZWN0KCkgPT09IFwiVG9kYXlcIikge1xuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJUb2RheVwiLCBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbG9ySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBjb2xvckljb24uY2xhc3NMaXN0LmFkZChcImNpcmNsZVwiKTtcbiAgICAgICAgICAgIGNvbG9ySWNvbi5hbHQgPSBcIlwiO1xuICAgICAgICAgICAgY29sb3JJY29uLnNyYz0gXCIuL2Fzc2V0cy9jaXJjbGUucG5nXCI7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29sb3JJY29uKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoXCJtZW51LXByb2plY3QtbmFtZVwiKTtcbiAgICAgICAgICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XG5cblxuXG4gICAgICAgICAgICByZXR1cm4gbGk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUsIHRhc2tzQ291bnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBfY3JlYXRlUHJvamVjdChuYW1lLCB0YXNrc0NvdW50KTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cyB1bFwiKTtcbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVNob3coKSB7XG4gICAgICAgICAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuICAgICAgICAgICAgc2lkZWJhci5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkRXZlbnRzVG9Qcm9qZWN0cyAocHJvamVjdHNEYXRhKSB7XG5cbiAgICAgICAgICAgIC8qIHVzZSBldmVudCBkZWxlZ2F0aW9uIGZvciBhbGwgdXNlci1jcmVhdGVkIHNpZGViYXIgcHJvamVjdHMgKi9cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIucHJvamVjdFwiKTtcblx0XHRcdFx0aWYgKCFwcm9qZWN0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QuZGF0YXNldC5wcm9qZWN0O1xuXHRcdFx0XHRcdFxuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c0RhdGFbcHJvamVjdE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhwcm9qZWN0TmFtZSwgcHJvamVjdHNEYXRhW3Byb2plY3ROYW1lXS50YXNrcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge2NhcHR1cmU6IHRydWV9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkRXZlbnRUb1RvZGF5KCkge1xuICAgICAgICAgICAgY29uc3QgdG9kYXlCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdFtkYXRhLXByb2plY3Q9XCJUb2RheVwiXScpO1xuXG4gICAgICAgICAgICB0b2RheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJUb2RheVwiLCBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkRXZlbnRUb0luYm94KCkge1xuICAgICAgICAgICAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1wcm9qZWN0cyAucHJvamVjdFtkYXRhLXByb2plY3Q9XCJJbmJveFwiXScpO1xuICAgICAgICAgICAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJJbmJveFwiLCBzdG9yYWdlVXRpbHMuZ2V0UHJvamVjdChcIkluYm94XCIpLnRhc2tzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTmV3UHJvamVjdEV2ZW50KCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXByb2plY3RcIik7XG5cbiAgICAgICAgICAgIG5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBfdG9nZ2xlTmV3UHJvamVjdEZvcm0oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cyB1bFwiKTtcblxuICAgICAgICAgICAgX3JlbW92ZUFsbENoaWxkTm9kZXMocHJvamVjdHNMaXN0KTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNEYXRhID0gc3RvcmFnZVV0aWxzLmdldFByb2plY3RBbGwoKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9qZWN0IGluIHByb2plY3RzRGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9qZWN0c0RhdGFbcHJvamVjdF0ubmFtZSAhPT0gXCJJbmJveFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tzQ291bnQgPSBwcm9qZWN0c0RhdGFbcHJvamVjdF0udGFza3MubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGFkZFByb2plY3QocHJvamVjdHNEYXRhW3Byb2plY3RdLm5hbWUsIHRhc2tzQ291bnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX2NyZWF0ZU5ld1Byb2plY3RGb3JtKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNob3duSW5ib3hUYXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0W2RhdGEtcHJvamVjdD1cXFwiSW5ib3hcXFwiXSAucHJvamVjdC10YXNrcy1jb3VudFwiKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3duVG9kYXlUYXNrc0NvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0W2RhdGEtcHJvamVjdD1cXFwiVG9kYXlcXFwiXSAucHJvamVjdC10YXNrcy1jb3VudFwiKTtcblxuICAgICAgICAgICAgc2hvd25JbmJveFRhc2tzQ291bnQudGV4dENvbnRlbnQgPSBwcm9qZWN0c0RhdGFbXCJJbmJveFwiXS50YXNrcy5sZW5ndGg7XG4gICAgICAgICAgICBzaG93blRvZGF5VGFza3NDb3VudC50ZXh0Q29udGVudCA9IHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBhZGRFdmVudHNUb1Byb2plY3RzKHByb2plY3RzRGF0YSk7XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgKGZ1bmN0aW9uIF9lbmFibGVQcm9qZWN0c0Ryb3Bkb3duKCkge1xuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLW1lbnUgLm9wZW4tZHJvcGRvd25cIik7XG5cbiAgICAgICAgICAgIGRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0c1wiKTtcblxuICAgICAgICAgICAgICAgIHByb2plY3RzLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBkcm9wZG93bkltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMtbWVudSAub3Blbi1kcm9wZG93biBpbWdcIik7XG4gICAgICAgICAgICAgICAgZHJvcGRvd25JbWcuY2xhc3NMaXN0LnRvZ2dsZShcImNsb3NlZFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhZGRQcm9qZWN0LCBcbiAgICAgICAgICAgIHRvZ2dsZVNob3csIFxuICAgICAgICAgICAgYWRkRXZlbnRzVG9Qcm9qZWN0cywgXG4gICAgICAgICAgICBhZGRFdmVudFRvVG9kYXksXG4gICAgICAgICAgICBhZGRFdmVudFRvSW5ib3gsXG4gICAgICAgICAgICBhZGROZXdQcm9qZWN0RXZlbnQsIFxuICAgICAgICAgICAgdXBkYXRlLFxuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCBIZWFkZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vYnVpbGQgdG9nZ2xlIHNpZGViYXIgYnV0dG9uLCB3aXJlIGl0IHRvIHRoZSBwcml2YXRlIG1ldGhvZCBvZiBTaWRlYmFyXG4gICAgICAgIGNvbnN0IHRvZ2dsZVNpZGViYXJCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZ2dsZS1zaWRlYmFyXCIpO1xuICAgICAgICB0b2dnbGVTaWRlYmFyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1NpZGViYXIudG9nZ2xlU2hvdygpfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gX2luaXROZXdUYXNrQnRuKCkge1xuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1idG5cIik7XG5cbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImh1Z1wiKTtcblxuICAgICAgICAgICAgICAgIF91cGRhdGVGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICAgICAgX3RvZ2dsZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIF9pbml0TmV3VGFza0J0bigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtpbml0fTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgUHJvamVjdFdpbmRvdyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gX2Rpc3BsYXlXaW5kb3cocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LWNvbnRlbnRcIik7XG4gICAgICAgICAgICBfcmVtb3ZlQWxsQ2hpbGROb2Rlcyhwcm9qZWN0Q29udGVudCk7XG4gICAgICAgICAgICAvLyBwcm9qZWN0Q29udGVudC50ZXh0Q29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaGVhZGVyXCIpO1xuICAgICAgICAgICAgcHJvamVjdEhlYWRlci5pZCA9IFwicHJvamVjdC1oZWFkZXJcIjtcbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIuY2xhc3NMaXN0LmFkZChcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgICAgICAgICAgcHJvamVjdE5hbWVIZWFkaW5nLmlkID0gXCJwcm9qZWN0LW5hbWUtaGVhZGluZ1wiO1xuICAgICAgICAgICAgcHJvamVjdE5hbWVIZWFkaW5nLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG5cbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWVIZWFkaW5nKTtcblxuICAgICAgICAgICAgaWYgKHByb2plY3ROYW1lID09PSBcIlRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKCkpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgICAgIHNwYW4uaWQgPSBcInByb2plY3QtY3VycmVudC1kYXRlXCI7XG4gICAgICAgICAgICAgICAgc3Bhbi50ZXh0Q29udGVudCA9IHRvZGF5O1xuICAgICAgICAgICAgICAgIHByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQoc3BhbilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGFza3NDb250YWluZXIgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICAgICAgdGFza3NDb250YWluZXIuaWQgPSBcInByb2plY3QtdGFza3NcIjtcblxuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlcik7XG4gICAgICAgICAgICBwcm9qZWN0Q29udGVudC5hcHBlbmRDaGlsZCh0YXNrc0NvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVRhc2sodGFza0luZm8sIGluZGV4KSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IF90YXNrID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIF90YXNrLmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgICAgICAgICAgX3Rhc2suZGF0YXNldC5wcm9qZWN0ID0gdGFza0luZm8ucHJvamVjdDtcbiAgICAgICAgICAgIF90YXNrLmRhdGFzZXQuaW5kZXggPSBpbmRleDtcblxuXG4gICAgICAgICAgICBjb25zdCBfcmVtb3ZlVGFzayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRhc2tzXCIpO1xuXG4gICAgICAgICAgICAgICAgdGFza3NDb250YWluZXIucmVtb3ZlQ2hpbGQoX3Rhc2spO1xuXG4gICAgICAgICAgICAgICAgc3RvcmFnZVV0aWxzLnJlbW92ZVRhc2sodGFza0luZm8ucHJvamVjdCwgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgU2lkZWJhci51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LnVwZGF0ZUN1cnJlbnRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza01haW4gPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICAgICAgX3Rhc2tNYWluLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW1haW5cIik7XG5cblxuICAgICAgICAgICAgY29uc3QgX2NvbXBsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBfY29tcGxldGVUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZS10YXNrLWJ0blwiLCBgdGFzay1wcmlvcml0eS0ke3Rhc2tJbmZvLnByaW9yaXR5fWApO1xuXG4gICAgICAgICAgICBfY29tcGxldGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBfcmVtb3ZlVGFzayk7XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrQ29udGVudCA9IF9jcmVhdGVDb250YWluZXIoXCJjb2xcIik7XG4gICAgICAgICAgICBfdGFza0NvbnRlbnQuY2xhc3NMaXN0LmFkZChcInRhc2stY29udGVudFwiKTtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgICAgICAgX3Rhc2tOYW1lLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgICAgICAgICBfdGFza05hbWUudGV4dENvbnRlbnQgPSB0YXNrSW5mby50aXRsZTtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgX3Rhc2tEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICAgIF90YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrSW5mby5kZXNjcmlwdGlvbjtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tEYXRlID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIF90YXNrRGF0ZS5jbGFzc0xpc3QuYWRkKFwidGFzay1kYXRlXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBfY2FsZW5kYXJJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgX2NhbGVuZGFySW1nLnNyYyA9IFwiLi9hc3NldHMvY2FsZW5kYXIucG5nXCI7XG4gICAgICAgICAgICBfY2FsZW5kYXJJbWcuYWx0ID0gXCJcIjtcblxuICAgICAgICAgICAgY29uc3QgX2RhdGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG5cblxuICAgICAgICAgICAgaWYgKHRhc2tJbmZvLmRhdGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUodGFza0luZm8uZGF0ZSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhc2tEYXRlID09PSBjdXJyZW50RGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQuY2xhc3NMaXN0LmFkZChcInRvZGF5LXRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9kYXRlVGV4dC50ZXh0Q29udGVudCA9IFwiVG9kYXlcIjtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIF90YXNrRGF0ZS5hcHBlbmRDaGlsZChfY2FsZW5kYXJJbWcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9kYXRlVGV4dC5jbGFzc0xpc3QuYWRkKFwiZGF0ZS10ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQudGV4dENvbnRlbnQgPSB0YXNrSW5mby5kYXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgX2Nsb3NlQW5kUHJvamVjdCA9IF9jcmVhdGVDb250YWluZXIoXCJjb2xcIik7XG4gICAgICAgICAgICBfY2xvc2VBbmRQcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNsb3NlLWFuZC1wcm9qZWN0XCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXRhc2tcIik7XG4gICAgICAgICAgICBkZWxldGVCdG4udGV4dENvbnRlbnQgPSBcIsOXXCI7XG5cbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX3JlbW92ZVRhc2spO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vdXNlZCBmb3IgdG9kYXksIGVtcHR5IGluIG90aGVyIHByb2plY3RzXG4gICAgICAgICAgICBwcm9qZWN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1wcm9qZWN0XCIpO1xuXG4gICAgICAgICAgICBfdGFzay5hcHBlbmRDaGlsZChfdGFza01haW4pO1xuICAgICAgICAgICAgX3Rhc2tNYWluLmFwcGVuZENoaWxkKF9jb21wbGV0ZVRhc2tCdG4pO1xuICAgICAgICAgICAgX3Rhc2tNYWluLmFwcGVuZENoaWxkKF90YXNrQ29udGVudCk7XG4gICAgICAgICAgICBfdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQoX3Rhc2tOYW1lKTtcbiAgICAgICAgICAgIGlmIChfdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50KSBfdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQoX3Rhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBfdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQoX3Rhc2tEYXRlKTtcbiAgICAgICAgICAgIF90YXNrRGF0ZS5hcHBlbmRDaGlsZChfZGF0ZVRleHQpO1xuICAgICAgICAgICAgX3Rhc2suYXBwZW5kQ2hpbGQoX2Nsb3NlQW5kUHJvamVjdCk7XG4gICAgICAgICAgICBfY2xvc2VBbmRQcm9qZWN0LmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG4gICAgICAgICAgICBfY2xvc2VBbmRQcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3RTZWN0aW9uKTtcblxuICAgICAgICAgICAgcmV0dXJuIF90YXNrO1xuICAgICAgICB9XG5cblxuICAgICAgICBmdW5jdGlvbiBfZGlzcGxheVRhc2tzKHRhc2tzRGF0YSwgdG9kYXlJc09wZW5lZCkge1xuICAgICAgICAgICAgdGFza3NEYXRhLmZvckVhY2goKHRhc2tJbmZvLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza05vZGUgPSBfY3JlYXRlVGFzayh0YXNrSW5mbywgaSk7XG4gICAgICAgICAgICAgICAgX3Nob3dUYXNrKHRhc2tOb2RlKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodG9kYXlJc09wZW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBfc2hvd1Rhc2tQcm9qZWN0KGksIHRhc2tJbmZvLnByb2plY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc2FibGUgdGFzayBkZWxldGlvblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVCdXR0b25zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmRlbGV0ZS10YXNrXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7YnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIn0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX3Nob3dUYXNrUHJvamVjdCh0YXNrSW5kZXgsIHRhc2tQcm9qZWN0KSB7IC8vIHNob3dzIHdoYXQgcHJvamVjdCB0aGUgdGFzayBpcyBhc3NvY2lhdGVkIHdpdGggKGUuZy4gaW4gdG9kYXkpXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAudGFza1tkYXRhLWluZGV4PVwiJHt0YXNrSW5kZXh9XCJdIC50YXNrLXByb2plY3RgKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci50ZXh0Q29udGVudCA9IHRhc2tQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX3Nob3dUYXNrKHRhc2tOb2RlKSB7XG4gICAgICAgICAgICAvLyBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10YXNrc1wiKTtcbiAgICAgICAgICAgIC8vIHRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tOb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbmV3LXRhc2stYnRuXCIpO1xuICAgICAgICAgICAgbmV3VGFza0J0bi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmViZWdpblwiLCB0YXNrTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfYWRkTmV3VGFza0J0bihwcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGFza3NcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmV3LXRhc2stYnRuXCIsIFwicm93LWNvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfY3VycmVudFByb2plY3QgPT09IFwiVG9kYXlcIikge1xuICAgICAgICAgICAgICAgICAgICBfdXBkYXRlRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgX3ByZWRlZmluZUZvcm1Qcm9qZWN0KFwiSW5ib3hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9wcmVkZWZpbmVGb3JtRGF0ZShEYXRlRm9ybWF0dGVyLmdldEhUTUw1RGF0ZShuZXcgRGF0ZSgpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZUZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wcmVkZWZpbmVGb3JtUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgX3RvZ2dsZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRhc2tzLmFwcGVuZENoaWxkKGJ0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBpbWcuc3JjID0gXCIuL2Fzc2V0cy9wbHVzLWJsdWUucG5nXCI7XG4gICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmV3LXRhc2stcGx1cy1pbWdcIik7XG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoaW1nKTtcblxuICAgICAgICAgICAgY29uc3QgYnRuVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgYnRuVGV4dC5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1uZXctdGFzay10ZXh0XCIpO1xuICAgICAgICAgICAgYnRuVGV4dC50ZXh0Q29udGVudCA9IFwiQWRkIHRhc2tcIjtcbiAgICAgICAgICAgIGJ0bi5hcHBlbmRDaGlsZChidG5UZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNwbGF5QWxsKHByb2plY3ROYW1lLCB0YXNrc0RhdGEpIHtcbiAgICAgICAgICAgIF9kaXNwbGF5V2luZG93KHByb2plY3ROYW1lKTsgICBcbiAgICAgICAgICAgIF9hZGROZXdUYXNrQnRuKHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIF9kaXNwbGF5VGFza3ModGFza3NEYXRhLCBwcm9qZWN0TmFtZSA9PT0gXCJUb2RheVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBfY3VycmVudFByb2plY3Q7XG4gICAgICAgIGxldCBfY3VycmVudFRhc2tzRGF0YTtcblxuICAgICAgICBmdW5jdGlvbiBnZXRDdXJyZW50UHJvamVjdCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfY3VycmVudFByb2plY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRDdXJyZW50UHJvamVjdChuZXdQcm9qZWN0TmFtZSkge1xuICAgICAgICAgICAgX2N1cnJlbnRQcm9qZWN0ID0gbmV3UHJvamVjdE5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVDdXJyZW50UHJvamVjdCgpIHtcbiAgICAgICAgICAgIF9jdXJyZW50VGFza3NEYXRhID0gc3RvcmFnZVV0aWxzLmdldFByb2plY3QoX2N1cnJlbnRQcm9qZWN0KS50YXNrcztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgX2Rpc3BsYXlBbGwoX2N1cnJlbnRQcm9qZWN0LCBfY3VycmVudFRhc2tzRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0V2luZG93KHByb2plY3ROYW1lLCB0YXNrc0RhdGEpIHtcbiAgICAgICAgICAgIF9jdXJyZW50UHJvamVjdCA9IHByb2plY3ROYW1lO1xuICAgICAgICAgICAgX2Rpc3BsYXlBbGwocHJvamVjdE5hbWUsIHRhc2tzRGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaW5pdFdpbmRvdywgXG4gICAgICAgICAgICBnZXRDdXJyZW50UHJvamVjdCwgXG4gICAgICAgICAgICBzZXRDdXJyZW50UHJvamVjdCxcbiAgICAgICAgICAgIHVwZGF0ZUN1cnJlbnRQcm9qZWN0LFxuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICByZXR1cm4ge1NpZGViYXIsIEhlYWRlciwgUHJvamVjdFdpbmRvdywgbG9hZH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBVSUxvYWRlcjsiLCJjb25zdCBEYXRlRm9ybWF0dGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIC8qIEZvcm1hdHMgZGF0ZSB0byBsb29rIGxpa2UgRmViIDIsIDIwMjIgKi9cbiAgICBmdW5jdGlvbiBmb3JtYXQoZGF0ZSkge1xuICAgICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG5cbiAgICAgICAgcmV0dXJuIGAke21vbnRoc1tkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RGF0ZSgpfSwgJHtkYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIVE1MNURhdGUoZGF0ZSkge1xuICAgICAgICBsZXQgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xuICAgICAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIGxldCB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXG4gICAgICAgIGlmIChtb250aCA8IDEwKSB7XG4gICAgICAgICAgICBtb250aCA9IGAwJHttb250aH1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRheSA8IDEwKSB7XG4gICAgICAgICAgICBkYXkgPSBgMCR7ZGF5fWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoeWVhciA8IDEwKSB7XG4gICAgICAgICAgICB5ZWFyID0gYDAwMCR7eWVhcn1gO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHllYXIgPCAxMDApIHtcbiAgICAgICAgICAgIHllYXIgPSBgMDAke3llYXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5ZWFyIDwgMTAwMCkge1xuICAgICAgICAgICAgeWVhciA9IGAwJHt5ZWFyfWA7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xuICAgIH1cblxuICAgIHJldHVybiB7Zm9ybWF0LCBnZXRIVE1MNURhdGV9O1xufSkoKTtcblxuY29uc3Qgc3RvcmFnZVV0aWxzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHN0b3JhZ2UgPSB7XG4gICAgICAgIFwicHJvamVjdHNEYXRhXCI6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c0RhdGFcIikpIHx8IHt9LFxuICAgICAgICAvLyBcIlRvZGF5XCI6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUb2RheVwiKSkgfHwgW11cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRJbmJveCA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkluYm94XCIsXG4gICAgICAgICAgICBcInRhc2tzXCI6IFtcblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0b3JhZ2UucHJvamVjdHNEYXRhIFxuICAgICAgICAgICAgJiYgT2JqZWN0LmtleXMoc3RvcmFnZS5wcm9qZWN0c0RhdGEpLmxlbmd0aCA9PT0gMCBcbiAgICAgICAgICAgICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzdG9yYWdlLnByb2plY3RzRGF0YSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcblxuICAgICAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbXCJJbmJveFwiXSA9IGRlZmF1bHRJbmJveDtcbiAgICAgICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF91cGRhdGVMb2NhbFN0b3JhZ2Uoa2V5KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVtrZXldKSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgY2xhc3MgUHJvamVjdCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tcIm5hbWVcIl0gPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRoaXNbXCJ0YXNrc1wiXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgICAgICBzdG9yYWdlLnByb2plY3RzRGF0YVtuYW1lXSA9IHByb2plY3Q7XG5cbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICAgICAgY2xhc3MgVGFzayB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpc1tcInRpdGxlXCJdID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpc1tcImRlc2NyaXB0aW9uXCJdID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgaWYgKGRhdGUpIHRoaXNbXCJkYXRlXCJdID0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoZGF0ZSkpO1xuICAgICAgICAgICAgICAgIHRoaXNbXCJwcmlvcml0eVwiXSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgICAgIHRoaXNbXCJwcm9qZWN0XCJdID0gcHJvamVjdDtcbiAgICAgICAgICAgICAgICB0aGlzW1wiaW5kZXhcIl0gPSBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdW3Byb2plY3RdW1widGFza3NcIl0uaW5kZXhPZih0aGlzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0RGF0ZShkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9ICBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZShkKSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhpc1tcImRhdGVcIl0gPSBkYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgICAgICBzdG9yYWdlLnByb2plY3RzRGF0YVtwcm9qZWN0XVtcInRhc2tzXCJdLnB1c2godGFzayk7XG5cbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3QsIGluZGV4KSB7XG4gICAgICAgIHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl1bcHJvamVjdF0udGFza3Muc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICBfdXBkYXRlTG9jYWxTdG9yYWdlKFwicHJvamVjdHNEYXRhXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2plY3QobmFtZSkge1xuICAgICAgICBkZWxldGUgc3RvcmFnZVtcInByb2plY3RzRGF0YVwiXVtuYW1lXTtcbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl1bbmFtZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9kYXlUYXNrcygpIHtcbiAgICAgICAgY29uc3QgdG9kYXlUYXNrcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBnZXRQcm9qZWN0QWxsKCkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gZ2V0UHJvamVjdEFsbCgpW3Byb2plY3RdW1widGFza3NcIl07XG5cbiAgICAgICAgICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IHRhc2suZGF0ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0b2RheSA9PT0gdGFza0RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9kYXlUYXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRvZGF5VGFza3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaW5pdCwgXG4gICAgICAgIGFkZFByb2plY3QsXG4gICAgICAgIHJlbW92ZVByb2plY3QsIFxuICAgICAgICBhZGRUYXNrLFxuICAgICAgICByZW1vdmVUYXNrLCBcbiAgICAgICAgZ2V0VG9kYXlUYXNrcywgXG4gICAgICAgIGdldFByb2plY3QsIFxuICAgICAgICBnZXRQcm9qZWN0QWxsLFxuICAgIH07XG59KSgpO1xuXG5leHBvcnQge0RhdGVGb3JtYXR0ZXIsIHN0b3JhZ2VVdGlsc307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgVUlMb2FkZXIgZnJvbSBcIi4vdWktbG9hZGVyXCJcbmltcG9ydCB7c3RvcmFnZVV0aWxzfSBmcm9tIFwiLi91dGlsc1wiXG5cbnN0b3JhZ2VVdGlscy5pbml0KCk7XG5VSUxvYWRlci5sb2FkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9