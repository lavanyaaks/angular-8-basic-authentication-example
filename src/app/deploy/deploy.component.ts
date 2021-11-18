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
  row = [
    {
      Name: "2DACE2",
      isRemoved: true,
      isEdited: true,
    },
    {
      Name: "2DACE",
      isRemoved: false,
      isEdited: true,
    },
    {
      Name: "2DACE1",
      isRemoved: true,
      isEdited: false,
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
          Name: "2DACE",
          isRemoved: false,
          isEdited: true,
        },
        {
          Name: "2DACE1",
          isRemoved: true,
          isEdited: false,
        },
        {
          Name: "2DACE2",
          isRemoved: true,
          isEdited: true,
        },
      ];
    } else if (this.order === "DESC") {
      this.row = [
        {
          Name: "2DACE2",
          isRemoved: true,
          isEdited: true,
        },
        {
          Name: "2DACE1",
          isRemoved: true,
          isEdited: true,
        },
        {
          Name: "2DACE",
          isRemoved: false,
          isEdited: false,
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

  editRow() {
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
}
