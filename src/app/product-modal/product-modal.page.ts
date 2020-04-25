import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { DatabaseService } from '../services/database.service';

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
  

  constructor(public modalCtrl: ModalController, public toastController: ToastController, private navParams: NavParams, private database: DatabaseService) {
    this.barcode = this.navParams.get('barcodeParams');
   }

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
      Description: this.productName,
      Material: this.productType,
      Barcode: this.barcode
    }

    if (productInfo.Barcode == undefined || productInfo.Description == undefined || productInfo.Material == undefined) {
      this.presentToast('Every Field Must Be Completed');
      
    } else {
      this.code = productInfo.Barcode;
      this.name = productInfo.Description;
      this.type = productInfo.Material;
      this.listReady = true;
      //database add
      this.database.addProduct(productInfo).subscribe(() => {
        this.presentToast('Product Added');
      }, error => {
        this.presentToast(error);
      });
    }  
    
  }


}
