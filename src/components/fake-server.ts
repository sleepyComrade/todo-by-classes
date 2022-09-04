import { ServerTaskItem } from "./i-server-item";

class FakeServer{
  _data;
  idInitial: number;

  constructor(initial: ServerTaskItem[]){
    this._data = JSON.parse(JSON.stringify(initial));
    this.idInitial = this._data.length;
  }

  _fakeSend(data: ServerTaskItem[]): Promise <string>{
    return new Promise((res, rej)=>{
      setTimeout(()=>{
        
        if (Math.random()< 0.1) {
          rej('Fake server reject');
        } else {
          res(JSON.stringify(data));
        }
      }, Math.random()*1000 + 50);
    });
  }

  getList(){
    return this._fakeSend(this._data);
  }

  addItem(itemData: ServerTaskItem){
    this._data.push(itemData);
    return this._fakeSend(this._data);
  }

  removeItem(id: number){
    let num;
    this._data.forEach((el: ServerTaskItem, i: number) => {
      if (el.id === id) {
        num = i;
      }
    })
    if (num !== undefined) {
      this._data.splice(num, 1);
    }
    return this._fakeSend(this._data);
  }

  editItem(id: number, itemData: ServerTaskItem){
    this._data.splice(id, 1, itemData);
    return this._fakeSend(this._data);
  }

  removeErrItem() {
    this._data.pop();
  }

  correctIdCount() {
    this.idInitial--;
  }

  getIdNum(itemData: ServerTaskItem) {
    itemData.id = this.idInitial;
    this.idInitial++;
  }
}

const initialData: ServerTaskItem[] = [
  {
    name: 'a',
    done: true,
  },
  {
    name: 'abc',
    done: false
  },
  {
    name: 'sjfdk',
    done: false
  }
];

export type Api = FakeServer;
export const api = new FakeServer(initialData);