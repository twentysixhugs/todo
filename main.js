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

                const projects = document.querySelector("#projects");
                projects.classList.remove("hidden");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7OztVQzFKRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rQztBQUNFOztBQUVwQyxxREFBaUI7QUFDakIsdURBQWEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvdWktbG9hZGVyLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogV2hlbiBJIHdhcyBidWlsZGluZyBpdCwgSSBvbmx5IHN0YXJ0ZWQgdG8gbGVhcm4gdG8gd3JpdGUgbW9yZSBvciBsZXNzIGNsZWFuIENTUyBhbmQgSFRNTCBDb2RlICovXG4vKiBUbyB0aGF0IGVuZCwgdGhlcmUgYXJlIG1hbnkgbG9uZywgY2hhaW5lZCBhbmQgY29tcGxldGVseSB1bnJlYWRhYmxlIHNlbGVjdG9ycyAqL1xuLyogdGhhdCBJJ20gYXdhcmUgb2YuIEhvd2V2ZXIsIGluc3RlYWQgb2YgcmV3cml0aW5nLCBJIGNob3NlIHRvIGdvIGZvcndhcmQgYW5kICovXG4vKiBtYWtlIHN1cmUgSSBkb24ndCByZXBlYXQgc3VjaCBtaXN0YWtlcyBpbiB0aGUgZnV0dXJlLiAqL1xuXG5pbXBvcnQge0RhdGVGb3JtYXR0ZXJ9IGZyb20gXCIuL3V0aWxzLmpzXCJcbmltcG9ydCB7c3RvcmFnZVV0aWxzfSBmcm9tIFwiLi91dGlscy5qc1wiXG5cbmNvbnN0IFVJTG9hZGVyID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgLyogVXRpbGl0eSBmdW5jdGlvbnMgKi9cbiAgICBjb25zdCBfY3JlYXRlQ29udGFpbmVyID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHtkaXJlY3Rpb259LWNvbnRhaW5lcmApO1xuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgY29uc3QgX3JlbW92ZUFsbENoaWxkTm9kZXMgPSBmdW5jdGlvbihwYXJlbnQpIHtcbiAgICAgICAgd2hpbGUgKHBhcmVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQocGFyZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyogT24gcGFnZWxvYWQgKi9cblxuICAgIGZ1bmN0aW9uIGxvYWQoKSB7XG4gICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG4gICAgICAgIFNpZGViYXIuYWRkRXZlbnRUb1RvZGF5KCk7XG4gICAgICAgIFNpZGViYXIuYWRkRXZlbnRUb0luYm94KCk7XG4gICAgICAgIFNpZGViYXIuYWRkTmV3UHJvamVjdEV2ZW50KCk7XG4gICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuICAgICAgICBfY3JlYXRlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgSGVhZGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICAvKiBGb3JtcyAqL1xuXG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3VGFza0Zvcm0oKSB7XG4gICAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staW5wdXQtYmFja2dyb3VuZFwiKTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKFwiZm9ybS10YXNrLWlucHV0XCIsIFwicm93LWNvbnRhaW5lclwiKTtcbiAgICAgICAgYmFja2dyb3VuZC5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgICBjb25zdCBmaWVsZFNldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWVsZHNldFwiKTtcbiAgICAgICAgZmllbGRTZXQuY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtZGF0YS1maWVsZHNldFwiLCBcImNvbC1jb250YWluZXJcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRTZXQpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5Q2xvc2VQcm9qZWN0ID0gX2NyZWF0ZUNvbnRhaW5lcihcImNvbFwiKTtcbiAgICAgICAgcHJpb3JpdHlDbG9zZVByb2plY3QuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LWNsb3NlLXByb2plY3RcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQocHJpb3JpdHlDbG9zZVByb2plY3QpO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGNsb3NlLmNsYXNzTGlzdC5hZGQoXCJjbG9zZS10YXNrLWlucHV0LWZvcm1cIik7XG4gICAgICAgIGNsb3NlLnRleHRDb250ZW50ID0gXCLDl1wiO1xuXG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBfdG9nZ2xlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICAgICAgLyogZm9ybS5yZXNldCgpOyAqL1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHByaW9yaXR5Q2xvc2VQcm9qZWN0LmFwcGVuZENoaWxkKGNsb3NlKTtcblxuICAgICAgICBjb25zdCBwcmlvcml0eVByb2plY3QgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICBwcmlvcml0eVByb2plY3QuY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LWFuZC1wcm9qZWN0XCIpO1xuICAgICAgICBwcmlvcml0eUNsb3NlUHJvamVjdC5hcHBlbmRDaGlsZChwcmlvcml0eVByb2plY3QpO1xuXG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gX2NyZWF0ZUZvcm1Ecm9wZG93bihcInByaW9yaXR5XCIpO1xuICAgICAgICBwcmlvcml0eVByb2plY3QuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBfY3JlYXRlRm9ybURyb3Bkb3duKFwicHJvamVjdFwiKTtcbiAgICAgICAgcHJpb3JpdHlQcm9qZWN0LmFwcGVuZENoaWxkKHByb2plY3QpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJUYXNrIG5hbWVcIik7XG4gICAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LXRpdGxlXCIpO1xuXG4gICAgICAgIGNvbnN0IGVtcHR5VGl0bGVXYXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGVtcHR5VGl0bGVXYXJuaW5nLmNsYXNzTGlzdC5hZGQoXCJlbXB0eS10aXRsZS13YXJuaW5nXCIpO1xuICAgICAgICBlbXB0eVRpdGxlV2FybmluZy50ZXh0Q29udGVudCA9IFwiUGxlYXNlLCBmaWxsIG91dCB0YXNrIG5hbWVcIlxuXG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBlbXB0eVRpdGxlV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgICAgZmllbGRTZXQuYXBwZW5kQ2hpbGQoZW1wdHlUaXRsZVdhcm5pbmcpO1xuXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1pbnB1dC1kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiRGVzY3JpcHRpb25cIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBkYXRlLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgICAgICBkYXRlLmNsYXNzTGlzdC5hZGQoXCJkYXRlLXRhc2staW5wdXRcIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGRhdGUpO1xuXG4gICAgICAgIGNvbnN0IGZvcm1BY3Rpb25zID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgZm9ybUFjdGlvbnMuY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtZm9ybS1hY3Rpb25zXCIpO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZChmb3JtQWN0aW9ucyk7XG5cbiAgICAgICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcInRhc2staW5wdXQtY29uZmlybVwiKTtcbiAgICAgICAgY29uZmlybUJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25maXJtQnRuLnRleHRDb250ZW50ID0gXCJBZGQgdGFza1wiO1xuXG4gICAgICAgIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGl0bGUudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbXB0eVRpdGxlV2FybmluZy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdG9yYWdlVXRpbHMuYWRkVGFzayhcbiAgICAgICAgICAgICAgICB0aXRsZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICBkYXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Lmxhc3RDaGlsZC52YWx1ZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0Lmxhc3RDaGlsZC52YWx1ZVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0Lmxhc3RDaGlsZC52YWx1ZSA9PT0gUHJvamVjdFdpbmRvdy5nZXRDdXJyZW50UHJvamVjdCgpKSB7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy51cGRhdGVDdXJyZW50UHJvamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoZGF0ZS52YWx1ZSkpID09PSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKVxuICAgICAgICAgICAgJiYgUHJvamVjdFdpbmRvdy5nZXRDdXJyZW50UHJvamVjdCgpID09PSBcIlRvZGF5XCIpIHsgLy8gaWYgdGFzayBpcyBzZXQgdG8gdG9kYXkgYW5kIHRvZGF5IGlzIG9wZW5lZFxuICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBTaWRlYmFyLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAvKiBmb3JtLnJlc2V0KCkgKi87XG4gICAgICAgICAgICBfdG9nZ2xlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybUFjdGlvbnMuYXBwZW5kQ2hpbGQoY29uZmlybUJ0bik7XG5cbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWlucHV0LWNhbmNlbFwiKTtcbiAgICAgICAgY2FuY2VsQnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG5cbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBlbXB0eVRpdGxlV2FybmluZy5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtQWN0aW9ucy5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9wcmVkZWZpbmVGb3JtUHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtZHJvcGRvd24taW5wdXRcIik7XG4gICAgICAgIHByb2plY3RJbnB1dC52YWx1ZSA9IHByb2plY3ROYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9wcmVkZWZpbmVGb3JtRGF0ZShIVE1MNURhdGVJbnB1dFZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHRhc2tEYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRhdGUtdGFzay1pbnB1dFwiKTtcblxuICAgICAgICB0YXNrRGF0ZUlucHV0LnZhbHVlID0gSFRNTDVEYXRlSW5wdXRWYWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdXBkYXRlRm9ybURhdGEoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1pbnB1dC1iYWNrZ3JvdW5kXCIpLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgX2NyZWF0ZU5ld1Rhc2tGb3JtKCk7XG4gICAgICAgIF9wcmVkZWZpbmVGb3JtUHJvamVjdChcIkluYm94XCIpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3UHJvamVjdEZvcm0oKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cyB1bFwiKTtcblxuICAgICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImNvbC1jb250YWluZXJcIiwgXCJuZXctcHJvamVjdFwiKTtcbiAgICAgICAgcHJvamVjdHMuYXBwZW5kQ2hpbGQobGkpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoXCJuZXctcHJvamVjdC1pbnB1dFwiLCBcImNvbC1jb250YWluZXJcIik7XG4gICAgICAgIGxpLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IG5hbWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgbmFtZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0XCIpO1xuICAgICAgICBuYW1lSW5wdXQuY2xhc3NMaXN0LmFkZChcIm5ldy1wcm9qZWN0LWlucHV0LW5hbWVcIik7XG4gICAgICAgIFxuXG4gICAgICAgIGNvbnN0IGVtcHR5TmFtZVdhcm5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgZW1wdHlOYW1lV2FybmluZy5jbGFzc0xpc3QuYWRkKFwiZW1wdHktdGl0bGUtd2FybmluZ1wiKTtcbiAgICAgICAgZW1wdHlOYW1lV2FybmluZy50ZXh0Q29udGVudCA9IFwiUGxlYXNlLCBmaWxsIG91dCBwcm9qZWN0IG5hbWVcIjtcblxuICAgICAgICBjb25zdCBub3RVbmlxdWVOYW1lV2FybmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBub3RVbmlxdWVOYW1lV2FybmluZy5jbGFzc0xpc3QuYWRkKFwiZW1wdHktdGl0bGUtd2FybmluZ1wiKTtcbiAgICAgICAgbm90VW5pcXVlTmFtZVdhcm5pbmcudGV4dENvbnRlbnQgPSBcIlBsZWFzZSwgZW50ZXIgYSB1bmlxdWUgcHJvamVjdCBuYW1lXCI7XG5cbiAgICAgICAgbmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBlbXB0eU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICAgICAgbm90VW5pcXVlTmFtZVdhcm5pbmcuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQobmFtZUlucHV0KTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChlbXB0eU5hbWVXYXJuaW5nKTtcbiAgICAgICAgZm9ybS5hcHBlbmRDaGlsZChub3RVbmlxdWVOYW1lV2FybmluZyk7XG5cbiAgICAgICAgY29uc3QgYnV0dG9uc0NvbnRhaW5lciA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgIGJ1dHRvbnNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm5ldy1wcm9qZWN0LWFjdGlvbnNcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnV0dG9uc0NvbnRhaW5lcik7XG5cbiAgICAgICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcInByb2plY3QtaW5wdXQtY29uZmlybVwiKTtcbiAgICAgICAgY29uZmlybUJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICBjb25maXJtQnRuLnRleHRDb250ZW50ID0gXCJBZGQgcHJvamVjdFwiO1xuXG4gICAgICAgIGNvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghbmFtZUlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZW1wdHlOYW1lV2FybmluZy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzID0gc3RvcmFnZVV0aWxzLmdldFByb2plY3RBbGwoKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9qZWN0IGluIHByb2plY3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3RzW3Byb2plY3RdLm5hbWUgPT09IG5hbWVJbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBub3RVbmlxdWVOYW1lV2FybmluZy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5hbWVJbnB1dC52YWx1ZSA9PT0gXCJUb2RheVwiKSB7XG4gICAgICAgICAgICAgICAgbm90VW5pcXVlTmFtZVdhcm5pbmcuY2xhc3NMaXN0LmFkZChcInNob3dcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdG9yYWdlVXRpbHMuYWRkUHJvamVjdChuYW1lSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgX3RvZ2dsZU5ld1Byb2plY3RGb3JtKCk7XG4gICAgICAgICAgICAvKiBmb3JtLnJlc2V0KCk7ICovXG4gICAgICAgICAgICBTaWRlYmFyLnVwZGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBidXR0b25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbmZpcm1CdG4pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1pbnB1dC1jYW5jZWxcIik7XG4gICAgICAgIGNhbmNlbEJ0bi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSBcIkNhbmNlbFwiO1xuXG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgX3RvZ2dsZU5ld1Byb2plY3RGb3JtKCk7XG4gICAgICAgICAgICBlbXB0eU5hbWVXYXJuaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIF90b2dnbGVOZXdUYXNrRm9ybSgpIHtcbiAgICAgICAgY29uc3QgZm9ybUJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2staW5wdXQtYmFja2dyb3VuZFwiKTtcbiAgICAgICAgZm9ybUJhY2tncm91bmQuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3RvZ2dsZU5ld1Byb2plY3RGb3JtKCkge1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctcHJvamVjdFwiKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbiAgICB9XG5cbiAgICAvKiBHZW5lcmFsICovXG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlRm9ybURyb3Bkb3duKGlucHV0KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGAke2lucHV0fS1pbnB1dC1jb250YWluZXJgKTtcblxuICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIGAke2lucHV0fS1kcm9wZG93bi1pbnB1dGApO1xuICAgICAgICBsYWJlbC50ZXh0Q29udGVudCA9IGAke2lucHV0LnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpbnB1dC5zbGljZSgxKX06YDsgLy9jYXBpdGFsaXplIGZpcnN0IGxldHRlclxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlbGVjdFwiKTtcbiAgICAgICAgZHJvcGRvd24uaWQgPSBgJHtpbnB1dH0tZHJvcGRvd24taW5wdXRgO1xuICAgICAgICBkcm9wZG93bi5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIGAke2lucHV0fWApO1xuICAgICAgICBkcm9wZG93bi5jbGFzc0xpc3QuYWRkKGAke2lucHV0fS1kcm9wZG93bi1pbnB1dGApO1xuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZHJvcGRvd24pO1xuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gXCJwcm9qZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzRGF0YSA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0QWxsKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBwcm9qZWN0c0RhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBwcm9qT3B0aW9uLmNsYXNzTGlzdC5hZGQoXCJkcm9wZG93bi1vcHRpb25cIik7XG4gICAgICAgICAgICAgICAgcHJvak9wdGlvbi52YWx1ZSA9IHByb2plY3RzRGF0YVtwcm9qZWN0XVtcIm5hbWVcIl07XG4gICAgICAgICAgICAgICAgcHJvak9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3RzRGF0YVtwcm9qZWN0XVtcIm5hbWVcIl07XG5cbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChwcm9qT3B0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dCA9PT0gXCJwcmlvcml0eVwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvck9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgcHJpb3JPcHRpb24uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LW9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi52YWx1ZSA9IGk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2goaSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi50ZXh0Q29udGVudCA9IFwiTG93XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JPcHRpb24udGV4dENvbnRlbnQgPSBcIk1lZGl1bVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzogXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmlvck9wdGlvbi50ZXh0Q29udGVudCA9IFwiVXJnZW50XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBkcm9wZG93bi5hcHBlbmRDaGlsZChwcmlvck9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgY29uc3QgU2lkZWJhciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByb2plY3QobmFtZSwgdGFza3NDb3VudCkge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiLCBcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgICAgICBsaS5kYXRhc2V0LnByb2plY3QgPSBuYW1lO1xuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFza3MuY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzaG93XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgICAgICAgICAgICB0YXNrcy5jbGFzc0xpc3QuYWRkKFwic2hvd1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KG5hbWUsIHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0KG5hbWUpLnRhc2tzKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgICAgICAgY29uc3QgdGFza3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHRhc2tzLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LXRhc2tzLWNvdW50XCIsIFwic2hvd1wiKTtcbiAgICAgICAgICAgIHRhc2tzLnRleHRDb250ZW50ID0gdGFza3NDb3VudDtcbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKHRhc2tzKTtcblxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS1wcm9qZWN0LWJ0blwiKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiw5dcIjtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgc3RvcmFnZVV0aWxzLnJlbW92ZVByb2plY3QobmFtZSk7XG4gICAgICAgICAgICAgICAgU2lkZWJhci51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgIGlmIChQcm9qZWN0V2luZG93LmdldEN1cnJlbnRQcm9qZWN0KCkgPT09IG5hbWUpIHsgLy8gaWYgY3VycmVudGx5IG9wZW5lZCBwcm9qZWN0IGlzIHRoZSBvbmUgZGVsZXRlZFxuICAgICAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LnNldEN1cnJlbnRQcm9qZWN0KFwiSW5ib3hcIik7XG4gICAgICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cudXBkYXRlQ3VycmVudFByb2plY3QoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFByb2plY3RXaW5kb3cuZ2V0Q3VycmVudFByb2plY3QoKSA9PT0gXCJUb2RheVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGkuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgY29sb3JJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIGNvbG9ySWNvbi5jbGFzc0xpc3QuYWRkKFwiY2lyY2xlXCIpO1xuICAgICAgICAgICAgY29sb3JJY29uLmFsdCA9IFwiXCI7XG4gICAgICAgICAgICBjb2xvckljb24uc3JjPSBcIi4vYXNzZXRzL2NpcmNsZS5wbmdcIjtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xvckljb24pO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgcHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZChcIm1lbnUtcHJvamVjdC1uYW1lXCIpO1xuICAgICAgICAgICAgcHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuXG5cbiAgICAgICAgICAgIHJldHVybiBsaTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFByb2plY3QobmFtZSwgdGFza3NDb3VudCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IF9jcmVhdGVQcm9qZWN0KG5hbWUsIHRhc2tzQ291bnQpO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzIHVsXCIpO1xuICAgICAgICAgICAgcHJvamVjdHNMaXN0LmFwcGVuZENoaWxkKHByb2plY3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlU2hvdygpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NpZGViYXJcIik7XG4gICAgICAgICAgICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRFdmVudHNUb1Byb2plY3RzIChwcm9qZWN0c0RhdGEpIHtcblxuICAgICAgICAgICAgLyogdXNlIGV2ZW50IGRlbGVnYXRpb24gZm9yIGFsbCB1c2VyLWNyZWF0ZWQgc2lkZWJhciBwcm9qZWN0cyAqL1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cyB1bFwiKTtcbiAgICAgICAgICAgIHByb2plY3RzTGlzdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gZS50YXJnZXQuY2xvc2VzdChcIi5wcm9qZWN0XCIpO1xuXHRcdFx0XHRpZiAoIXByb2plY3QpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdC5kYXRhc2V0LnByb2plY3Q7XG5cdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgaWYgKHByb2plY3RzRGF0YVtwcm9qZWN0TmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KHByb2plY3ROYW1lLCBwcm9qZWN0c0RhdGFbcHJvamVjdE5hbWVdLnRhc2tzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7Y2FwdHVyZTogdHJ1ZX0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRFdmVudFRvVG9kYXkoKSB7XG4gICAgICAgICAgICBjb25zdCB0b2RheUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0W2RhdGEtcHJvamVjdD1cIlRvZGF5XCJdJyk7XG5cbiAgICAgICAgICAgIHRvZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRFdmVudFRvSW5ib3goKSB7XG4gICAgICAgICAgICBjb25zdCBpbmJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXByb2plY3RzIC5wcm9qZWN0W2RhdGEtcHJvamVjdD1cIkluYm94XCJdJyk7XG4gICAgICAgICAgICBpbmJveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIkluYm94XCIsIHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0KFwiSW5ib3hcIikudGFza3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGROZXdQcm9qZWN0RXZlbnQoKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctcHJvamVjdFwiKTtcblxuICAgICAgICAgICAgbmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdQcm9qZWN0Rm9ybSgpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xuICAgICAgICAgICAgICAgIHByb2plY3RzLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG5cbiAgICAgICAgICAgIF9yZW1vdmVBbGxDaGlsZE5vZGVzKHByb2plY3RzTGlzdCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzRGF0YSA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0QWxsKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBwcm9qZWN0c0RhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvamVjdHNEYXRhW3Byb2plY3RdLm5hbWUgIT09IFwiSW5ib3hcIikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrc0NvdW50ID0gcHJvamVjdHNEYXRhW3Byb2plY3RdLnRhc2tzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RzRGF0YVtwcm9qZWN0XS5uYW1lLCB0YXNrc0NvdW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF9jcmVhdGVOZXdQcm9qZWN0Rm9ybSgpO1xuXG4gICAgICAgICAgICBjb25zdCBzaG93bkluYm94VGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFtkYXRhLXByb2plY3Q9XFxcIkluYm94XFxcIl0gLnByb2plY3QtdGFza3MtY291bnRcIik7XG4gICAgICAgICAgICBjb25zdCBzaG93blRvZGF5VGFza3NDb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdFtkYXRhLXByb2plY3Q9XFxcIlRvZGF5XFxcIl0gLnByb2plY3QtdGFza3MtY291bnRcIik7XG5cbiAgICAgICAgICAgIHNob3duSW5ib3hUYXNrc0NvdW50LnRleHRDb250ZW50ID0gcHJvamVjdHNEYXRhW1wiSW5ib3hcIl0udGFza3MubGVuZ3RoO1xuICAgICAgICAgICAgc2hvd25Ub2RheVRhc2tzQ291bnQudGV4dENvbnRlbnQgPSBzdG9yYWdlVXRpbHMuZ2V0VG9kYXlUYXNrcygpLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gYWRkRXZlbnRzVG9Qcm9qZWN0cyhwcm9qZWN0c0RhdGEpO1xuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIChmdW5jdGlvbiBfZW5hYmxlUHJvamVjdHNEcm9wZG93bigpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1tZW51IC5vcGVuLWRyb3Bkb3duXCIpO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZHJvcGRvd25JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLW1lbnUgLm9wZW4tZHJvcGRvd24gaW1nXCIpO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duSW1nLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWRkUHJvamVjdCwgXG4gICAgICAgICAgICB0b2dnbGVTaG93LCBcbiAgICAgICAgICAgIGFkZEV2ZW50c1RvUHJvamVjdHMsIFxuICAgICAgICAgICAgYWRkRXZlbnRUb1RvZGF5LFxuICAgICAgICAgICAgYWRkRXZlbnRUb0luYm94LFxuICAgICAgICAgICAgYWRkTmV3UHJvamVjdEV2ZW50LCBcbiAgICAgICAgICAgIHVwZGF0ZSxcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgY29uc3QgSGVhZGVyID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2J1aWxkIHRvZ2dsZSBzaWRlYmFyIGJ1dHRvbiwgd2lyZSBpdCB0byB0aGUgcHJpdmF0ZSBtZXRob2Qgb2YgU2lkZWJhclxuICAgICAgICBjb25zdCB0b2dnbGVTaWRlYmFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b2dnbGUtc2lkZWJhclwiKTtcbiAgICAgICAgdG9nZ2xlU2lkZWJhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtTaWRlYmFyLnRvZ2dsZVNob3coKX0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIF9pbml0TmV3VGFza0J0bigpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2stYnRuXCIpO1xuXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJodWdcIik7XG5cbiAgICAgICAgICAgICAgICBfdXBkYXRlRm9ybURhdGEoKTtcblxuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBfaW5pdE5ld1Rhc2tCdG4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aW5pdH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IFByb2plY3RXaW5kb3cgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9kaXNwbGF5V2luZG93KHByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1jb250ZW50XCIpO1xuICAgICAgICAgICAgX3JlbW92ZUFsbENoaWxkTm9kZXMocHJvamVjdENvbnRlbnQpO1xuICAgICAgICAgICAgLy8gcHJvamVjdENvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIuaWQgPSBcInByb2plY3QtaGVhZGVyXCI7XG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy5pZCA9IFwicHJvamVjdC1uYW1lLWhlYWRpbmdcIjtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lSGVhZGluZyk7XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gXCJUb2RheVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICBzcGFuLmlkID0gXCJwcm9qZWN0LWN1cnJlbnQtZGF0ZVwiO1xuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0b2RheTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcImNvbFwiKTtcbiAgICAgICAgICAgIHRhc2tzQ29udGFpbmVyLmlkID0gXCJwcm9qZWN0LXRhc2tzXCI7XG5cbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIGZ1bmN0aW9uIF9jcmVhdGVUYXNrKHRhc2tJbmZvLCBpbmRleCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBfdGFzayA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBfdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgICAgICAgIF90YXNrLmRhdGFzZXQucHJvamVjdCA9IHRhc2tJbmZvLnByb2plY3Q7XG4gICAgICAgICAgICBfdGFzay5kYXRhc2V0LmluZGV4ID0gaW5kZXg7XG5cblxuICAgICAgICAgICAgY29uc3QgX3JlbW92ZVRhc2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC10YXNrc1wiKTtcblxuICAgICAgICAgICAgICAgIHRhc2tzQ29udGFpbmVyLnJlbW92ZUNoaWxkKF90YXNrKTtcblxuICAgICAgICAgICAgICAgIHN0b3JhZ2VVdGlscy5yZW1vdmVUYXNrKHRhc2tJbmZvLnByb2plY3QsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgIFNpZGViYXIudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy51cGRhdGVDdXJyZW50UHJvamVjdCgpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tNYWluID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5jbGFzc0xpc3QuYWRkKFwidGFzay1tYWluXCIpO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IF9jb21wbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgX2NvbXBsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGUtdGFzay1idG5cIiwgYHRhc2stcHJpb3JpdHktJHt0YXNrSW5mby5wcmlvcml0eX1gKTtcblxuICAgICAgICAgICAgX2NvbXBsZXRlVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX3JlbW92ZVRhc2spO1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza0NvbnRlbnQgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNvbnRlbnRcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgICAgICAgIF90YXNrTmFtZS5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgICAgICAgICAgX3Rhc2tOYW1lLnRleHRDb250ZW50ID0gdGFza0luZm8udGl0bGU7XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgIF90YXNrRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stZGVzY3JpcHRpb25cIik7XG4gICAgICAgICAgICBfdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFza0luZm8uZGVzY3JpcHRpb247XG5cbiAgICAgICAgICAgIGNvbnN0IF90YXNrRGF0ZSA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBfdGFza0RhdGUuY2xhc3NMaXN0LmFkZChcInRhc2stZGF0ZVwiKTtcblxuICAgICAgICAgICAgY29uc3QgX2NhbGVuZGFySW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgIF9jYWxlbmRhckltZy5zcmMgPSBcIi4vYXNzZXRzL2NhbGVuZGFyLnBuZ1wiO1xuICAgICAgICAgICAgX2NhbGVuZGFySW1nLmFsdCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IF9kYXRlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG5cbiAgICAgICAgICAgIGlmICh0YXNrSW5mby5kYXRlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKHRhc2tJbmZvLmRhdGUpKTtcblxuICAgICAgICAgICAgICAgIGlmICh0YXNrRGF0ZSA9PT0gY3VycmVudERhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0b2RheS10ZXh0XCIpO1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQudGV4dENvbnRlbnQgPSBcIlRvZGF5XCI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBfdGFza0RhdGUuYXBwZW5kQ2hpbGQoX2NhbGVuZGFySW1nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfZGF0ZVRleHQuY2xhc3NMaXN0LmFkZChcImRhdGUtdGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LnRleHRDb250ZW50ID0gdGFza0luZm8uZGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IF9jbG9zZUFuZFByb2plY3QgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5jbGFzc0xpc3QuYWRkKFwidGFzay1jbG9zZS1hbmQtcHJvamVjdFwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrXCIpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLnRleHRDb250ZW50ID0gXCLDl1wiO1xuXG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIF9yZW1vdmVUYXNrKTtcblxuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOyAvL3VzZWQgZm9yIHRvZGF5LCBlbXB0eSBpbiBvdGhlciBwcm9qZWN0c1xuICAgICAgICAgICAgcHJvamVjdFNlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2stcHJvamVjdFwiKTtcblxuICAgICAgICAgICAgX3Rhc2suYXBwZW5kQ2hpbGQoX3Rhc2tNYWluKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5hcHBlbmRDaGlsZChfY29tcGxldGVUYXNrQnRuKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5hcHBlbmRDaGlsZChfdGFza0NvbnRlbnQpO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrTmFtZSk7XG4gICAgICAgICAgICBpZiAoX3Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCkgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrRGF0ZSk7XG4gICAgICAgICAgICBfdGFza0RhdGUuYXBwZW5kQ2hpbGQoX2RhdGVUZXh0KTtcbiAgICAgICAgICAgIF90YXNrLmFwcGVuZENoaWxkKF9jbG9zZUFuZFByb2plY3QpO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuICAgICAgICAgICAgX2Nsb3NlQW5kUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0U2VjdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBfdGFzaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gX2Rpc3BsYXlUYXNrcyh0YXNrc0RhdGEsIHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgIHRhc2tzRGF0YS5mb3JFYWNoKCh0YXNrSW5mbywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tOb2RlID0gX2NyZWF0ZVRhc2sodGFza0luZm8sIGkpO1xuICAgICAgICAgICAgICAgIF9zaG93VGFzayh0YXNrTm9kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Nob3dUYXNrUHJvamVjdChpLCB0YXNrSW5mby5wcm9qZWN0KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIHRhc2sgZGVsZXRpb25cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5kZWxldGUtdGFza1wiKSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZUJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge2J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJ9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFza1Byb2plY3QodGFza0luZGV4LCB0YXNrUHJvamVjdCkgeyAvLyBzaG93cyB3aGF0IHByb2plY3QgdGhlIHRhc2sgaXMgYXNzb2NpYXRlZCB3aXRoIChlLmcuIGluIHRvZGF5KVxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhc2tbZGF0YS1pbmRleD1cIiR7dGFza0luZGV4fVwiXSAudGFzay1wcm9qZWN0YCk7XG4gICAgICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSB0YXNrUHJvamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFzayh0YXNrTm9kZSkge1xuICAgICAgICAgICAgLy8gY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGFza3NcIik7XG4gICAgICAgICAgICAvLyB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrTm9kZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LW5ldy10YXNrLWJ0blwiKTtcbiAgICAgICAgICAgIG5ld1Rhc2tCdG4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgdGFza05vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2FkZE5ld1Rhc2tCdG4ocHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LXRhc2tzXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5ldy10YXNrLWJ0blwiLCBcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoX2N1cnJlbnRQcm9qZWN0ID09PSBcIlRvZGF5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3VwZGF0ZUZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgIF9wcmVkZWZpbmVGb3JtUHJvamVjdChcIkluYm94XCIpO1xuICAgICAgICAgICAgICAgICAgICBfcHJlZGVmaW5lRm9ybURhdGUoRGF0ZUZvcm1hdHRlci5nZXRIVE1MNURhdGUobmV3IERhdGUoKSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF91cGRhdGVGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBfcHJlZGVmaW5lRm9ybVByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0YXNrcy5hcHBlbmRDaGlsZChidG4pO1xuXG4gICAgICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgaW1nLnNyYyA9IFwiLi9hc3NldHMvcGx1cy1ibHVlLnBuZ1wiO1xuICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5ldy10YXNrLXBsdXMtaW1nXCIpO1xuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKGltZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ0blRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIGJ0blRleHQuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmV3LXRhc2stdGV4dFwiKTtcbiAgICAgICAgICAgIGJ0blRleHQudGV4dENvbnRlbnQgPSBcIkFkZCB0YXNrXCI7XG4gICAgICAgICAgICBidG4uYXBwZW5kQ2hpbGQoYnRuVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGlzcGxheUFsbChwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfZGlzcGxheVdpbmRvdyhwcm9qZWN0TmFtZSk7ICAgXG4gICAgICAgICAgICBfYWRkTmV3VGFza0J0bihwcm9qZWN0TmFtZSk7XG4gICAgICAgICAgICBfZGlzcGxheVRhc2tzKHRhc2tzRGF0YSwgcHJvamVjdE5hbWUgPT09IFwiVG9kYXlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgX2N1cnJlbnRQcm9qZWN0O1xuICAgICAgICBsZXQgX2N1cnJlbnRUYXNrc0RhdGE7XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0Q3VycmVudFByb2plY3QoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJlbnRQcm9qZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0Q3VycmVudFByb2plY3QobmV3UHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIF9jdXJyZW50UHJvamVjdCA9IG5ld1Byb2plY3ROYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQ3VycmVudFByb2plY3QoKSB7XG4gICAgICAgICAgICBfY3VycmVudFRhc2tzRGF0YSA9IHN0b3JhZ2VVdGlscy5nZXRQcm9qZWN0KF9jdXJyZW50UHJvamVjdCkudGFza3M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIF9kaXNwbGF5QWxsKF9jdXJyZW50UHJvamVjdCwgX2N1cnJlbnRUYXNrc0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFdpbmRvdyhwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfY3VycmVudFByb2plY3QgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgICAgIF9kaXNwbGF5QWxsKHByb2plY3ROYW1lLCB0YXNrc0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGluaXRXaW5kb3csIFxuICAgICAgICAgICAgZ2V0Q3VycmVudFByb2plY3QsIFxuICAgICAgICAgICAgc2V0Q3VycmVudFByb2plY3QsXG4gICAgICAgICAgICB1cGRhdGVDdXJyZW50UHJvamVjdCxcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtTaWRlYmFyLCBIZWFkZXIsIFByb2plY3RXaW5kb3csIGxvYWR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVUlMb2FkZXI7IiwiY29uc3QgRGF0ZUZvcm1hdHRlciA9IChmdW5jdGlvbigpIHtcbiAgICAvKiBGb3JtYXRzIGRhdGUgdG8gbG9vayBsaWtlIEZlYiAyLCAyMDIyICovXG4gICAgZnVuY3Rpb24gZm9ybWF0KGRhdGUpIHtcbiAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4gICAgICAgIHJldHVybiBgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldERhdGUoKX0sICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0SFRNTDVEYXRlKGRhdGUpIHtcbiAgICAgICAgbGV0IG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcblxuICAgICAgICBpZiAobW9udGggPCAxMCkge1xuICAgICAgICAgICAgbW9udGggPSBgMCR7bW9udGh9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXkgPCAxMCkge1xuICAgICAgICAgICAgZGF5ID0gYDAke2RheX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHllYXIgPCAxMCkge1xuICAgICAgICAgICAgeWVhciA9IGAwMDAke3llYXJ9YDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh5ZWFyIDwgMTAwKSB7XG4gICAgICAgICAgICB5ZWFyID0gYDAwJHt5ZWFyfWA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoeWVhciA8IDEwMDApIHtcbiAgICAgICAgICAgIHllYXIgPSBgMCR7eWVhcn1gO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbiAgICB9XG5cbiAgICByZXR1cm4ge2Zvcm1hdCwgZ2V0SFRNTDVEYXRlfTtcbn0pKCk7XG5cbmNvbnN0IHN0b3JhZ2VVdGlscyA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBzdG9yYWdlID0ge1xuICAgICAgICBcInByb2plY3RzRGF0YVwiOiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNEYXRhXCIpKSB8fCB7fSxcbiAgICAgICAgLy8gXCJUb2RheVwiOiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiVG9kYXlcIikpIHx8IFtdXG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0SW5ib3ggPSB7XG4gICAgICAgICAgICBcIm5hbWVcIjogXCJJbmJveFwiLFxuICAgICAgICAgICAgXCJ0YXNrc1wiOiBbXG5cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdG9yYWdlLnByb2plY3RzRGF0YSBcbiAgICAgICAgICAgICYmIE9iamVjdC5rZXlzKHN0b3JhZ2UucHJvamVjdHNEYXRhKS5sZW5ndGggPT09IDAgXG4gICAgICAgICAgICAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc3RvcmFnZS5wcm9qZWN0c0RhdGEpID09PSBPYmplY3QucHJvdG90eXBlKSB7XG5cbiAgICAgICAgICAgIHN0b3JhZ2UucHJvamVjdHNEYXRhW1wiSW5ib3hcIl0gPSBkZWZhdWx0SW5ib3g7XG4gICAgICAgICAgICBfdXBkYXRlTG9jYWxTdG9yYWdlKFwicHJvamVjdHNEYXRhXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdXBkYXRlTG9jYWxTdG9yYWdlKGtleSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KHN0b3JhZ2Vba2V5XSkpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lKSB7XG4gICAgICAgIGNsYXNzIFByb2plY3Qge1xuICAgICAgICAgICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJuYW1lXCJdID0gbmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzW1widGFza3NcIl0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdChuYW1lKTtcbiAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbbmFtZV0gPSBwcm9qZWN0O1xuXG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgICAgIGNsYXNzIFRhc2sge1xuICAgICAgICAgICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCkge1xuICAgICAgICAgICAgICAgIHRoaXNbXCJ0aXRsZVwiXSA9IHRpdGxlO1xuICAgICAgICAgICAgICAgIHRoaXNbXCJkZXNjcmlwdGlvblwiXSA9IGRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIGlmIChkYXRlKSB0aGlzW1wiZGF0ZVwiXSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKGRhdGUpKTtcbiAgICAgICAgICAgICAgICB0aGlzW1wicHJpb3JpdHlcIl0gPSBwcmlvcml0eTtcbiAgICAgICAgICAgICAgICB0aGlzW1wicHJvamVjdFwiXSA9IHByb2plY3Q7XG4gICAgICAgICAgICAgICAgdGhpc1tcImluZGV4XCJdID0gc3RvcmFnZVtcInByb2plY3RzRGF0YVwiXVtwcm9qZWN0XVtcInRhc2tzXCJdLmluZGV4T2YodGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldERhdGUoZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSAgRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoZCkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXNbXCJkYXRlXCJdID0gZGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbcHJvamVjdF1bXCJ0YXNrc1wiXS5wdXNoKHRhc2spO1xuXG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlVGFzayhwcm9qZWN0LCBpbmRleCkge1xuICAgICAgICBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdW3Byb2plY3RdLnRhc2tzLnNwbGljZShpbmRleCwgMSk7XG5cbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgZGVsZXRlIHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl1bbmFtZV07XG4gICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHJldHVybiBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdW25hbWVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3RBbGwoKSB7XG4gICAgICAgIHJldHVybiBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRvZGF5VGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHRvZGF5VGFza3MgPSBbXTtcblxuICAgICAgICBmb3IgKGNvbnN0IHByb2plY3QgaW4gZ2V0UHJvamVjdEFsbCgpKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IGdldFByb2plY3RBbGwoKVtwcm9qZWN0XVtcInRhc2tzXCJdO1xuXG4gICAgICAgICAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvZGF5ID0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSB0YXNrLmRhdGU7XG5cbiAgICAgICAgICAgICAgICBpZiAodG9kYXkgPT09IHRhc2tEYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZGF5VGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2RheVRhc2tzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQsIFxuICAgICAgICBhZGRQcm9qZWN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0LCBcbiAgICAgICAgYWRkVGFzayxcbiAgICAgICAgcmVtb3ZlVGFzaywgXG4gICAgICAgIGdldFRvZGF5VGFza3MsIFxuICAgICAgICBnZXRQcm9qZWN0LCBcbiAgICAgICAgZ2V0UHJvamVjdEFsbCxcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IHtEYXRlRm9ybWF0dGVyLCBzdG9yYWdlVXRpbHN9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJTG9hZGVyIGZyb20gXCIuL3VpLWxvYWRlclwiXG5pbXBvcnQge3N0b3JhZ2VVdGlsc30gZnJvbSBcIi4vdXRpbHNcIlxuXG5zdG9yYWdlVXRpbHMuaW5pdCgpO1xuVUlMb2FkZXIubG9hZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==