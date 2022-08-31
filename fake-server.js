class FakeServer{
  _data;
  
  constructor(initial){
    this._data = JSON.parse(JSON.stringify(initial));
    this.idInitial = this._data.length;
  }

  _fakeSend(data){
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

  addItem(itemData){
    this._data.push(itemData);
    return this._fakeSend(this._data);
  }

  removeItem(id){
    let num;
    this._data.forEach((el, i) => {
      if (el.id === id) {
        num = i;
      }
    })
    if (num !== undefined) {
      this._data.splice(num, 1);
    }
    return this._fakeSend(this._data);
  }

  editItem(id, itemData){
    this._data.splice(id, 1, itemData);
    return this._fakeSend(this._data);
  }

  removeErrItem() {
    this._data.pop();
  }

  correctIdCount() {
    this.idInitial--;
  }

  getIdNum(itemData) {
    itemData.id = this.idInitial;
    this.idInitial++;
  }
}

const initialData = [
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