import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ObjectService } from 'src/app/services/object.service';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.scss']
})
export class AddObjectComponent implements OnInit {
  // create objectAddForm of type FormGroup
  private objectAddForm: FormGroup;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private objectService: ObjectService
  ) {
    // Check for route params
    this.route.params.subscribe(params => {
      this.index = params['id'];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index != null && this.index !== undefined) {
        this.getObjectDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  ngOnInit() {}

  // Submit object details form
  doRegister() {
    if (this.index && this.index != null && this.index !== undefined) {
      this.objectAddForm.value.id = this.index;
    } else {
      this.index = null;
    }
    const objectRegister = this.objectService.doRegisterObject(
      this.objectAddForm.value,
      this.index
    );
    if (objectRegister) {
      if (objectRegister.code === 200) {
        this.router.navigate(['/']);
      } else {
      }
    }
  }

  // If this is update form, get user details and update form
  getObjectDetails(index: number) {
    const objectDetail = this.objectService.getObjectDetails(index);
    this.createForm(objectDetail);
  }

  // If this is update request then auto fill form
  createForm(data) {
    if (data == null) {
      this.objectAddForm = this.formBuilder.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ]
      });
    } else {
      this.objectAddForm = this.formBuilder.group({
        name: [
          data.objectData.name,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ],
        title: [
          data.objectData.title,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)
          ]
        ]
      });
    }
  }
}
