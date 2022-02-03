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
    }

    /* Forms */

    const newTaskForm = _createNewTaskForm();
    const newProjectForm = _createNewProjectForm();

    function _createNewTaskForm() {
        const background = document.querySelector(".new-task");

        const form = document.createElement("form");
        form.classList.add("form-new-task", "row-container");
        background.appendChild(form);

        const fieldSet = document.createElement("fieldset");
        fieldSet.classList.add("new-task-data-fieldset", "col-container");
        form.appendChild(fieldSet);

        const closeAndPriority = _createContainer("col");
        closeAndPriority.classList.add("close-and-priority");
        form.appendChild(closeAndPriority);

        const close = document.createElement("span");
        close.classList.add("close-new-task-form");
        close.textContent = "×";

        close.addEventListener("click", () => {
            _toggleNewTaskForm();
            form.reset();
        });

        closeAndPriority.appendChild(close);

        const priority = _createPrioritiesInput();
        closeAndPriority.appendChild(priority);

        const title = document.createElement("input");
        title.setAttribute("type", "text");
        title.setAttribute("placeholder", "Task name")
        title.classList.add("new-task-title");
        fieldSet.appendChild(title);

        const description = document.createElement("input");
        description.classList.add("new-task-description");
        description.setAttribute("type", "text");
        description.setAttribute("placeholder", "Description");
        fieldSet.appendChild(description);

        const extraProps = _createContainer("row");
        extraProps.classList.add("extra-props-new-task");
        fieldSet.appendChild(extraProps);

        const dateProject = _createContainer("row");
        dateProject.classList.add("date-project-new-task");
        extraProps.appendChild(dateProject);

        const date = document.createElement("input");
        date.setAttribute("type", "date");
        date.classList.add("date-new-task");
        dateProject.appendChild(date);

        const project = document.createElement("input");
        project.setAttribute("type", "button");
        project.classList.add("project-new-task");
        dateProject.appendChild(project);

        const formActions = _createContainer("row");
        formActions.classList.add("new-task-form-actions");
        fieldSet.appendChild(formActions);


        //ADD FORM RESET FOR BOTH AND FOR X AS WELL
        const confirmBtn = document.createElement("button");
        confirmBtn.classList.add("new-task-confirm");
        confirmBtn.setAttribute("type", "button");
        confirmBtn.textContent = "Add task";

        confirmBtn.addEventListener("click", () => {
            //const selectedPriority

            _utils_js__WEBPACK_IMPORTED_MODULE_0__.storageUtils.addTask(title.value, description.value, date.value, )
        });

        formActions.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("new-task-cancel");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.textContent = "Cancel";
        formActions.appendChild(cancelBtn);

        return form;
    }

    function _createNewProjectForm() {

    }

    function _toggleNewTaskForm() {
        document.querySelector(".new-task").classList.toggle("show");
    }

    function _toggleNewProjectForm() {

    }

    /* General */

    function _createPrioritiesInput() {
        const _prioritySelection = document.createElement("nav");
        _prioritySelection.classList.add("priority-selection", "row-container");

        /* Create priority buttons and append parent with them*/
        for (let i = 3; i >= 0; i--) {
            const btn = document.createElement("input");
            btn.setAttribute("type", "radio");
            btn.setAttribute("name", "priority");
            btn.id = "priority";
            btn.classList.add("priority-btn", `priority-${i}`, "image-btn");

            const label = document.createElement("label");
            label.setAttribute("for", "priority");
            label.textContent = `Priority ${i}`;

            if (i === 0) {
                btn.setAttribute("checked", "");
            }

            btn.addEventListener("click", () => {
                btn.classList.toggle("priority-selected");
            });

            _prioritySelection.appendChild(label);
            _prioritySelection.appendChild(btn);
            
            const priorityPic = document.createElement("img");
            priorityPic.classList.add(`img-priority-${i}`);
            priorityPic.src = "./assets/flag.png";
            priorityPic.alt = `set priority ${i}`;

            btn.appendChild(priorityPic);
        }

        return _prioritySelection;
    }

    const Sidebar = (function() {
        function _createProject(name, tasksCount) {
            const li = document.createElement("li");
            li.classList.add("project", "row-container");
            li.dataset.project = name;

            const container = _createContainer("row");

            const tasks = document.createElement("span");
            tasks.classList.add("project-tasks-count");
            tasks.textContent = tasksCount;

            li.appendChild(container);
            li.appendChild(tasks);

            const colorIcon = document.createElement("img");
            colorIcon.classList.add("circle");
            colorIcon.alt = "";
            colorIcon.src= "./assets/circle.png";

            const projectName = document.createElement("span");
            projectName.classList.add("menu-project-name");
            projectName.textContent = name;

            container.appendChild(colorIcon);
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
					
                ProjectWindow.initWindow(projectName, projectsData[projectName].tasks);
            });

            /* add to inbox manually. it's always present */
            const inbox = document.querySelector('#main-projects .project[data-project="Inbox"]');
            inbox.addEventListener("click", () => {
                ProjectWindow.initWindow("Inbox", projectsData["Inbox"].tasks);
            })
        }

        function addEventToToday(todayTasks) {
            const todayButton = document.querySelector('.project[data-project="Today"]');

            todayButton.addEventListener('click', () => {
                ProjectWindow.initWindow("Today", todayTasks);
            });
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

        return {addProject, toggleShow, addEventsToProjects, addEventToToday};
    })();

    const Header = (function() {
        //build toggle sidebar button, wire it to the private method of Sidebar
        const toggleSidebarBtn = document.querySelector("#toggle-sidebar");
        toggleSidebarBtn.addEventListener('click', () => {Sidebar.toggleShow()});

        function _initNewTaskBtn() {
            const btn = document.querySelector(".new-task-btn");

            btn.addEventListener('click', () => {
                console.log("hug");
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


            const _taskMain = _createContainer("row");
            _taskMain.classList.add("task-main");


            const _completeTaskBtn = document.createElement("button");
            _completeTaskBtn.classList.add("complete-task-btn", `task-priority-${taskInfo.priority}`);

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

            const _leftSection = _createContainer("col");   

            const projectSection = document.createElement("div"); //used for today, empty in other projects
            projectSection.classList.add("task-project");

            _task.appendChild(_taskMain);
                _taskMain.appendChild(_completeTaskBtn);
                _taskMain.appendChild(_taskContent);
                    _taskContent.appendChild(_taskName);
                    if (_taskDescription.textContent) _taskContent.appendChild(_taskDescription);
                    _taskContent.appendChild(_taskDate);
                        _taskDate.appendChild(_dateText);
            _task.appendChild(_leftSection);
                _leftSection.appendChild(projectSection);

            return _task;
        }


        function _displayTasks(tasksData, todayIsOpened) {
            tasksData.forEach((taskInfo, i) => {
                const taskNode = _createTask(taskInfo, i);
                _showTask(taskNode);
                
                if (todayIsOpened) {
                    _showTaskProject(i, taskInfo.project);
                }
            });
        }

        function _showTaskProject(taskIndex, taskProject) { // shows what project the task is associated with (e.g. in today)
            const container = document.querySelector(`.task[data-index="${taskIndex}"] .task-project`);
            container.textContent = taskProject;
        }

        function _showTask(taskNode) {
            const tasksContainer = document.querySelector("#project-tasks");
            tasksContainer.appendChild(taskNode);
        }

        function _displayAll(projectName, tasksData) {
            _displayWindow(projectName);   
            _displayTasks(tasksData, projectName === "Today");
        }

        function _initEvents(projectName, tasksData) {
            // _initNewTaskBtn(projectName);
        }

        function initWindow(projectName, tasksData) {
            _displayAll(projectName, tasksData);
            _initEvents(projectName, tasksData);
        }

        return {initWindow};
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

    return {format};
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

    function getTask() {

    }

    function getProject() {

    }

    function getTodayTasks() {
        const todayTasks = [];

        for (const project in storage["projectsData"]) {
            const tasks = storage["projectsData"][project]["tasks"];

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

    return {init, addProject, addTask, getTodayTasks};
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
// storageUtils.addTask("!!!Test", "Test Description", "2022-02-03", "0", "Inbox");
// storageUtils.addTask("Test", "Test Description", "2023-02-02", "1", "Inbox");
// storageUtils.addTask("Test", "Test Description", "2023-02-02", "2", "Inbox");
// storageUtils.addTask("!!!Test", "Test Description", "2022-02-03", "3", "Inbox");
// storageUtils.addTask("Test", "Test Description", "2024-02-02", "1", "Inbox");

// storageUtils.addProject("Project 1");

// storageUtils.addTask("000Test111", "Test Description", "2022-02-03", "0", "Project 1");
// storageUtils.addTask("Test", "Test Description", "2023-02-02", "0", "Project 1");
// storageUtils.addTask("Test", "Test Description", "2023-02-02", "1", "Project 1");
// storageUtils.addTask("000Test111", "Test Description", "2022-02-03", "0", "Project 1");

const projectsData = JSON.parse(localStorage.getItem("projectsData"));
_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].Sidebar.addProject("Project 1", 26);
_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].Sidebar.addEventsToProjects(projectsData);


_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].Sidebar.addEventToToday(_utils__WEBPACK_IMPORTED_MODULE_1__.storageUtils.getTodayTasks());

_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].ProjectWindow.initWindow("Today", _utils__WEBPACK_IMPORTED_MODULE_1__.storageUtils.getTodayTasks());
_ui_loader__WEBPACK_IMPORTED_MODULE_0__["default"].Header.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTmtDO0FBQ0U7O0FBRXBDLHFEQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUVBQTJCO0FBQzNCLDhFQUFvQzs7O0FBR3BDLDBFQUFnQyxDQUFDLDhEQUEwQjs7QUFFM0QsMkVBQWlDLFVBQVUsOERBQTBCO0FBQ3JFLDhEQUFvQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby8uL3NyYy91aS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBXaGVuIEkgd2FzIGJ1aWxkaW5nIGl0LCBJIG9ubHkgc3RhcnRlZCB0byBsZWFybiB0byB3cml0ZSBtb3JlIG9yIGxlc3MgY2xlYW4gQ1NTIGFuZCBIVE1MIENvZGUgKi9cbi8qIFRvIHRoYXQgZW5kLCB0aGVyZSBhcmUgbWFueSBsb25nLCBjaGFpbmVkIGFuZCBjb21wbGV0ZWx5IHVucmVhZGFibGUgc2VsZWN0b3JzICovXG4vKiB0aGF0IEknbSBhd2FyZSBvZi4gSG93ZXZlciwgaW5zdGVhZCBvZiByZXdyaXRpbmcsIEkgY2hvc2UgdG8gZ28gZm9yd2FyZCBhbmQgKi9cbi8qIG1ha2Ugc3VyZSBJIGRvbid0IHJlcGVhdCBzdWNoIG1pc3Rha2VzIGluIHRoZSBmdXR1cmUuICovXG5cbmltcG9ydCB7RGF0ZUZvcm1hdHRlcn0gZnJvbSBcIi4vdXRpbHMuanNcIlxuaW1wb3J0IHtzdG9yYWdlVXRpbHN9IGZyb20gXCIuL3V0aWxzLmpzXCJcblxuY29uc3QgVUlMb2FkZXIgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICAvKiBVdGlsaXR5IGZ1bmN0aW9ucyAqL1xuICAgIGNvbnN0IF9jcmVhdGVDb250YWluZXIgPSBmdW5jdGlvbihkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGAke2RpcmVjdGlvbn0tY29udGFpbmVyYCk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBjb25zdCBfcmVtb3ZlQWxsQ2hpbGROb2RlcyA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgICB3aGlsZSAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChwYXJlbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiBPbiBwYWdlbG9hZCAqL1xuXG4gICAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICB9XG5cbiAgICAvKiBGb3JtcyAqL1xuXG4gICAgY29uc3QgbmV3VGFza0Zvcm0gPSBfY3JlYXRlTmV3VGFza0Zvcm0oKTtcbiAgICBjb25zdCBuZXdQcm9qZWN0Rm9ybSA9IF9jcmVhdGVOZXdQcm9qZWN0Rm9ybSgpO1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZU5ld1Rhc2tGb3JtKCkge1xuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFza1wiKTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImZvcm0tbmV3LXRhc2tcIiwgXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICBiYWNrZ3JvdW5kLmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgIGNvbnN0IGZpZWxkU2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZpZWxkc2V0XCIpO1xuICAgICAgICBmaWVsZFNldC5jbGFzc0xpc3QuYWRkKFwibmV3LXRhc2stZGF0YS1maWVsZHNldFwiLCBcImNvbC1jb250YWluZXJcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoZmllbGRTZXQpO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQW5kUHJpb3JpdHkgPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpO1xuICAgICAgICBjbG9zZUFuZFByaW9yaXR5LmNsYXNzTGlzdC5hZGQoXCJjbG9zZS1hbmQtcHJpb3JpdHlcIik7XG4gICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoY2xvc2VBbmRQcmlvcml0eSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2xvc2UuY2xhc3NMaXN0LmFkZChcImNsb3NlLW5ldy10YXNrLWZvcm1cIik7XG4gICAgICAgIGNsb3NlLnRleHRDb250ZW50ID0gXCLDl1wiO1xuXG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBfdG9nZ2xlTmV3VGFza0Zvcm0oKTtcbiAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2xvc2VBbmRQcmlvcml0eS5hcHBlbmRDaGlsZChjbG9zZSk7XG5cbiAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBfY3JlYXRlUHJpb3JpdGllc0lucHV0KCk7XG4gICAgICAgIGNsb3NlQW5kUHJpb3JpdHkuYXBwZW5kQ2hpbGQocHJpb3JpdHkpO1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICB0aXRsZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dFwiKTtcbiAgICAgICAgdGl0bGUuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJUYXNrIG5hbWVcIilcbiAgICAgICAgdGl0bGUuY2xhc3NMaXN0LmFkZChcIm5ldy10YXNrLXRpdGxlXCIpO1xuICAgICAgICBmaWVsZFNldC5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJuZXctdGFzay1kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgZGVzY3JpcHRpb24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHRcIik7XG4gICAgICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZShcInBsYWNlaG9sZGVyXCIsIFwiRGVzY3JpcHRpb25cIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBjb25zdCBleHRyYVByb3BzID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgZXh0cmFQcm9wcy5jbGFzc0xpc3QuYWRkKFwiZXh0cmEtcHJvcHMtbmV3LXRhc2tcIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGV4dHJhUHJvcHMpO1xuXG4gICAgICAgIGNvbnN0IGRhdGVQcm9qZWN0ID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgZGF0ZVByb2plY3QuY2xhc3NMaXN0LmFkZChcImRhdGUtcHJvamVjdC1uZXctdGFza1wiKTtcbiAgICAgICAgZXh0cmFQcm9wcy5hcHBlbmRDaGlsZChkYXRlUHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgZGF0ZS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICAgICAgZGF0ZS5jbGFzc0xpc3QuYWRkKFwiZGF0ZS1uZXctdGFza1wiKTtcbiAgICAgICAgZGF0ZVByb2plY3QuYXBwZW5kQ2hpbGQoZGF0ZSk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LW5ldy10YXNrXCIpO1xuICAgICAgICBkYXRlUHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcblxuICAgICAgICBjb25zdCBmb3JtQWN0aW9ucyA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgIGZvcm1BY3Rpb25zLmNsYXNzTGlzdC5hZGQoXCJuZXctdGFzay1mb3JtLWFjdGlvbnNcIik7XG4gICAgICAgIGZpZWxkU2V0LmFwcGVuZENoaWxkKGZvcm1BY3Rpb25zKTtcblxuXG4gICAgICAgIC8vQUREIEZPUk0gUkVTRVQgRk9SIEJPVEggQU5EIEZPUiBYIEFTIFdFTExcbiAgICAgICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uY2xhc3NMaXN0LmFkZChcIm5ldy10YXNrLWNvbmZpcm1cIik7XG4gICAgICAgIGNvbmZpcm1CdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY29uZmlybUJ0bi50ZXh0Q29udGVudCA9IFwiQWRkIHRhc2tcIjtcblxuICAgICAgICBjb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnN0IHNlbGVjdGVkUHJpb3JpdHlcblxuICAgICAgICAgICAgc3RvcmFnZVV0aWxzLmFkZFRhc2sodGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkYXRlLnZhbHVlLCApXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvcm1BY3Rpb25zLmFwcGVuZENoaWxkKGNvbmZpcm1CdG4pO1xuXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKFwibmV3LXRhc2stY2FuY2VsXCIpO1xuICAgICAgICBjYW5jZWxCdG4uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gXCJDYW5jZWxcIjtcbiAgICAgICAgZm9ybUFjdGlvbnMuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcblxuICAgICAgICByZXR1cm4gZm9ybTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3UHJvamVjdEZvcm0oKSB7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdG9nZ2xlTmV3VGFza0Zvcm0oKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3LXRhc2tcIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3RvZ2dsZU5ld1Byb2plY3RGb3JtKCkge1xuXG4gICAgfVxuXG4gICAgLyogR2VuZXJhbCAqL1xuXG4gICAgZnVuY3Rpb24gX2NyZWF0ZVByaW9yaXRpZXNJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgX3ByaW9yaXR5U2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm5hdlwiKTtcbiAgICAgICAgX3ByaW9yaXR5U2VsZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcmlvcml0eS1zZWxlY3Rpb25cIiwgXCJyb3ctY29udGFpbmVyXCIpO1xuXG4gICAgICAgIC8qIENyZWF0ZSBwcmlvcml0eSBidXR0b25zIGFuZCBhcHBlbmQgcGFyZW50IHdpdGggdGhlbSovXG4gICAgICAgIGZvciAobGV0IGkgPSAzOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJyYWRpb1wiKTtcbiAgICAgICAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwicHJpb3JpdHlcIik7XG4gICAgICAgICAgICBidG4uaWQgPSBcInByaW9yaXR5XCI7XG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcInByaW9yaXR5LWJ0blwiLCBgcHJpb3JpdHktJHtpfWAsIFwiaW1hZ2UtYnRuXCIpO1xuXG4gICAgICAgICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcInByaW9yaXR5XCIpO1xuICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBgUHJpb3JpdHkgJHtpfWA7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgXCJcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwicHJpb3JpdHktc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX3ByaW9yaXR5U2VsZWN0aW9uLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICAgICAgICAgIF9wcmlvcml0eVNlbGVjdGlvbi5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eVBpYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBwcmlvcml0eVBpYy5jbGFzc0xpc3QuYWRkKGBpbWctcHJpb3JpdHktJHtpfWApO1xuICAgICAgICAgICAgcHJpb3JpdHlQaWMuc3JjID0gXCIuL2Fzc2V0cy9mbGFnLnBuZ1wiO1xuICAgICAgICAgICAgcHJpb3JpdHlQaWMuYWx0ID0gYHNldCBwcmlvcml0eSAke2l9YDtcblxuICAgICAgICAgICAgYnRuLmFwcGVuZENoaWxkKHByaW9yaXR5UGljKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfcHJpb3JpdHlTZWxlY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgU2lkZWJhciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVByb2plY3QobmFtZSwgdGFza3NDb3VudCkge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwicHJvamVjdFwiLCBcInJvdy1jb250YWluZXJcIik7XG4gICAgICAgICAgICBsaS5kYXRhc2V0LnByb2plY3QgPSBuYW1lO1xuXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuXG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgdGFza3MuY2xhc3NMaXN0LmFkZChcInByb2plY3QtdGFza3MtY291bnRcIik7XG4gICAgICAgICAgICB0YXNrcy50ZXh0Q29udGVudCA9IHRhc2tzQ291bnQ7XG5cbiAgICAgICAgICAgIGxpLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgICAgICBsaS5hcHBlbmRDaGlsZCh0YXNrcyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbG9ySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBjb2xvckljb24uY2xhc3NMaXN0LmFkZChcImNpcmNsZVwiKTtcbiAgICAgICAgICAgIGNvbG9ySWNvbi5hbHQgPSBcIlwiO1xuICAgICAgICAgICAgY29sb3JJY29uLnNyYz0gXCIuL2Fzc2V0cy9jaXJjbGUucG5nXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKFwibWVudS1wcm9qZWN0LW5hbWVcIik7XG4gICAgICAgICAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb2xvckljb24pO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGxpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkUHJvamVjdChuYW1lLCB0YXNrc0NvdW50KSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gX2NyZWF0ZVByb2plY3QobmFtZSwgdGFza3NDb3VudCk7XG5cbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHMgdWxcIik7XG4gICAgICAgICAgICBwcm9qZWN0c0xpc3QuYXBwZW5kQ2hpbGQocHJvamVjdCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVTaG93KCkge1xuICAgICAgICAgICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhclwiKTtcbiAgICAgICAgICAgIHNpZGViYXIuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlblwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEV2ZW50c1RvUHJvamVjdHMgKHByb2plY3RzRGF0YSkge1xuXG4gICAgICAgICAgICAvKiB1c2UgZXZlbnQgZGVsZWdhdGlvbiBmb3IgYWxsIHVzZXItY3JlYXRlZCBzaWRlYmFyIHByb2plY3RzICovXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzIHVsXCIpO1xuICAgICAgICAgICAgcHJvamVjdHNMaXN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnByb2plY3RcIik7XG5cdFx0XHRcdGlmICghcHJvamVjdCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmRhdGFzZXQucHJvamVjdDtcblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3cocHJvamVjdE5hbWUsIHByb2plY3RzRGF0YVtwcm9qZWN0TmFtZV0udGFza3MpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8qIGFkZCB0byBpbmJveCBtYW51YWxseS4gaXQncyBhbHdheXMgcHJlc2VudCAqL1xuICAgICAgICAgICAgY29uc3QgaW5ib3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbi1wcm9qZWN0cyAucHJvamVjdFtkYXRhLXByb2plY3Q9XCJJbmJveFwiXScpO1xuICAgICAgICAgICAgaW5ib3guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBQcm9qZWN0V2luZG93LmluaXRXaW5kb3coXCJJbmJveFwiLCBwcm9qZWN0c0RhdGFbXCJJbmJveFwiXS50YXNrcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkRXZlbnRUb1RvZGF5KHRvZGF5VGFza3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHRvZGF5QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RbZGF0YS1wcm9qZWN0PVwiVG9kYXlcIl0nKTtcblxuICAgICAgICAgICAgdG9kYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgUHJvamVjdFdpbmRvdy5pbml0V2luZG93KFwiVG9kYXlcIiwgdG9kYXlUYXNrcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIChmdW5jdGlvbiBfZW5hYmxlUHJvamVjdHNEcm9wZG93bigpIHtcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0cy1tZW51IC5vcGVuLWRyb3Bkb3duXCIpO1xuXG4gICAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG5cbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgZHJvcGRvd25JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzLW1lbnUgLm9wZW4tZHJvcGRvd24gaW1nXCIpO1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duSW1nLmNsYXNzTGlzdC50b2dnbGUoXCJjbG9zZWRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkoKTtcblxuICAgICAgICByZXR1cm4ge2FkZFByb2plY3QsIHRvZ2dsZVNob3csIGFkZEV2ZW50c1RvUHJvamVjdHMsIGFkZEV2ZW50VG9Ub2RheX07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IEhlYWRlciA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgLy9idWlsZCB0b2dnbGUgc2lkZWJhciBidXR0b24sIHdpcmUgaXQgdG8gdGhlIHByaXZhdGUgbWV0aG9kIG9mIFNpZGViYXJcbiAgICAgICAgY29uc3QgdG9nZ2xlU2lkZWJhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9nZ2xlLXNpZGViYXJcIik7XG4gICAgICAgIHRvZ2dsZVNpZGViYXJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7U2lkZWJhci50b2dnbGVTaG93KCl9KTtcblxuICAgICAgICBmdW5jdGlvbiBfaW5pdE5ld1Rhc2tCdG4oKSB7XG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLWJ0blwiKTtcblxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaHVnXCIpO1xuICAgICAgICAgICAgICAgIF90b2dnbGVOZXdUYXNrRm9ybSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBfaW5pdE5ld1Rhc2tCdG4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7aW5pdH07XG4gICAgfSkoKTtcblxuICAgIGNvbnN0IFByb2plY3RXaW5kb3cgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9kaXNwbGF5V2luZG93KHByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdC1jb250ZW50XCIpO1xuICAgICAgICAgICAgX3JlbW92ZUFsbENoaWxkTm9kZXMocHJvamVjdENvbnRlbnQpO1xuICAgICAgICAgICAgLy8gcHJvamVjdENvbnRlbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbiAgICAgICAgICAgIHByb2plY3RIZWFkZXIuaWQgPSBcInByb2plY3QtaGVhZGVyXCI7XG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJyb3ctY29udGFpbmVyXCIpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy5pZCA9IFwicHJvamVjdC1uYW1lLWhlYWRpbmdcIjtcbiAgICAgICAgICAgIHByb2plY3ROYW1lSGVhZGluZy50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuXG4gICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3ROYW1lSGVhZGluZyk7XG5cbiAgICAgICAgICAgIGlmIChwcm9qZWN0TmFtZSA9PT0gXCJUb2RheVwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9kYXkgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSgpKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgICAgICBzcGFuLmlkID0gXCJwcm9qZWN0LWN1cnJlbnQtZGF0ZVwiO1xuICAgICAgICAgICAgICAgIHNwYW4udGV4dENvbnRlbnQgPSB0b2RheTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHNwYW4pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2tzQ29udGFpbmVyID0gX2NyZWF0ZUNvbnRhaW5lcihcImNvbFwiKTtcbiAgICAgICAgICAgIHRhc2tzQ29udGFpbmVyLmlkID0gXCJwcm9qZWN0LXRhc2tzXCI7XG5cbiAgICAgICAgICAgIHByb2plY3RDb250ZW50LmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXIpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRlbnQuYXBwZW5kQ2hpbGQodGFza3NDb250YWluZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gX2NyZWF0ZVRhc2sodGFza0luZm8sIGluZGV4KSB7XG4gICAgICAgICAgICBjb25zdCBfdGFzayA9IF9jcmVhdGVDb250YWluZXIoXCJyb3dcIik7XG4gICAgICAgICAgICBfdGFzay5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICAgICAgICAgIF90YXNrLmRhdGFzZXQucHJvamVjdCA9IHRhc2tJbmZvLnByb2plY3Q7XG4gICAgICAgICAgICBfdGFzay5kYXRhc2V0LmluZGV4ID0gaW5kZXg7XG5cblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tNYWluID0gX2NyZWF0ZUNvbnRhaW5lcihcInJvd1wiKTtcbiAgICAgICAgICAgIF90YXNrTWFpbi5jbGFzc0xpc3QuYWRkKFwidGFzay1tYWluXCIpO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IF9jb21wbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgX2NvbXBsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGUtdGFzay1idG5cIiwgYHRhc2stcHJpb3JpdHktJHt0YXNrSW5mby5wcmlvcml0eX1gKTtcblxuICAgICAgICAgICAgY29uc3QgX3Rhc2tDb250ZW50ID0gX2NyZWF0ZUNvbnRhaW5lcihcImNvbFwiKTtcbiAgICAgICAgICAgIF90YXNrQ29udGVudC5jbGFzc0xpc3QuYWRkKFwidGFzay1jb250ZW50XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgICAgICAgICBfdGFza05hbWUuY2xhc3NMaXN0LmFkZChcInRhc2stbmFtZVwiKTtcbiAgICAgICAgICAgIF90YXNrTmFtZS50ZXh0Q29udGVudCA9IHRhc2tJbmZvLnRpdGxlO1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBfdGFza0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRlc2NyaXB0aW9uXCIpO1xuICAgICAgICAgICAgX3Rhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2tJbmZvLmRlc2NyaXB0aW9uO1xuXG4gICAgICAgICAgICBjb25zdCBfdGFza0RhdGUgPSBfY3JlYXRlQ29udGFpbmVyKFwicm93XCIpO1xuICAgICAgICAgICAgX3Rhc2tEYXRlLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWRhdGVcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IF9jYWxlbmRhckltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICBfY2FsZW5kYXJJbWcuc3JjID0gXCIuL2Fzc2V0cy9jYWxlbmRhci5wbmdcIjtcbiAgICAgICAgICAgIF9jYWxlbmRhckltZy5hbHQgPSBcIlwiO1xuXG4gICAgICAgICAgICBjb25zdCBfZGF0ZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblxuXG4gICAgICAgICAgICBpZiAodGFza0luZm8uZGF0ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gRGF0ZUZvcm1hdHRlci5mb3JtYXQobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZSh0YXNrSW5mby5kYXRlKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFza0RhdGUgPT09IGN1cnJlbnREYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIF9kYXRlVGV4dC5jbGFzc0xpc3QuYWRkKFwidG9kYXktdGV4dFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LnRleHRDb250ZW50ID0gXCJUb2RheVwiO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgX3Rhc2tEYXRlLmFwcGVuZENoaWxkKF9jYWxlbmRhckltZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGVUZXh0LmNsYXNzTGlzdC5hZGQoXCJkYXRlLXRleHRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9kYXRlVGV4dC50ZXh0Q29udGVudCA9IHRhc2tJbmZvLmRhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBfbGVmdFNlY3Rpb24gPSBfY3JlYXRlQ29udGFpbmVyKFwiY29sXCIpOyAgIFxuXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7IC8vdXNlZCBmb3IgdG9kYXksIGVtcHR5IGluIG90aGVyIHByb2plY3RzXG4gICAgICAgICAgICBwcm9qZWN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1wcm9qZWN0XCIpO1xuXG4gICAgICAgICAgICBfdGFzay5hcHBlbmRDaGlsZChfdGFza01haW4pO1xuICAgICAgICAgICAgICAgIF90YXNrTWFpbi5hcHBlbmRDaGlsZChfY29tcGxldGVUYXNrQnRuKTtcbiAgICAgICAgICAgICAgICBfdGFza01haW4uYXBwZW5kQ2hpbGQoX3Rhc2tDb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgX3Rhc2tDb250ZW50LmFwcGVuZENoaWxkKF90YXNrTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50KSBfdGFza0NvbnRlbnQuYXBwZW5kQ2hpbGQoX3Rhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIF90YXNrQ29udGVudC5hcHBlbmRDaGlsZChfdGFza0RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3Rhc2tEYXRlLmFwcGVuZENoaWxkKF9kYXRlVGV4dCk7XG4gICAgICAgICAgICBfdGFzay5hcHBlbmRDaGlsZChfbGVmdFNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIF9sZWZ0U2VjdGlvbi5hcHBlbmRDaGlsZChwcm9qZWN0U2VjdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBfdGFzaztcbiAgICAgICAgfVxuXG5cbiAgICAgICAgZnVuY3Rpb24gX2Rpc3BsYXlUYXNrcyh0YXNrc0RhdGEsIHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgIHRhc2tzRGF0YS5mb3JFYWNoKCh0YXNrSW5mbywgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tOb2RlID0gX2NyZWF0ZVRhc2sodGFza0luZm8sIGkpO1xuICAgICAgICAgICAgICAgIF9zaG93VGFzayh0YXNrTm9kZSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5SXNPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3Nob3dUYXNrUHJvamVjdChpLCB0YXNrSW5mby5wcm9qZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFza1Byb2plY3QodGFza0luZGV4LCB0YXNrUHJvamVjdCkgeyAvLyBzaG93cyB3aGF0IHByb2plY3QgdGhlIHRhc2sgaXMgYXNzb2NpYXRlZCB3aXRoIChlLmcuIGluIHRvZGF5KVxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnRhc2tbZGF0YS1pbmRleD1cIiR7dGFza0luZGV4fVwiXSAudGFzay1wcm9qZWN0YCk7XG4gICAgICAgICAgICBjb250YWluZXIudGV4dENvbnRlbnQgPSB0YXNrUHJvamVjdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIF9zaG93VGFzayh0YXNrTm9kZSkge1xuICAgICAgICAgICAgY29uc3QgdGFza3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtdGFza3NcIik7XG4gICAgICAgICAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfZGlzcGxheUFsbChwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfZGlzcGxheVdpbmRvdyhwcm9qZWN0TmFtZSk7ICAgXG4gICAgICAgICAgICBfZGlzcGxheVRhc2tzKHRhc2tzRGF0YSwgcHJvamVjdE5hbWUgPT09IFwiVG9kYXlcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBfaW5pdEV2ZW50cyhwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICAvLyBfaW5pdE5ld1Rhc2tCdG4ocHJvamVjdE5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5pdFdpbmRvdyhwcm9qZWN0TmFtZSwgdGFza3NEYXRhKSB7XG4gICAgICAgICAgICBfZGlzcGxheUFsbChwcm9qZWN0TmFtZSwgdGFza3NEYXRhKTtcbiAgICAgICAgICAgIF9pbml0RXZlbnRzKHByb2plY3ROYW1lLCB0YXNrc0RhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtpbml0V2luZG93fTtcbiAgICB9KSgpO1xuXG4gICAgcmV0dXJuIHtTaWRlYmFyLCBIZWFkZXIsIFByb2plY3RXaW5kb3csIGxvYWR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVUlMb2FkZXI7IiwiY29uc3QgRGF0ZUZvcm1hdHRlciA9IChmdW5jdGlvbigpIHtcbiAgICAvKiBGb3JtYXRzIGRhdGUgdG8gbG9vayBsaWtlIEZlYiAyLCAyMDIyICovXG4gICAgZnVuY3Rpb24gZm9ybWF0KGRhdGUpIHtcbiAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuXG4gICAgICAgIHJldHVybiBgJHttb250aHNbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldERhdGUoKX0sICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtmb3JtYXR9O1xufSkoKTtcblxuY29uc3Qgc3RvcmFnZVV0aWxzID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHN0b3JhZ2UgPSB7XG4gICAgICAgIFwicHJvamVjdHNEYXRhXCI6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c0RhdGFcIikpIHx8IHt9LFxuICAgICAgICAvLyBcIlRvZGF5XCI6IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJUb2RheVwiKSkgfHwgW11cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRJbmJveCA9IHtcbiAgICAgICAgICAgIFwibmFtZVwiOiBcIkluYm94XCIsXG4gICAgICAgICAgICBcInRhc2tzXCI6IFtcblxuICAgICAgICAgICAgXVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0b3JhZ2UucHJvamVjdHNEYXRhIFxuICAgICAgICAgICAgJiYgT2JqZWN0LmtleXMoc3RvcmFnZS5wcm9qZWN0c0RhdGEpLmxlbmd0aCA9PT0gMCBcbiAgICAgICAgICAgICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihzdG9yYWdlLnByb2plY3RzRGF0YSkgPT09IE9iamVjdC5wcm90b3R5cGUpIHtcblxuICAgICAgICAgICAgc3RvcmFnZS5wcm9qZWN0c0RhdGFbXCJJbmJveFwiXSA9IGRlZmF1bHRJbmJveDtcbiAgICAgICAgICAgIF91cGRhdGVMb2NhbFN0b3JhZ2UoXCJwcm9qZWN0c0RhdGFcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF91cGRhdGVMb2NhbFN0b3JhZ2Uoa2V5KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmFnZVtrZXldKSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBhZGRQcm9qZWN0KG5hbWUpIHtcbiAgICAgICAgY2xhc3MgUHJvamVjdCB7XG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpc1tcIm5hbWVcIl0gPSBuYW1lO1xuICAgICAgICAgICAgICAgIHRoaXNbXCJ0YXNrc1wiXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KG5hbWUpO1xuICAgICAgICBzdG9yYWdlLnByb2plY3RzRGF0YVtuYW1lXSA9IHByb2plY3Q7XG5cbiAgICAgICAgX3VwZGF0ZUxvY2FsU3RvcmFnZShcInByb2plY3RzRGF0YVwiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgcHJpb3JpdHksIHByb2plY3QpIHtcbiAgICAgICAgY2xhc3MgVGFzayB7XG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHByaW9yaXR5LCBwcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgdGhpc1tcInRpdGxlXCJdID0gdGl0bGU7XG4gICAgICAgICAgICAgICAgdGhpc1tcImRlc2NyaXB0aW9uXCJdID0gZGVzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgdGhpc1tcImRhdGVcIl0gPSBEYXRlRm9ybWF0dGVyLmZvcm1hdChuZXcgRGF0ZShkYXRlKSk7XG4gICAgICAgICAgICAgICAgdGhpc1tcInByaW9yaXR5XCJdID0gcHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgdGhpc1tcInByb2plY3RcIl0gPSBwcm9qZWN0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXREYXRlKGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gIERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKGQpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzW1wiZGF0ZVwiXSA9IGRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgIHN0b3JhZ2UucHJvamVjdHNEYXRhW3Byb2plY3RdW1widGFza3NcIl0ucHVzaCh0YXNrKTtcblxuICAgICAgICBfdXBkYXRlTG9jYWxTdG9yYWdlKFwicHJvamVjdHNEYXRhXCIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRhc2soKSB7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0KCkge1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VG9kYXlUYXNrcygpIHtcbiAgICAgICAgY29uc3QgdG9kYXlUYXNrcyA9IFtdO1xuXG4gICAgICAgIGZvciAoY29uc3QgcHJvamVjdCBpbiBzdG9yYWdlW1wicHJvamVjdHNEYXRhXCJdKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrcyA9IHN0b3JhZ2VbXCJwcm9qZWN0c0RhdGFcIl1bcHJvamVjdF1bXCJ0YXNrc1wiXTtcblxuICAgICAgICAgICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RheSA9IERhdGVGb3JtYXR0ZXIuZm9ybWF0KG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gdGFzay5kYXRlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRvZGF5ID09PSB0YXNrRGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0b2RheVRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9kYXlUYXNrcztcbiAgICB9XG5cbiAgICByZXR1cm4ge2luaXQsIGFkZFByb2plY3QsIGFkZFRhc2ssIGdldFRvZGF5VGFza3N9O1xufSkoKTtcblxuZXhwb3J0IHtEYXRlRm9ybWF0dGVyLCBzdG9yYWdlVXRpbHN9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJTG9hZGVyIGZyb20gXCIuL3VpLWxvYWRlclwiXG5pbXBvcnQge3N0b3JhZ2VVdGlsc30gZnJvbSBcIi4vdXRpbHNcIlxuXG5zdG9yYWdlVXRpbHMuaW5pdCgpO1xuLy8gc3RvcmFnZVV0aWxzLmFkZFRhc2soXCIhISFUZXN0XCIsIFwiVGVzdCBEZXNjcmlwdGlvblwiLCBcIjIwMjItMDItMDNcIiwgXCIwXCIsIFwiSW5ib3hcIik7XG4vLyBzdG9yYWdlVXRpbHMuYWRkVGFzayhcIlRlc3RcIiwgXCJUZXN0IERlc2NyaXB0aW9uXCIsIFwiMjAyMy0wMi0wMlwiLCBcIjFcIiwgXCJJbmJveFwiKTtcbi8vIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFwiVGVzdFwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMDIzLTAyLTAyXCIsIFwiMlwiLCBcIkluYm94XCIpO1xuLy8gc3RvcmFnZVV0aWxzLmFkZFRhc2soXCIhISFUZXN0XCIsIFwiVGVzdCBEZXNjcmlwdGlvblwiLCBcIjIwMjItMDItMDNcIiwgXCIzXCIsIFwiSW5ib3hcIik7XG4vLyBzdG9yYWdlVXRpbHMuYWRkVGFzayhcIlRlc3RcIiwgXCJUZXN0IERlc2NyaXB0aW9uXCIsIFwiMjAyNC0wMi0wMlwiLCBcIjFcIiwgXCJJbmJveFwiKTtcblxuLy8gc3RvcmFnZVV0aWxzLmFkZFByb2plY3QoXCJQcm9qZWN0IDFcIik7XG5cbi8vIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFwiMDAwVGVzdDExMVwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMDIyLTAyLTAzXCIsIFwiMFwiLCBcIlByb2plY3QgMVwiKTtcbi8vIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFwiVGVzdFwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMDIzLTAyLTAyXCIsIFwiMFwiLCBcIlByb2plY3QgMVwiKTtcbi8vIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFwiVGVzdFwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMDIzLTAyLTAyXCIsIFwiMVwiLCBcIlByb2plY3QgMVwiKTtcbi8vIHN0b3JhZ2VVdGlscy5hZGRUYXNrKFwiMDAwVGVzdDExMVwiLCBcIlRlc3QgRGVzY3JpcHRpb25cIiwgXCIyMDIyLTAyLTAzXCIsIFwiMFwiLCBcIlByb2plY3QgMVwiKTtcblxuY29uc3QgcHJvamVjdHNEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzRGF0YVwiKSk7XG5VSUxvYWRlci5TaWRlYmFyLmFkZFByb2plY3QoXCJQcm9qZWN0IDFcIiwgMjYpO1xuVUlMb2FkZXIuU2lkZWJhci5hZGRFdmVudHNUb1Byb2plY3RzKHByb2plY3RzRGF0YSk7XG5cblxuVUlMb2FkZXIuU2lkZWJhci5hZGRFdmVudFRvVG9kYXkoc3RvcmFnZVV0aWxzLmdldFRvZGF5VGFza3MoKSk7XG5cblVJTG9hZGVyLlByb2plY3RXaW5kb3cuaW5pdFdpbmRvdyhcIlRvZGF5XCIsIHN0b3JhZ2VVdGlscy5nZXRUb2RheVRhc2tzKCkpO1xuVUlMb2FkZXIuSGVhZGVyLmluaXQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=