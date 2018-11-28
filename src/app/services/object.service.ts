import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  objectsList = [
    {
      id: 1,
      name: 'Gowtham',
      title: 'Manager'
    },
    {
      id: 2,
      name: 'Nimish',
      title: 'CEO'
    },
    {
      id: 3,
      name: 'Tina',
      title: 'Employee'
    },
    {
      id: 4,
      name: 'John',
      title: 'Worker'
    }
  ];
  getAllObjects() {
    let objectList: any;
    if (
      localStorage.getItem('objects') &&
      localStorage.getItem('objects') !== ''
    ) {
      objectList = {
        code: 200,
        message: 'objects List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('objects'))
      };
    } else {
      this.getobjectData();
      objectList = {
        code: 200,
        message: 'objects List Fetched Successfully',
        data: JSON.parse(localStorage.getItem('objects'))
      };
    }
    return objectList;
  }
  getobjectData() {
    localStorage.setItem('objects', JSON.stringify(this.objectsList));
  }

  doRegisterObject(data, index) {
    const objectList = JSON.parse(localStorage.getItem('objects'));
    let returnData;
    console.log('index', index);
    if (index != null) {
      for (let i = 0; i < objectList.length; i++) {
        if (+index !== i && objectList[i].name === data.name) {
          returnData = {
            code: 503,
            message: 'Name Already In Use',
            data: null
          };
          return returnData;
        }
      }

      objectList[index] = data;
      localStorage.setItem('objects', JSON.stringify(objectList));
      returnData = {
        code: 200,
        message: 'object Successfully Updated',
        data: JSON.parse(localStorage.getItem('objects'))
      };
    } else {
      data.id = this.generateRandomID();
      for (let i = 0; i < objectList.length; i++) {
        if (objectList[i].name === data.name) {
          returnData = {
            code: 503,
            message: 'Name Already In Use',
            data: null
          };
          return returnData;
        }
      }
      objectList.unshift(data);

      localStorage.setItem('objects', JSON.stringify(objectList));

      returnData = {
        code: 200,
        message: 'object Successfully Added',
        data: JSON.parse(localStorage.getItem('objects'))
      };
    }
    return returnData;
  }

  deleteobject(index: number) {
    const objectList = JSON.parse(localStorage.getItem('objects'));

    objectList.splice(index, 1);

    localStorage.setItem('objects', JSON.stringify(objectList));

    const returnData = {
      code: 200,
      message: 'object Successfully Deleted',
      data: JSON.parse(localStorage.getItem('objects'))
    };

    return returnData;
  }

  getObjectDetails(index: number) {
    const objectList = JSON.parse(localStorage.getItem('objects'));

    const returnData = {
      code: 200,
      message: 'object Details Fetched',
      objectData: objectList[index]
    };

    return returnData;
  }

  generateRandomID() {
    const x = Math.floor(Math.random() * Math.random() * 9999);
    return x;
  }
}
