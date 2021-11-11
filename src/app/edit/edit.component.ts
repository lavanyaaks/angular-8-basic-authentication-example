import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder } from "@angular/forms"


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.less']
})
export class EditComponent implements OnInit {
  editProject: FormGroup;
  loading = false;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {

    this.editProject = this.formBuilder.group({
      name:['2DACE', Validators.required],
      funcName: ["Deploy",Validators.required,],
      funcId: ["12", [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        )
      ]],
      version:[1.1, Validators.required],
      namespace:['kube', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.editProject.value)
  }

}
