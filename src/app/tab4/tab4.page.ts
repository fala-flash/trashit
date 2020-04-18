import { BluetoothService } from "./../services/bluetooth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  plasticStatus: string = "";
  paperStatus: string = "";

  constructor(private bleService: BluetoothService) {
    this.getPaperStatus();
    this.getPlasticStatus();
  }
  ngOnInit(): void {}

  getPaperStatus() {
    this.bleService.getPaperStatus().subscribe((status) => {
      var x: number = + status;
      console.log(x);

      switch (x) {
        case 0:
          this.paperStatus = "Empty";
          console.log('Empty');
          
          break;

        case 1:
          this.paperStatus = "50% Full";
          console.log('50');
          
          break;

        case 2:
          this.paperStatus = "Full";
          console.log('full');
          
          break;

        default: 
        this.paperStatus = 'Info not available';
        console.log('default');
        
        break;
      }
    });
  }

  getPlasticStatus() {
    this.bleService.getPlasticStatus().subscribe((status) => {
      var x: number = + status;
      console.log(x);
      
      switch (x) {
        case 0:
          this.plasticStatus = "Empty";
          break;

        case 1:
          this.plasticStatus = "50% Full";
          break;

        case 2:
          this.plasticStatus = "Full";
          break;

        default: 
        this.plasticStatus = 'Info not available';
        break;
      }
    });
  }
}
