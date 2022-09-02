export class Task {
  api: any;
  itemData: { name: string, done: boolean, id?: number };
  parent: any;
  value: string;
  mainWrap: HTMLElement;
  task
  text
  control
  closeBtn
  editBtn
  constructor(parent: HTMLElement, edit: (parent: HTMLElement, list: HTMLElement, initialData: { name: string, done: boolean, id?: number } | undefined, isNew: boolean) => HTMLElement, value: string, mainWrap: HTMLElement, api: any, itemData: { name: string, done: boolean, id?: number }) {
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
      this.api.removeItem(this.itemData.id).then((res: any) => {
        this.closeBtn.textContent = 'x';
        this.task.remove();
      }).catch((err: any) => {
        console.log('rejected');
        this.closeBtn.textContent = 'rejected';
      });
    };
    this.control.append(this.closeBtn);

    this.editBtn = document.createElement('button');
    this.editBtn.className = 'edit-task-button';
    this.editBtn.textContent = 'edit';
    this.editBtn.onclick = () => {
      const popUp: any = edit(this.mainWrap, this.parent, this.itemData, false);
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