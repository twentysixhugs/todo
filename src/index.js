import UILoader from "./ui-loader"
import {storageUtils} from "./utils"

storageUtils.init();
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


//INIT!!!
const projectsData = JSON.parse(localStorage.getItem("projectsData"));
UILoader.Sidebar.addProject("Project 1", 26);
UILoader.Sidebar.addEventsToProjects(projectsData);


UILoader.Sidebar.addEventToToday(storageUtils.getTodayTasks());

UILoader.ProjectWindow.initWindow("Today", storageUtils.getTodayTasks());
UILoader.Header.init();
//