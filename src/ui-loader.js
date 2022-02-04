/* When I was building it, I only started to learn to write more or less clean CSS and HTML Code */
/* To that end, there are many long, chained and completely unreadable selectors */
/* that I'm aware of. However, instead of rewriting, I chose to go forward and */
/* make sure I don't repeat such mistakes in the future. */

import {DateFormatter} from "./utils.js"
import {storageUtils} from "./utils.js"

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


    window.onload = () => {_createNewTaskForm()};


    function _createNewTaskForm() {
        const background = document.querySelector(".task-input-background");

        const form = document.createElement("form");
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
            form.reset();
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
        title.setAttribute("placeholder", "Task name")
        title.classList.add("task-input-title");
        fieldSet.appendChild(title);

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
            storageUtils.addTask(
                title.value,
                description.value,
                date.value,
                priority.lastChild.value,
                project.lastChild.value
                );

            if (project.lastChild.value === ProjectWindow.getCurrentProject()) {
                ProjectWindow.updateCurrentProject();
            }

            if (DateFormatter.format(new Date(date.value)) === DateFormatter.format(new Date())
            && ProjectWindow.getCurrentProject() === "Today") { // if task is set to today and today is opened
                ProjectWindow.initWindow("Today", storageUtils.getTodayTasks());
            }

            Sidebar.update();

            form.reset();
            _toggleNewTaskForm();
        });

        formActions.appendChild(confirmBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("task-input-cancel");
        cancelBtn.setAttribute("type", "button");
        cancelBtn.textContent = "Cancel";

        cancelBtn.addEventListener("click", () => {
            _toggleNewTaskForm();
            form.reset();
        });

        formActions.appendChild(cancelBtn);

        return form;
    }

    function _predefineFormProject(projectName) {
        const projectInput = document.querySelector(".project-dropdown-input");
        projectInput.value = projectName;
    }

    function _createNewProjectForm() {

    }

    function _toggleNewTaskForm() {
        const formBackground = document.querySelector(".task-input-background");
        formBackground.classList.toggle("show");
    }

    function _toggleNewProjectForm() {

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
            const projectsData = storageUtils.getProjectAll();

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

        }

        function addEventToToday() {
            const todayButton = document.querySelector('.project[data-project="Today"]');

            todayButton.addEventListener('click', () => {
                ProjectWindow.initWindow("Today", storageUtils.getTodayTasks());
            });
        }

        function addEventToInbox() {
            const inbox = document.querySelector('#main-projects .project[data-project="Inbox"]');
            inbox.addEventListener("click", () => {
                ProjectWindow.initWindow("Inbox", storageUtils.getProject("Inbox").tasks);
            });
        }

        function update() {
            const projectsList = document.querySelector("#projects ul");

            _removeAllChildNodes(projectsList);

            const projectsData = storageUtils.getProjectAll();

            for (const project in projectsData) {
                if (projectsData[project].name !== "Inbox") {
                    const tasksCount = projectsData[project].tasks.length;

                    addProject(projectsData[project].name, tasksCount);
                }
            }

            const shownInboxTasksCount = document.querySelector(".project[data-project=\"Inbox\"] .project-tasks-count");
            const shownTodayTasksCount = document.querySelector(".project[data-project=\"Today\"] .project-tasks-count");

            shownInboxTasksCount.textContent = projectsData["Inbox"].tasks.length;
            shownTodayTasksCount.textContent = storageUtils.getTodayTasks().length;

            addEventsToProjects(projectsData);


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
                const today = DateFormatter.format(new Date());

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
            _task.setAttribute("title", "Edit task");
            _task.dataset.project = taskInfo.project;
            _task.dataset.index = index;


            const _removeTask = function() {
                const tasksContainer = document.querySelector("#project-tasks");

                tasksContainer.removeChild(_task);

                storageUtils.removeTask(taskInfo.project, index);

                Sidebar.update();
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
                const currentDate = DateFormatter.format(new Date());
                const taskDate = DateFormatter.format(new Date(taskInfo.date));

                if (taskDate === currentDate) {
                    _dateText.classList.add("today-text");
                    _dateText.textContent = "Today";
                    
                    _taskDate.appendChild(_calendarImg);
                } else {
                    _dateText.classList.add("date-text");
                    _dateText.textContent = taskInfo.date;
                }
            }

            const _rightSection = _createContainer("col");
            
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
            _task.appendChild(_rightSection);
                _rightSection.appendChild(deleteBtn);
                _rightSection.appendChild(projectSection);

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
            // const tasksContainer = document.querySelector("#project-tasks");
            // tasksContainer.appendChild(taskNode);
            const newTaskBtn = document.querySelector(".project-new-task-btn");
            newTaskBtn.insertAdjacentElement("beforebegin", taskNode);
        }

        function _addNewtaskBtn(projectName) {
            const tasks = document.querySelector("#project-tasks");

            const btn = document.createElement("button");
            btn.classList.add("project-new-task-btn");
            btn.addEventListener("click", () => {
                _predefineFormProject((projectName === "Today") ? "Inbox" : projectName);
                _toggleNewTaskForm();
            });
            tasks.appendChild(btn);

            const img = document.createElement("img");
            img.src = "./assets/plus-red.png";
            img.classList.add("project-new-task-plus-img");
            btn.appendChild(img);

            const btnText = document.createElement("span");
            btnText.classList.add("project-new-task-text");
            btnText.textContent = "Add task";
            btn.appendChild(btnText);
        }

        function _displayAll(projectName, tasksData) {
            _displayWindow(projectName);   
            _addNewtaskBtn(projectName);
            _displayTasks(tasksData, projectName === "Today");
        }

        let _currentProject;
        let _currentTasksData;

        function getCurrentProject() {
            return _currentProject;
        }

        function updateCurrentProject() {
            _currentTasksData = storageUtils.getProject(_currentProject).tasks;
            
            _displayAll(_currentProject, _currentTasksData);
        }

        function initWindow(projectName, tasksData) {
            _currentProject = projectName;
            _displayAll(projectName, tasksData);
        }

        return {initWindow, getCurrentProject, updateCurrentProject};
    })();

    return {Sidebar, Header, ProjectWindow, load};
})();

export default UILoader;