import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  dataQRCode: string = '';
  dataParsed: any;
  formSubmitted: boolean = false;
  submitBtnText = 'Submit';

  customAlertOptions: any = {
    header: 'Pilih Status',
    translucent: true
  };

  constructor(
    public route: ActivatedRoute,
    private ngZone: NgZone,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.dataQRCode = res.qrCode;
      let dataParam = JSON.parse(res.dataParsed);
      this.dataParsed = dataParam['Data'][0];
      console.log(this.dataParsed);
    });
  }

  onSubmit() {
    this.submitBtnText = 'Submitting....';
    this.formSubmitted = true;
  }

  async navigateHome() {
    // const loading = await this.loadingCtrl.create({
    //   message: 'Please wait....',
    //   spinner: 'circular',
    //   showBackdrop: false,
    //   translucent: true,
    //   duration: 2000
    // });
    // await loading.present();
    this.ngZone.run(() => {
      this.navCtrl.navigateRoot('home');
    });
    // await loading.dismiss();
  }
}
