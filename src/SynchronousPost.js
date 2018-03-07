import axios from 'axios';
import store from 'store';
export default class SynchronousPost {
  constructor() {
    this._name = 'SynchronousPost';
    this.postData = this.postData;
  }
  get name() {
    return this._name;
  }
  postData(url, myData) {
    // Send a POST request
    let postData = {etlData: []};
    if (store.get('etlData')) {
      postData.etlData = store.get('etlData');
      store.remove('etlData');
    }
    postData.etlData.push(myData);
    axios({
      method: 'post',
      url: url,
      data: postData
    })
    .then(response => {
      // Do nothing
    })
    .catch(err => {
      console.log(err);
      if(store.get('etlData')) {
        let localData = store.get('etlData');
        store.set('etlData', [...store.get('etlData', ...postData.etlData)]);
      } else {
        store.set('etlData', postData.etlData);
      }
    })
  }
}
