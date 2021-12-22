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
  selectedEntityId = '';
  volumeValue = "";
  selectedvolumeValue = '';
  s :string = 'heloo';

  ideExtn: any = ["Visual Studio Code", "Dockerfile"];

  fileContent: string = '';
  arr: any;
  namspaceStr: string = '';
  convertedArr: any;

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
    this.volumeValue = e.target.value;
    this.selectedvolumeValue = e.target.value;
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

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;

    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result as string;

      return self.fileContent.toString();
      //console.log(fileReader.result.toString);

      //self.fileContent.toString();

      //console.log(self.fileContent.match(/namespace:(.*)$/gm));
     // self.arr = self.fileContent.match(/namespace:(.*)$/gm);
      //self.namspaceStr = self.arr[0].split(':').slice(1).toString();
      //console.log(self.namspaceStr);
    };
    fileReader.readAsText(file);
  }

  download() {
    let zip = new JSZip();
    zip.file(
      "AppSpec.yaml",
      "app-name" +
      ":" +
      " " +
      "\n" +
      "func-name" +
      ":" +
      " " +
      "\n" +
      "func-id" +
      ":" +
      " " +
      "\n" +
      "namespace" +
      ":" + "\t" +
      this.createProject.value.nspace +
      "\n" +
      "containers" +
      ":" +
      "\n" +
      "\t" +
      "image" +
      ":" +
      " " +
      "\n" +
      "resources" +
      ":" +
      "\n" +
      "\t" +
      "requests" +
      ":" +
      " " +
      "\n" +
      "\t\t" +
      "cpu" +
      ":" + "\t" +
      2 +
      "\n" +
      "\t\t" +
      "gpu" +
      ":" + "\t" +
      0 +
      "\n" +
      "\t\t" +
      "memory" +
      ":" + "\t" +
      512 +
      "\n" +
      "version" +
      ":" +
      "" +
      "\n" +
      "max-instances" +
      ":" +
      "" +
      "\n" +
      "min-instances" +
      ":" +
      "" +
      "\n" +
      "volume" +
      ":" +
      "\n" +
      "\t" +
      "path" +
      ":" +
      " " +
      "\n" +
      "target-client" +
      ":" +
      "" +
      "\n" +
      "deadline" +
      ":" + "\t" +
      -1 + "\t" + '# -1- means indefinite time' +
      "\n"
    );
    if (this.createProject.value.projectExt == "Dockerfile") {
      zip.file("DockerFile",this.fileContent );
    }
    if (this.createProject.value.projectExt == "Visual Studio Code") {
      if (this.createProject.value.projectType == "C++")
       {
        zip.folder(".vscode").file("DockerFile", "").file(".devcontainer.json", "");
       }
       if (this.createProject.value.projectType == "Python")
       {
        zip.folder(".vscode").file("DockerFile", "").file(".devcontainer.json", "");
       }
       if (this.createProject.value.projectType == ".NET")
       {
        zip.folder(".vscode").file("DockerFile", "").file(".devcontainer.json", "");
       }

    }
    const zipName = this.createProject.value.nspace;
    console.log(zipName);
    zip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, zipName.toString() + '.zip');
    });

  }
}