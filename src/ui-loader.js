import {DateFormatter} from "./utils.js"

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

            //Rewrite so that it creates a div. Set border-radius to 100% in css.
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
					
                ProjectWindow.display(projectName, projectsData[projectName].tasks);
            });

            /* add to inbox manually. it's always present */
            const inbox = document.querySelector('#main-projects .project[data-project="Inbox"]');
            inbox.addEventListener("click", () => {
                ProjectWindow.display("Inbox", projectsData["Inbox"].tasks);
            })
        }

        function addEventToToday(todayTasks) {
            const todayButton = document.querySelector('.project[data-project="Today"]');

            todayButton.addEventListener('click', () => {
                ProjectWindow.display("Today", todayTasks);
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

        function _createTask(taskInfo) {
            const _task = _createContainer("row");
            _task.classList.add("task");
            _task.dataset.project = taskInfo.project;
            _task.dataset.index = taskInfo.index;


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
            const _prioritySelection = document.createElement("nav");
            _prioritySelection.classList.add("priority-selection", "row-container");

            /* Create three priority buttons and append parent with them*/
            for (let i = 3; i > 0; i--) {
                const btn = document.createElement("button");
                btn.classList.add("priority-btn", `priority-${i}`, "image-btn");
                
                const priorityPic = document.createElement("img");
                priorityPic.src = "./assets/flag.png";
                priorityPic.alt = `set priority ${i}`;

                // btn.addEventListener('click', () => {
                //     if (priorityPic.classList.contains("selected")) {
                //         /* Toggle selected flag picture */
                //         priorityPic.classList.toggle("selected");
                //         priorityPic.src = "./assets/flag.png"
                //     } else {
                //         priorityPic.classList.toggle("selected");
                //         priorityPic.src = "./assets/flag-selected.png"
                //     }
                    
                // }, {capture: true});

                btn.appendChild(priorityPic);

                _prioritySelection.appendChild(btn);
            }

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
                _leftSection.appendChild(_prioritySelection);
                _leftSection.appendChild(projectSection);

            return _task;
        }

        function _displayTasks(tasksData, todayIsOpened) {
            tasksData.forEach(taskInfo => {
                const taskNode = _createTask(taskInfo);
                _showTask(taskNode);
                
                if (todayIsOpened) {
                    _showTaskProject(taskInfo.index, taskInfo.project);
                }
            });
        }

        function _showTaskProject(taskIndex, taskProject) { // shows what project the task is associated with (e.g. in today)
            const container = document.querySelector(`.task[data-index="${taskIndex}"] .task-project`);
            container.textContent = taskProject;
        }

        function _showTask(task) {
            const tasksContainer = document.querySelector("#project-tasks");

            tasksContainer.appendChild(task);
        }

        function _showProjectNewTaskBtn(projectName) {
            const btn = document.createElement("button");
            btn.classList.add("project-new-task", "image-btn");
            btn.dataset.projectNewTask = projectName;

            const img = document.createElement("img");
            img.src = "./assets/plus-red.png"; 

            const btnLabel = document.createElement("span");
            btnLabel.textContent = "Add task";

            const projectTasksContainer = document.querySelector("#project-tasks");
            projectTasksContainer.appendChild(btn);
                btn.appendChild(img);
                btn.appendChild(btnLabel);

        }

        function display(projectName, tasksData) {
            _displayWindow(projectName);   
            _displayTasks(tasksData, projectName === "Today");
            _showProjectNewTaskBtn(projectName);
        }

        return {display};
    })();

    return {Sidebar, Header, ProjectWindow, load};
})();

export default UILoader;