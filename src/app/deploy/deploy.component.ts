import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "@app/_services";
import { SortOrderEnum } from "./enums/sort-order.enum";
import { HttpParams } from "@angular/common/http";
import { DeployService } from "./services/deploy.service";
@Component({
  selector: "app-deploy",
  templateUrl: "./deploy.component.html",
  styleUrls: ["./deploy.component.less"],
})
export class DeployComponent implements OnInit {
  sourcePath =
    "https://wiki.ith.intel.com/display/hdmtdiagspxie/2DACE+R5-+Project+setup+document?preview=%2F1983243378%2F1983243382%2F2dace-code+containers+Manual.docx";
  fileName = "sample.pdf";
  title;
  uploadFiles;
  userRole;
  order = "NONE";
  httpParam = new HttpParams();
  sortList: Map<string, string> = new Map();
  version = ["1.0", "2.0", "3.0"];
  selectedVersion = "--SelectVersion--";
  selectedProjectArray = [];
  projectName;
  row = [
    {
      id: 1,
      Name: "2DACE2",
    },
    {
      id: 2,
      Name: "2DACE",
    },
    {
      id: 3,
      Name: "2DACE1",
    },
  ];
  constructor(
    private router: Router,
    private userService: UserService,
    private deployService: DeployService
  ) {}
  ngOnInit() {
    this.userService.getAll().subscribe((user) => {
      this.userRole = user[0].username;
    });
  }

  loadData() {
    if (this.order === "ASC") {
      this.row = [
        {
          id: 1,
          Name: "2DACE",
        },
        {
          id: 2,
          Name: "2DACE1",
        },
        {
          id: 3,
          Name: "2DACE2",
        },
      ];
    } else if (this.order === "DESC") {
      this.row = [
        {
          id: 1,
          Name: "2DACE2",
        },
        {
          id: 2,
          Name: "2DACE1",
        },
        {
          id: 3,
          Name: "2DACE",
        },
      ];
    }
    let nameSorting;
    if (this.sortList) {
      this.httpParam = this.httpParam.delete("order");
      this.sortList.forEach((val, key) => {
        nameSorting = key + ":" + val;
      });
      if (this.sortList.size > 0) {
        this.httpParam = this.httpParam.set("sort_by", nameSorting);
      }
      this.deployService.getManageProjects(this.httpParam).subscribe((res) => {
        console.log(res);
      });
    }
  }

  deleteRow(x: any) {
    const delBtn = confirm(" Do you want to delete ?");
    if (delBtn === true) {
      this.row.splice(x, 1);
    }
  }

  editRow(itemId) {
    // API CALL WITH PROJECT NAME
    //const navigationDetails: string[] = ["/edit"];
    //this.router.navigate(navigationDetails);
    this.router.navigate(['edit', itemId]);
  }

  releaseRow() {
    // API CALL WITH PROJECT NAME
    const navigationDetails: string[] = ["/edit"];
    this.router.navigate(navigationDetails);
  }

  handleFileInput(files) {
    this.uploadFiles = files;
  }
  changeOrder(): void {
    if (this.order === SortOrderEnum.Asc) {
      this.order = SortOrderEnum.Desc;
    } else {
      this.order = SortOrderEnum.Asc;
    }
    this.sortList.set("name", this.order);
    this.loadData();
  }
  getVersion(value, name) {
    this.selectedVersion = value;
    if (!this.selectedProjectArray.includes(value)) {
      this.selectedProjectArray.push(value);
    }
    const noSelected = name.split('-');
    if (noSelected[0] === 'none') {
     const projectIndex = this.selectedProjectArray.indexOf(+noSelected[1]);
     this.selectedProjectArray.splice(projectIndex, 1);
    }
  }
}
