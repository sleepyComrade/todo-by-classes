import {
  api
} from "./fake-server.js";

class MainWrap {
  wrap
  constructor(parent) {
    this.wrap = document.createElement('div');
    this.wrap.className = 'wrapper';
    parent.append(this.wrap);
  }
}

class PopUp {
  overlay
  popup
  button
  input
  state
  applybutton
  checkbox
  stateDesc
  isDone
  isNew
  itemData
  constructor(parent, taskList, showPopup, api, initialData, isNew) {
    this.api = api;
    this.parent = parent;
    this.taskList = taskList;
    this.showPopup = showPopup;
    this.itemData = !initialData ? {name: '', done: '', id: ''} : initialData;
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
    this.checkbox.onchange = () => this.isDone = this.checkbox.checked ? true : false;
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
      this.itemData = {};
    }
    this.itemData.name = this.input.value;
    this.itemData.done = this.isDone ? true : false;
    if (!this.input.value) {
      alert('add a task please');
    } else if (this.isNew) {
      this.api.getIdNum(this.itemData);

      this.applybutton.textContent = 'loading...';
      this.api.addItem(this.itemData).then(res => {
        console.log(res);
        this.applybutton.textContent = 'Ok';
        const task = new Task(this.taskList, this.showPopup, this.input.value, this.parent, this.api, this.itemData);
        this.closePopup();
      }).catch(err => {
        console.log('rejected');
        this.applybutton.textContent = 'rejected';
        this.api.removeErrItem();
        this.api.correctIdCount();
      });
    } else if (!this.isNew) {
      this.applybutton.textContent = 'loading...';
      this.api.editItem(this.itemData.id, this.itemData).then(res => {
        console.log(res);
        this.applybutton.textContent = 'Ok';
        this.onClose(this.itemData.done, this.input.value);
        this.closePopup();
      }).catch(err => {
        console.log('rejected');
        this.applybutton.textContent = 'rejected';
        this.api.removeErrItem();
      });
    }
  }
}

class AddButton {
  button
  constructor(click, parent, list) {
    this.parent = parent;
    this.list = list;
    this.button = document.createElement('button');
    this.button.className = 'openButton';
    this.button.textContent = '+';
    this.button.onclick = () => click(this.parent, this.list, undefined, true);
    parent.wrap.insertBefore(this.button, parent.wrap.firstChild);
  }
}

class TaskList {
  list
  constructor(parent) {
    this.list = document.createElement('div');
    this.list.className = 'task-list';
    parent.wrap.append(this.list);
  }
}

class Task {
  task
  text
  control
  closeBtn
  editBtn
  isDone
  constructor(parent, edit, value, mainWrap, api, itemData) {
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
      this.api.removeItem(this.itemData.id).then(res => {
        this.closeBtn.textContent = 'x';
        this.task.remove();
      }).catch(err => {
        console.log('rejected');
        this.closeBtn.textContent = 'rejected';
      });
    };
    this.control.append(this.closeBtn);

    this.editBtn = document.createElement('button');
    this.editBtn.className = 'edit-task-button';
    this.editBtn.textContent = 'edit';
    this.editBtn.onclick = () => {
      const popUp = edit(this.mainWrap, this.parent, this.itemData, false);
      popUp.onClose = (done, value) => {
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

class Todo {
  constructor(api) {
    this.api = api;
    this.mainWrap = new MainWrap(document.body);
    this.taskList = new TaskList(this.mainWrap);
    this.showPopup = (parent, list, initialData, isNew) => {
      const popUp = new PopUp(parent, list, this.showPopup, this.api, initialData, isNew);
      popUp.openPopup();
      return popUp;
    }
    this.addButton = new AddButton(this.showPopup, this.mainWrap, this.taskList);
  }
}

const todo = new Todo(api);