export class MainWrap {
  wrap
  constructor(parent: HTMLElement) {
    this.wrap = document.createElement('div');
    this.wrap.className = 'wrapper';
    parent.append(this.wrap);
  }
}

export type Wrap = MainWrap;