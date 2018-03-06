import axios from 'axios';
import PSG from './psg.js';
export default class Madrid {
  constructor() {
    this._name = 'Madrid';
    this.postData = this.postData;
    let psgObject = new PSG();
    psgObject.browserStorageOverrider();
  }
  get name() {
    return this._name;
  }
  postData(url, myData) {
    // Send a POST request
    let postData = {etlData: []};
    if (localStorage.etlData && localStorage.etlData) {
      postData.etlData = JSON.parse(localStorage.etlData.slice());
      localStorage.etlData = JSON.stringify([]);
    }
    console.log("THE POST DATA IS: ", postData)
    postData.etlData.push(myData);
    axios({
      method: 'post',
      url: url,
      data: postData
    })
    .then(response => {
      console.log("The response is: ", response)
      // Do nothing
    })
    .catch(err => {
      console.log(err)
      if(localStorage.etlData) {
        console.log("1", localStorage.etlData);
        let localData = JSON.parse(localStorage.etlData);
        localData.push(postData.etlData);
        console.log("2", localStorage.etlData);
        console.log("2.1", localData[0]);
        localStorage.etlData = JSON.stringify(localData[0]);
        console.log("3", localStorage.etlData);
      } else {
        localStorage.etlData = JSON.stringify(postData.etlData);
        console.log("4", localStorage.etlData);
      }
    })
  }
}
