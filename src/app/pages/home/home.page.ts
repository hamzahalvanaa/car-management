import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  dataHaha = 'haha';
  constructor(
    public router: Router,
    public alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  openScanner() {
    this.router.navigate(['home/scanner']);
  }

  async showCredits() {
    const alert = await this.alertCtrl.create({
      header: 'About App',
      subHeader: 'Car Management App',
      message: 'Version 1.0.0. Compiled on May 2020',
      translucent: true,
      backdropDismiss: true,
      buttons: ['OK']
    });
    await alert.present();
  }

}
