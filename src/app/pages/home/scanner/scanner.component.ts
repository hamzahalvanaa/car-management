import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner/ngx';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit {

  scanSub: Subscription;
  status: QRScannerStatus;
  dataParsed: any;

  constructor(
    private qrScanner: QRScanner,
    private platform: Platform,
    private router: Router,
    private ngZone: NgZone,
    private server: ApiService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    await this.platform.ready().then(async () => {
      try {
        this.status = await this.qrScanner.prepare();
      } catch (e) {
        this.presentAlert(`Qr Code error: ${e}`);
        return;
      }
      if (this.status.authorized) {
        this.scanSub = this.qrScanner.scan().subscribe(data => {
          this.ngZone.run(() => {
            // console.log('qrCode: ', data);
            // this.getDataFromQrCode(data);
            let dataRes = [];
            this.server.retrieveDataFromTagQrCode(data)
              .then((response: any) => {
                dataRes.push(response);
                this.dataParsed = JSON.parse(dataRes[0].data);
                // alert(JSON.stringify(this.dataParsed.Data));
                console.log({ qrCode: data, dataParsed: JSON.stringify(this.dataParsed) });
                this.router.navigate(['detail'], { queryParams: { qrCode: data, dataParsed: JSON.stringify(this.dataParsed) } });
              });
          });
        });
        this.qrScanner.show();
      } else if (this.status.denied) {
        this.presentAlert('Camera permission denied');
      } else {
        this.presentAlert('Permission denied for this runtime.');
      }
    });
  }

  ionViewWillLeave() {
    this.qrScanner.hide(); // hide camera preview
    this.scanSub && this.scanSub.unsubscribe(); // stop scanning
    this.qrScanner.destroy(); // destroy camera preview
  }

  // getDataFromQrCode(tagId) {
  //   let dataRes = [];
  //   this.server.retrieveDataFromTagQrCode(tagId)
  //     .then((response: any) => {
  //       dataRes.push(response);
  //       this.dataParsed = JSON.parse(dataRes[0].data);
  //       // alert(JSON.stringify(this.dataParsed.Data));
  //     });
  // }

  async presentAlert(message) {
    const alert = await this.alertCtrl.create({
      header: 'PERHATIAN',
      message: message,
      mode: 'ios',
      translucent: true,
      backdropDismiss: false,
      buttons: ['OK']
    });
    await alert.present();
  }
}
