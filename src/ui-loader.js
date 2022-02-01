const UILoader = (function() {
    const load = function(container, node) {
        
    }
    
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

    const Sidebar = (function() {
        (function addEventsToDefaultProjects () {
            const defaultProjects = document.querySelectorAll("#main-projects .project");

            defaultProjects.forEach(project => {
                project.addEventListener('click', (e) => {
                    // e.stopPropagation();

                    const projectName = e.currentTarget.dataset.project;
                    ProjectWindow.display(projectName);
                }, {capture: true});
            })
        })();

        function _createProject(name, color, tasksCount) {
            const li = document.createElement("li");
            li.classList.add("project", "row-container");
            li.dataset.project = name;

            li.addEventListener('click', () => {ProjectWindow.display(name)});

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

        function addProject(name, color, tasksCount) {
            const project = _createProject(name, color, tasksCount);

            const projectsList = document.querySelector("#projects ul");
            projectsList.appendChild(project);
        }

        function toggleShow() {
            const sidebar = document.querySelector("#sidebar");
            sidebar.classList.toggle("hidden");
        }

        return {addProject, toggleShow};
    })();

    const Header = (function() {
        //build toggle sidebar button, wire it to the private method of Sidebar
        const toggleSidebarBtn = document.querySelector("#toggle-sidebar");
        toggleSidebarBtn.addEventListener('click', () => {Sidebar.toggleShow()});
    })();

    const ProjectWindow = (function() {
        function display(projectName) {
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
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                const fullDate = new Date();
                const today = `${months[fullDate.getMonth() - 1]} ${fullDate.getDay()}, ${fullDate.getFullYear()}`;

                const span = document.createElement("span");
                span.id = "project-current-date";
                span.textContent = today;
                projectHeader.appendChild(span)
            }

            projectContent.appendChild(projectHeader);
        }

        return {display};
    })();

    return {Sidebar, Header, ProjectWindow};
})();

export default UILoader;