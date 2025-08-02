import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { MenuController } from "@ionic/angular";

import { Storage } from "@ionic/storage-angular";
import { DataService } from "../../services/data.service";

@Component({
  selector: "page-tutorial",
  templateUrl: "tutorial.html",
  styleUrls: ["./tutorial.scss"],
})
export class TutorialPage {
  // Fallback the logo and sponsor images
  ComLogoSrc = "/assets/img/com-logo.png";
  public logosLoaded: boolean[] = [];

  SponsorsLogosSrc = ["/assets/imgs/rmbLogo.png"];
  ExpoLogoSrc = "/assets/img/expo-logo-25.png";
  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage,
    public dataService: DataService
  ) {
    this.dataService.getPageConfig("WelcomePage").subscribe((config) => {
      this.ComLogoSrc = config.ComLogoSrc || this.ComLogoSrc;
      this.SponsorsLogosSrc = config.SponsorsLogosSrc || this.SponsorsLogosSrc;
      this.ExpoLogoSrc = config.ExpoLogoSrc || this.ExpoLogoSrc;
    });
    this.logosLoaded = [false, false, true];
  }

  startApp() {
    this.router
      .navigateByUrl("/app/tabs/schedule", { replaceUrl: true })
      .then(() => this.storage.set("ion_did_tutorial", true));
  }

  ionViewWillEnter() {
    this.storage.get("ion_did_tutorial").then((res) => {
      if (res === true) {
        this.router.navigateByUrl("/app/tabs/schedule", { replaceUrl: true });
      }
    });

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
