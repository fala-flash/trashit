import { Component, OnInit } from "@angular/core";

const notifyString: string = "p0c1";

@Component({
  selector: "app-tab2",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  plasticStatus: string = "";
  paperStatus: string = "";

  constructor() {}
  ngOnInit(): void {
    this.getPlasticStatus();
    this.getPaperStatus();
  }

  getPlasticStatus(): string {
    if (notifyString[1] == "0") {
      this.plasticStatus = "Empty";
    } else if (notifyString[1] == "2") {
      this.plasticStatus = "Full";
    } else if (notifyString[1] == "1") {
      this.plasticStatus = "50% Full";
    } else this.plasticStatus = "Info not available";
    return this.plasticStatus;
  }

  getPaperStatus(): string {
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
