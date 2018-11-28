import { Component, OnInit } from '@angular/core';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit {
  objectListData: any;
  constructor(private objectsService: ObjectService) {}
  ngOnInit() {
    this.getAllObjects();
  }

  getAllObjects() {
    const objectsList = this.objectsService.getAllObjects();
    this.success(objectsList);
  }
  success(data) {
    this.objectListData = data.data;
  }
  deleteobject(index: number) {
    // get confirm box for confirmation
    const r = confirm('Are you sure?');
    if (r) {
      this.objectsService.deleteobject(index);

      this.getAllObjects();
    }
  }
}
