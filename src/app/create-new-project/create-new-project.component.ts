import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.less']
})
export class CreateNewProjectComponent implements OnInit {

  createProject:FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    //private authenticationService: AuthenticationService
) { 
    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }*/
}

  ngOnInit() {
    this.createProject = this.formBuilder.group({
      name: ['', Validators.required],
      fname: ['', Validators.required],
      fid: ['', Validators.required],
      nspace: ['', Validators.required],
      version: ['', Validators.required],
      mininstance:['', Validators.required],
  });


  }

  get f() { return this.createProject.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
   
}

}
