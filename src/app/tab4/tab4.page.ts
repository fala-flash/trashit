import { Component, OnInit, Injectable } from "@angular/core";



@Component({
  selector: "app-tab2",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
@Injectable({
  providedIn: 'root'
})

export class Tab4Page implements OnInit {
  plasticStatus: string = "";
  paperStatus: string = "";

  constructor() {}
  ngOnInit(): void {  }

  getPlasticStatus(notifyString): string {
    if (notifyString[1] == "0") {
      this.plasticStatus = "Empty";
    } else if (notifyString[1] == "2") {
      this.plasticStatus = "Full";
    } else if (notifyString[1] == "1") {
      this.plasticStatus = "50% Full";
    } else this.plasticStatus = "Info not available";
    return this.plasticStatus;
  }

  getPaperStatus(notifyString): string {
    if (notifyString[3] == "0") {
      this.paperStatus = "Empty";
    } else if (notifyString[3] == "2") {
      this.paperStatus = "Full";
    } else if (notifyString[3] == "1") {
      this.paperStatus = "50% Full";
    } else this.paperStatus = "Info not available";
    return this.paperStatus;
  }
}
