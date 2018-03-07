import axios from 'axios';
import store from 'store';
const etlStoreDataConstant = require('../constants/SynchronousPostConstants').etlDataConstant;
export default class SynchronousPost {
  constructor() {
    this._name = 'SynchronousPost';
    this.postData = this.postData;
    this.getAndRemoveDataFromStore = this.getAndRemoveDataFromStore;
    this.getDataFromStore = this.getDataFromStore;
    this.setDataInStore = this.setDataInStore;
    this.removeDataFromStore = this.removeDataFromStore;
    this.getAndStoreDataToStore = this.getAndStoreDataToStore;
  }
  get name() {
    return this._name;
  }
  getAndRemoveDataFromStore(value) {
    let returnData
    if (this.getDataFromStore(value)) {
      returnData = this.getDataFromStore(value)
      this.removeDataFromStore(value)
    } else {
      // Do nothing
    }
    return returnData;
  }
  getAndStoreDataToStore(value, data) {
    if(this.getDataFromStore(value)) {
      this.setDataInStore(value, [...this.getDataFromStore(value), ...data]);
    } else {
      this.setDataInStore(value, data);
    }
  }
  getDataFromStore(value) {
    return store.get(value)
  }
  setDataInStore(value, data) {
    store.set(value, data)
  }
  removeDataFromStore(value) {
    store.remove(value)
  }
  postData(url, myData) {
    // Send a POST request
    let postData = {etlData: []}
    postData.etlData = this.getAndRemoveDataFromStore(etlStoreDataConstant) || postData.etlData
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
      this.getAndStoreDataToStore(etlStoreDataConstant, postData.etlData)
    })
  }
}
