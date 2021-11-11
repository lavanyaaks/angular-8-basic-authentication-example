import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {

  sourcePath =
  "https://wiki.ith.intel.com/display/hdmtdiagspxie/2DACE+R5-+Project+setup+document?preview=%2F1983243378%2F1983243382%2F2dace-code+containers+Manual.docx";
   fileName = "sample.pdf";

  constructor() { }

  ngOnInit() {
  }

}
