import { Component, ElementRef, Inject, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import { ConferenceData } from '../../providers/conference-data';
import { Platform, AlertController } from '@ionic/angular';
import { DOCUMENT} from '@angular/common';
import { darkStyle } from './scanner-dark-style';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { any, reject, resolve } from 'cypress/types/bluebird';
import { async } from 'rxjs/internal/scheduler/async';
import { DataService, Scan } from '../../services/data.service';
import { result } from 'cypress/types/lodash';


@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
  styleUrls: ['./scanner.scss']
})
export class ScannerPage implements OnDestroy {
  qrCodeString = 'This is the code for the mining expo';
  scannedResult: any;
  qr: any;
  content_visibility = '';
  dateTime = new Date();
  sResult: Scan[] = [];

   constructor (private dataService: DataService, private alertCtrl: AlertController) {
    this.dataService.getScans().subscribe(res => {
      console.log(res);
      this.qr = res;
    });
   }


    async checkPermission() {
    try {
      const status = await BarcodeScanner.checkPermission({ force:true });
      if (status.granted) {
        return true;
      }
      return false;
    } catch(e) {
      console.log(e);
    }

    }

   async startScan() {
    try {
      const permission = await this.checkPermission();  // Check camera permission
      if(!permission) {
        return true;
      }
     await BarcodeScanner.hideBackground();
     document.querySelector('body').classList.add('scanner-active');
     this.content_visibility = 'hidden';
     const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      // if the result has content
      if(result?.hasContent) {
        this.scannedResult = result.content;
        console.log(this.scannedResult); // log the raw scanned content
      }
    } catch(e) {
        console.log(e);
        this.stopScan();
      }
   }

   async addScan() {

    this.dataService.addScan({ scan: this.scannedResult, dateTime: this.dateTime });
    // const alert = await this.alertCtrl.create({
    //   header: 'Add Scan',
    //   inputs: [
    //     {
    //       name: 'scan',
    //       placeholder: 'My cool scan',
    //       type: 'text'
    //     },
    //     {
    //       name: 'dateTime',
    //       placeholder: '',
    //       type: 'time'
    //     }
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel'
    //     }, {
    //       text: 'Add',
    //       handler: res => {
    //         this.dataService.addScan({scan: res.scan, time: res.this.scannedResult});
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }


  //  async addScan(){
  //   // handler: res => {
  //     this.dataService.addScan(this.sResult);
  //     console.log(this.sResult);
  // }

   stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.content_visibility = '';
  }


   ngOnDestroy(): void {
    this.stopScan();
  }
}
