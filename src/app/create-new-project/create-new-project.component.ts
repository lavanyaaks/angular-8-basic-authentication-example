import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import * as JSZip from "jszip";
import * as FileSaver from "file-saver";
@Component({
  selector: "app-create-new-project",
  templateUrl: "./create-new-project.component.html",
  styleUrls: ["./create-new-project.component.less"],
})
export class CreateNewProjectComponent implements OnInit {
  createProject: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = "";
  title;
  uploadFiles;
  //Project type:
  Type: any = ["C++", "Python", ".NET"];

  ideExtn: any = ["Visual Studio Code", "Docker file"];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router //private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    /*if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }*/
  }

  ngOnInit() {
    this.createProject = this.formBuilder.group({
      name: ["", Validators.required],
     // fname: ["", Validators.required],
      //fid: ["", Validators.required],
      nspace: ["", Validators.required],
      //version: ["", Validators.required],
      //mininstance: ["", Validators.required],
      description: ["", Validators.required],
      projectType: ["", Validators.required],
      projectExt: ["", Validators.required],
    });
  }

  changeType(e) {
    console.log(e.value);
    this.projectType.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeExtn(e) {
    console.log(e.value);
    this.projectExt.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get projectExt() {
    return this.createProject.get("projectExt");
  }

  get projectType() {
    return this.createProject.get("projectType");
  }

  get f() {
    return this.createProject.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (!this.createProject.valid) {
      return false;
    } else {
      //alert(JSON.stringify(this.createProject.value));
    }
  }
  download() {
    let zip = new JSZip();
    zip.file(
      "create.txt",
      "Name" +
        ":" +
        this.createProject.value.name +
        "\n" +
        "Namespace" +
        ":" +
        this.createProject.value.nspace +
        "\n" +
        "Description" +
        ":" +
        this.createProject.value.description +
        "\n" +
        "Project Type" +
        ":" +
        this.createProject.value.projectType +
        "\n" +
        "Project Extension" +
        ":" +
        this.createProject.value.projectExt +
        "\n"
    );
    const zipName = this.createProject.value.name;
    console.log(zipName);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, zipName.toString() + '.zip');
    });
  }
}
