export class TaskList {
  list
  constructor(parent: { wrap: HTMLElement }) {
    this.list = document.createElement('div');
    this.list.className = 'task-list';
    parent.wrap.append(this.list);
  }
}

export type TodoTaskList = TaskList;