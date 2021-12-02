import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
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
containerValue = '';
resourcesValue = '';
volumeValue = '';
  // Container Names
  Value: any = ["image1", "image2"];
  //Resources Names
  resourceVal: any = ["cpu", "memory", "gpu"];

  // Network List value
  networkListVal: any = ["path1", "path2"];

  // Blocking operation List
  oprList: any = ["true", "false"];

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    // this.editProject = new FormGroup({
    //   name: new FormControl('2DACE', [
    //     Validators.required,
    //   ]),
    //   funcId: new FormControl('12', [
    //     Validators.required,
    //     Validators.pattern(
    //               /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
    //             ),
    //   ]),
    // });
    this.editProject = this.formBuilder.group({
      name: ["2DACE", Validators.required],
      funcName: ["Deploy", Validators.required],
      funcId: [
        "12",
        [
          Validators.required,
          Validators.pattern(
            /^[A-Za-z]{1,16}([ ]?[a-zA-Z]{0,16})([ ]?[a-zA-Z]{0,16})$/
          ),
        ],
      ],
      version: [1.1, Validators.required],
      namespace: ["kube", Validators.required],
      container: ["", [Validators.required]],
      image: ["", [Validators.required]],
      resources: ["", [Validators.required]],
      request: ["", [Validators.required]],
      mxinstances: ["", [Validators.required]],
      mninstances: ["", [Validators.required]],
      targetclient: ["", [Validators.required]],
      blckop: ["", [Validators.required]],
      volume: ["", [Validators.required]],
    });
  }

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.itemId = params.get('id');
    if (this.itemId) {
      this.editProject.controls['name'].disable();
      this.editProject.controls['funcName'].disable();
      this.editProject.controls['funcId'].disable();
      this.editProject.controls['namespace'].disable();
    }
  });
  }

  changeVal(e) {
    this.containerValue = e.target.value;
    this.container.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeRequest(e) {
    this.resourcesValue = e.target.value;
    this.resources.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  changeVolume(e) {
    this.volumeValue = e.target.value;
    this.volume.setValue(e.target.value, {
      onlySelf: true,
    });
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

  onSubmit() {
    console.log(this.editProject.value);
  }
}
