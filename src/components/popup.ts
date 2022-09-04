import { Task } from "./task";
import { Api } from "./fake-server";
import { ServerTaskItem } from "./i-server-item";
import { TodoTaskList } from "./task-list";
import { Wrap } from "./main-wrap";

export class PopUp {
  api: Api;
  parent: Wrap;
  taskList: TodoTaskList;
  showPopup: (parent: Wrap, list: TodoTaskList, initialData: ServerTaskItem, isNew: boolean) => HTMLElement;
  overlay
  popup
  button
  input
  state
  applybutton
  checkbox
  stateDesc
  isNew
  itemData: ServerTaskItem;
  onClose: any;
  constructor(parent: Wrap, taskList: TodoTaskList, showPopup: (parent: Wrap, list: TodoTaskList, initialData: ServerTaskItem, isNew: boolean) => HTMLElement, api: Api, initialData: ServerTaskItem, isNew: boolean) {
    this.api = api;
    this.parent = parent;
    this.taskList = taskList;
    this.showPopup = showPopup;
    this.itemData = !initialData ? {name: '', done: false, id: undefined} : initialData;
    this.isNew = isNew;
    
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    this.overlay.onclick = () => this.closePopup();

    this.popup = document.createElement('div');
    this.popup.className = 'popup-wrap';

    this.button = document.createElement('button');
    this.button.className = 'close-button';
    this.button.textContent = 'x';
    this.button.onclick = () => this.closePopup();
    this.popup.append(this.button);

    this.input = document.createElement('input');
    this.input.className = 'popup-input';
    this.input.setAttribute('type', 'text');
    this.input.placeholder = 'add a task';
    if (this.itemData.name) {
      this.input.value = this.itemData.name;
    }
    this.input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.applyTask();
      }
    }
    this.popup.append(this.input);

    this.state = document.createElement('div');
    this.state.className = 'state-wrap';
    this.popup.append(this.state);

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.className = 'state-checkbox';
    if (this.itemData.done) {
      this.checkbox.checked = true;
    }
    this.checkbox.onchange = () => this.itemData.done = this.checkbox.checked ? true : false;
    this.state.append(this.checkbox);

    this.stateDesc = document.createElement('p');
    this.stateDesc.textContent = 'Done';
    this.state.append(this.stateDesc);

    this.applybutton = document.createElement('button');
    this.applybutton.className = 'apply-button';
    this.applybutton.textContent = 'Ok';
    this.applybutton.onclick = () => this.applyTask();
    this.popup.append(this.applybutton);
  }

  openPopup() {
    this.parent.wrap.append(this.overlay);
    this.parent.wrap.append(this.popup);
    this.input.focus();
  }

  closePopup() {
    this.overlay.remove();
    this.popup.remove();
  }

  applyTask() {
    if (this.itemData === undefined) {
      this.itemData = {name: '', done: false, id: undefined};
    }
    this.itemData.name = this.input.value;
    if (!this.input.value) {
      alert('add a task please');
    } else if (this.isNew) {
      this.api.getIdNum(this.itemData);

      this.applybutton.textContent = 'loading...';
      this.api.addItem(this.itemData).then((res) => {
        console.log(res);
        this.applybutton.textContent = 'Ok';
        const task = new Task(this.taskList, this.showPopup, this.input.value, this.parent, this.api, this.itemData);
        this.closePopup();
      }).catch((err) => {
        console.log('rejected');
        this.applybutton.textContent = 'rejected';
        this.api.removeErrItem();
        this.api.correctIdCount();
      });
    } else if (!this.isNew) {
      this.applybutton.textContent = 'loading...';
      if (this.itemData.id) {
        this.api.editItem(this.itemData.id, this.itemData).then((res) => {
          console.log(res);
          this.applybutton.textContent = 'Ok';
          this.onClose(this.itemData.done, this.input.value);
          this.closePopup();
        }).catch((err) => {
          console.log('rejected');
          this.applybutton.textContent = 'rejected';
          this.api.removeErrItem();
        });
      }
    }
  }
}

export type TodoPopup = PopUp;