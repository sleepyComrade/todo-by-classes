import { MainWrap } from "./main-wrap";
import { PopUp } from "./popup";
import { AddButton } from "./add-button";
import { TaskList } from "./task-list";

export class Todo {
  api: any;
  mainWrap: any;
  taskList: any;
  showPopup: any;
  addButton: any;
  constructor(api: any) {
    this.api = api;
    this.mainWrap = new MainWrap(document.body);
    this.taskList = new TaskList(this.mainWrap);
    this.showPopup = (parent: HTMLElement, list: HTMLElement, initialData: { name: string, done: boolean, id?: number } | undefined, isNew: boolean) => {
      const popUp = new PopUp(parent, list, this.showPopup, this.api, initialData, isNew);
      popUp.openPopup();
      return popUp;
    }
    this.addButton = new AddButton(this.showPopup, this.mainWrap, this.taskList);
  }
}