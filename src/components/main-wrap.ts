export class MainWrap {
  wrap
  constructor(parent: HTMLElement) {
    this.wrap = document.createElement('div');
    this.wrap.className = 'wrapper';
    parent.append(this.wrap);
  }
}