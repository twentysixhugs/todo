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

            storageUtils.addTask(title.value, description.value, date.value, )
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

export default UILoader;