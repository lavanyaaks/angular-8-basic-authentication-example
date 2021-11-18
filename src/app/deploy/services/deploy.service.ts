import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root",
})
export class DeployService {
  api = "https://www.google.com";
  constructor(private http: HttpClient) {}
  getManageProjects(manageProject) {
    //console.log(manageProject);
    return this.http.get(this.api, { params: manageProject });
  }
}
