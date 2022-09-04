import { Api } from "./fake-server";
import { ServerTaskItem } from "./i-server-item";
import { TodoTaskList } from "./task-list";
import { Wrap } from "./main-wrap";

export class Task {
  api: Api;
  itemData: ServerTaskItem;
  parent: TodoTaskList;
  value: string;
  mainWrap: Wrap;
  task
  text
  control
  closeBtn
  editBtn
  constructor(parent: TodoTaskList, edit: (parent: Wrap, list: TodoTaskList, initialData: ServerTaskItem, isNew: boolean) => any, value: string, mainWrap: Wrap, api: Api, itemData: ServerTaskItem) {
    this.api = api;
    this.itemData = itemData;
    this.parent = parent;
    this.value = value;
    this.mainWrap = mainWrap;
    this.task = document.createElement('div');
    this.task.className = 'task-wrap';

    this.parent.list.append(this.task);

    this.text = document.createElement('p');
    this.text.textContent = this.value;
    if (this.itemData.done) {
      this.text.className = 'task-done';
    }
    this.task.append(this.text);

    this.control = document.createElement('div');
    this.control.className = 'controls-wrap';
    this.task.append(this.control);

    this.closeBtn = document.createElement('button');
    this.closeBtn.className = 'close-task-button';
    this.closeBtn.textContent = 'x';
    this.closeBtn.onclick = () => {
      this.closeBtn.textContent = 'loading...';
      if (this.itemData.id) {
        this.api.removeItem(this.itemData.id).then((res) => {
          this.closeBtn.textContent = 'x';
          this.task.remove();
        }).catch((err) => {
          console.log('rejected');
          this.closeBtn.textContent = 'rejected';
        });
      }
    };
    this.control.append(this.closeBtn);

    this.editBtn = document.createElement('button');
    this.editBtn.className = 'edit-task-button';
    this.editBtn.textContent = 'edit';
    this.editBtn.onclick = () => {
      const popUp = edit(this.mainWrap, this.parent, this.itemData, false);
      popUp.onClose = (done: boolean, value: string) => {
        if (done) {
          this.text.classList.add('task-done');
        } else {
          this.text.classList.remove('task-done');
        }
        this.text.textContent = value;
      }
    }
    this.control.append(this.editBtn);
  }
}