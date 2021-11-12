import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.less']
})
export class DeployComponent implements OnInit {

  sourcePath =
  "https://wiki.ith.intel.com/display/hdmtdiagspxie/2DACE+R5-+Project+setup+document?preview=%2F1983243378%2F1983243382%2F2dace-code+containers+Manual.docx";
   fileName = "sample.pdf";
   
  constructor(private router: Router) { }

  ngOnInit() {
  }

  row = [
    {
    Name : '2DACE',
    },
    {
      Name : '2DACE1',
    },
    {
      Name : '2DACE2',
    }
  ];

  
  deleteRow(x: any){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.row.splice(x, 1 );
    }   
  } 

  editRow(){
    //API CALL WITH PROJECT NAME
    const navigationDetails: string[] = ['/edit'];
    this.router.navigate(navigationDetails);
  } 
}

