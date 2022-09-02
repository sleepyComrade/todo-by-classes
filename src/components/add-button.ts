export class AddButton {
  parent: HTMLElement;
  list: HTMLElement;
  button
  constructor(click: (parent: HTMLElement, list: HTMLElement, initialData: { name: string, done: boolean, id?: number } | undefined, isNew: boolean) => HTMLElement, parent: any, list: HTMLElement) {
    this.parent = parent;
    this.list = list;
    this.button = document.createElement('button');
    this.button.className = 'openButton';
    this.button.textContent = '+';
    this.button.onclick = () => click(this.parent, this.list, undefined, true);    
    parent.wrap.insertBefore(this.button, parent.wrap.firstChild);
  }
}