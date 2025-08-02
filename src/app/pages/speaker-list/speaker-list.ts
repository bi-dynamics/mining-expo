import { Component } from "@angular/core";
// import { SpeakerService } from '../../services/speaker.service';
import { Speaker, SpeakerList } from "../../types";
import { DataService } from "../../services/data.service";

@Component({
  selector: "app-speakers",
  templateUrl: "./speaker-list.html",
  styleUrls: ["./speaker-list.scss"],
})
export class SpeakerListPage {
  public speakerList: SpeakerList[] = [];
  public speakers: Speaker[] = [];
  public speakersLoaded: boolean[] = [];

  constructor(
    private dataService: DataService // speakerService: SpeakerService
  ) {
    // this.speakers = speakerService.getSpeakers();
    this.dataService.getSpeakers().subscribe((data) => {
      this.speakerList = data as SpeakerList[];
      this.speakersLoaded = Array(this.speakerList.length).fill(false);
      //set each index in speakersLoaded to true every 100ms
      this.speakersLoaded.forEach((speaker, index) => {
        setTimeout(() => {
          this.speakersLoaded[index] = true;
        }, 200 * index);
      });
    });
  }

  trackItems(index: number, itemObject: Speaker) {
    return itemObject.id;
  }
}
