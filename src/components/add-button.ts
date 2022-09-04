import { ServerTaskItem } from "./i-server-item";
import { TodoTaskList } from "./task-list";
import { Wrap } from "./main-wrap";

export class AddButton {
  parent: Wrap;
  list: TodoTaskList;
  button
  constructor(click: (parent: Wrap, list: TodoTaskList, initialData: ServerTaskItem, isNew: boolean) => HTMLElement, parent: Wrap, list: TodoTaskList) {
    this.parent = parent;
    this.list = list;
    this.button = document.createElement('button');
    this.button.className = 'openButton';
    this.button.textContent = '+';
    this.button.onclick = () => click(this.parent, this.list, {name: '', done: false, id: undefined}, true);    
    parent.wrap.insertBefore(this.button, parent.wrap.firstChild);
  }
}

export type TodoAddBtn = AddButton;