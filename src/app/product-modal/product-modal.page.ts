import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.page.html',
  styleUrls: ['./product-modal.page.scss'],
})
export class ProductModalPage implements OnInit {

  productName: string;
  barcode: string;
  productType: string;

  listReady: boolean = false;
  

  name: string;
  code: string;
  type: string;
  

  constructor(public modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  public closeModal(){
    this.modalCtrl.dismiss();    
  }

  onSendSubmit(){
    const productInfo = {
      barcode: this.barcode,
      productName: this.productName,
      productType: this.productType
    }

    if (productInfo.barcode == undefined || productInfo.productName == undefined || productInfo.productType == undefined) {
      this.presentToast('Every Field Must Be Completed');
      
    } else {
      this.code = productInfo.barcode;
      this.name = productInfo.productName;
      this.type = productInfo.productType;
      this.listReady = true;
      this.presentToast('Product Added');
    }  
    
  }


}
