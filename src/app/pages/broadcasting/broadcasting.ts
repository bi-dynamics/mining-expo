import { Component } from "@angular/core";
import { DataService } from "../../services/data.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-broadcasting",
  templateUrl: "./broadcasting.html",
  styleUrls: ["./broadcasting.scss"],
})
export class BroadcastingPage {
  public broadcastingOpen: boolean = false;
  public broadcastSrc: any;

  constructor(
    public dataService: DataService,
    private sanitizer: DomSanitizer
  ) {
    this.dataService.getPageConfig("Broadcasting").subscribe((config) => {
      this.broadcastingOpen = config.broadcastingOpen;
      this.broadcastSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
        config.broadcastSrc
      );
    });
  }
}
