import { MainWrap } from "./main-wrap";
import { PopUp } from "./popup";
import { AddButton } from "./add-button";
import { TaskList } from "./task-list";
import { Api } from "./fake-server";
import { ServerTaskItem } from "./i-server-item";
import { Wrap } from "./main-wrap";
import { TodoTaskList } from "./task-list";
import { TodoAddBtn } from "./add-button";

export class Todo {
  api: Api;
  mainWrap: Wrap;
  taskList: TodoTaskList;
  showPopup: any;
  addButton: TodoAddBtn;
  constructor(api: Api) {
    this.api = api;
    this.mainWrap = new MainWrap(document.body);
    this.taskList = new TaskList(this.mainWrap);
    this.showPopup = (parent: Wrap, list: TodoTaskList, initialData: ServerTaskItem, isNew: boolean) => {
      const popUp = new PopUp(parent, list, this.showPopup, this.api, initialData, isNew);
      popUp.openPopup();
      return popUp;
    }
    this.addButton = new AddButton(this.showPopup, this.mainWrap, this.taskList);
  }
}