import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { AlertController, ToastController } from "@ionic/angular";
import { DataService } from "../../services/data.service";
import { DomSanitizer } from "@angular/platform-browser";
// import { DataService } from '../../services/data.service';

@Component({
  selector: "page-register",
  templateUrl: "register.html",
  styleUrls: ["./register.scss"],
})
export class RegisterPage {
  scheduleOpen: boolean = true;
  safeFormSrc: any;
  constructor(
    private http: HttpClient,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {
    this.dataService
      .getPageConfig("ConferenceRegistration")
      .subscribe((config) => {
        this.safeFormSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
          config.registrationFormSrc
        );
      });
  }

  ngOnInit() {
    this.http
      .get<{ conferenceRegistrationOpen: boolean }>("assets/pages-config.json")
      .subscribe((config) => {
        this.scheduleOpen = config.conferenceRegistrationOpen;
      });
  }

  //   registerDelegate() {
  //     { // Redirect to an external URL
  //      window.location.href = 'https://miningexponamibia.com/delegate-registration/';
  //      // Implement your registration logic here, e.g., navigate to a registration page
  //    }
  //  }

  /* async ionViewDidEnter() {
    const toast = await this.toastCtrl.create({
      message: 'This does not actually send a support request.',
      duration: 3000
    });
    await toast.present();
  }

  async submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.supportMessage = '';
      this.submitted = false;

      const toast = await this.toastCtrl.create({
        message: 'Your support request has been sent.',
        duration: 3000
      });
      await toast.present();
    } */
}

// If the user enters text in the support question and then navigates
// without submitting first, ask if they meant to leave the page
// async ionViewCanLeave(): Promise<boolean> {
//   // If the support message is empty we should just navigate
//   if (!this.supportMessage || this.supportMessage.trim().length === 0) {
//     return true;
//   }

//   return new Promise((resolve: any, reject: any) => {
//     const alert = await this.alertCtrl.create({
//       title: 'Leave this page?',
//       message: 'Are you sure you want to leave this page? Your support message will not be submitted.',
//       buttons: [
//         { text: 'Stay', handler: reject },
//         { text: 'Leave', role: 'cancel', handler: resolve }
//       ]
//     });

//     await alert.present();
//   });
// }
