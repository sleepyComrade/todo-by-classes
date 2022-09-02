class FakeServer{
  _data;
  idInitial: number;

  constructor(initial: { name: string, done: boolean, id?: number }[]){
    this._data = JSON.parse(JSON.stringify(initial));
    this.idInitial = this._data.length;
  }

  _fakeSend(data: { name: string, done: boolean, id?: number }[]){
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

  addItem(itemData: { name: string, done: boolean, id?: number }){
    this._data.push(itemData);
    return this._fakeSend(this._data);
  }

  removeItem(id: number){
    let num;
    this._data.forEach((el: { name: string, done: boolean, id?: number }, i: number) => {
      if (el.id === id) {
        num = i;
      }
    })
    if (num !== undefined) {
      this._data.splice(num, 1);
    }
    return this._fakeSend(this._data);
  }

  editItem(id: number, itemData: { name: string, done: boolean, id?: number }){
    this._data.splice(id, 1, itemData);
    return this._fakeSend(this._data);
  }

  removeErrItem() {
    this._data.pop();
  }

  correctIdCount() {
    this.idInitial--;
  }

  getIdNum(itemData: { name: string, done: boolean, id?: number }) {
    itemData.id = this.idInitial;
    this.idInitial++;
  }
}

const initialData: { name: string, done: boolean, id?: number }[] = [
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
export const api = new FakeServer(initialData);