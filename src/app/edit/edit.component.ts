import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray,
} from "@angular/forms";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.less"],
})
export class EditComponent implements OnInit {
  editProject: FormGroup;
  loading = false;
  myDropDown: string;
  resourceList: string;
  networkList: string;
  editUrl;
  itemId;
  containerValue = "";
  selectedcontainerValue='';
  selectedResourcesValue = [];
  resourcesValue = "";
  volumeValue = "";
  selectedvolumeValue = '';
  resourceArray = ["a"];
  // Container Names
  Value: any = ["image1", "image2"];
  //Resources Names
  resourceVal: any = ["cpu", "memory", "gpu"];
  labelResource = [];
  // Network List value
  networkListVal: any = ["path1", "path2"];
  deleteLabel;
  // Blocking operation List
  oprList: any = ["true", "false"];
  selectedrequests = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editProject = new FormGroup({
      name: new FormControl("2DACE", [Validators.required]),
      funcName: new FormControl("Deploy", Validators.required),
      funcId: new FormControl("12", [
        Validators.required,
        Validators.pattern(
          /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
        ),
      ]),
      version: new FormControl(1.1, Validators.required),
      namespace: new FormControl("kube", Validators.required),
      container: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
      resources: new FormControl(" ", [Validators.required]),
      //request: ["", [Validators.required]],
      requests: new FormArray([]),
      mxinstances: new FormControl(" ", [Validators.required]),
      mninstances: new FormControl(" ", [Validators.required]),
      targetclient: new FormControl(" ", [Validators.required]),
      blckop: new FormControl(" ", [Validators.required]),
      volume: new FormControl(" ", [Validators.required]),
    });

    this.editProject.get("requests").valueChanges.subscribe((item) => {
      this.selectedrequests = item;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.itemId = params.get("id");
      if (this.itemId) {
        this.editProject.controls["name"].disable();
        this.editProject.controls["funcName"].disable();
        this.editProject.controls["funcId"].disable();
        this.editProject.controls["namespace"].disable();
        this.container.setValue('image1');
        this.volume.setValue('path2');
        this.container.setValue('image2');
        this.editProject.controls["mxinstances"].patchValue('updateMax');
        this.editProject.controls["mninstances"].patchValue('updateMin');
        this.editProject.controls["targetclient"].patchValue('target');
       // this.editProject.controls["mxinstances"].patchValue('updateMax');
        //this.targetClient.setValue('update Target');
        this.selectedcontainerValue = this.editProject.get('container').value;
        this.selectedvolumeValue = this.editProject.get('volume').value;
        setTimeout(() => {
          this.labelResource = ['1: cpu', '2: memory'];
          this.selectedrequests = ['1: cpu', '2: memory'];
          this.selectedrequests.forEach(element => {
          const control = new FormControl(element, [Validators.required]);
          (<FormArray> this.editProject.get('requests')).push(control);
        });
      }, 0);
      }
    });
  }

  changeVal(e) {
    this.containerValue = e.target.value;
    this.selectedcontainerValue = e.target.value;
    setTimeout(() => {
    this.container.setValue(e.target.value, {
      onlySelf: true,
    });
  }, 0);
  }

  changeRequest(e) {
    setTimeout(() => {
      if (!this.selectedrequests.includes(e.target.value)) {
        console.log(this.selectedrequests);
        this.labelResource.push(e.target.value);
        const control = new FormControl(e.target.value, [Validators.required]);
        (<FormArray>this.editProject.get("requests")).push(control);
      }
    }, 0);
    this.resourcesValue = e.target.value;
    this.resources.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeVolume(e) {
    this.volumeValue = e.target.value;
    setTimeout(() => {
    this.volume.setValue(e.target.value, {
      onlySelf: true,
    });
  }, 0);
  }

  changeOperation(e) {
    this.operation.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get operation() {
    return this.editProject.get("blckop");
  }

  get resources() {
    return this.editProject.get("resources");
  }

  get container() {
    return this.editProject.get("container");
  }

  get volume() {
    return this.editProject.get("volume");
  }
  get requests(): FormArray {
    return this.editProject.get("requests") as FormArray;
  }
  OnDelete(i: number, request): void {
    this.labelResource.splice(i, 1);
    (<FormArray>this.editProject.get("requests")).removeAt(i);
    this.requests.markAsDirty();
    this.resources.setValue("undefined");
    setTimeout(() => {
      if (this.selectedrequests.length > 1) {
        this.deleteLabel = i;
      }
    }, 0);
  }
  onSubmit() {
    //console.log(this.editProject.value);
  }
}
