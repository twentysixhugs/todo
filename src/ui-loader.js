const UILoader = (function() {
    const load = function(container, node) {
        
    }
    
    const _createContainer = function(direction) {
        const container = document.createElement('div');
        container.classList.add(`${direction}-container`);

        return container;
    }

    const Sidebar = (function() {
        (function addEventsToDefaultProjects () {
            const defaultProjects = document.querySelectorAll("#main-projects .project");

            defaultProjects.forEach(project => {
                project.addEventListener('click', (e) => {
                    const projectName = e.target.dataset.project;
                    ProjectWindow.display(projectName);
                });
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

        return {addProject};
    })();

    const Header = (function() {
        
    })();

    const ProjectWindow = (function() {
        function display(name) {
            const projectContent = document.querySelector("#project-content");
            const projectHeader = document.querySelector("#project-header");

            projectContent.textContent = "";
            projectHeader.textContent = "";

            projectHeader.firstChild().textContent = name; // project name at the top

            if (name === Today) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                const fullDate = new Date();
                const today = `${months[fullDate.getMonth() - 1]} ${fullDate.getDay()}, ${fullDate.getFullYear()}`;

                const span = document.createElement("span");
                span.id = "project-current-day";
                span.textContent = today;
                projectHeader.appendChild(span)
            }

            projectContent.appendChild(projectHeader);
        }

        return {display};
    })();

    return {Sidebar};
})();

export default UILoader;