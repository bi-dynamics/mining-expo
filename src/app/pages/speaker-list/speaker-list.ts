import { Component } from '@angular/core';
// import { SpeakerService } from '../../services/speaker.service';
import { Speaker, SpeakerList } from '../../types';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-speakers',
  templateUrl: './speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  public speakerList: SpeakerList[] = [];
  public speakers: Speaker[] = [];

  constructor(private dataService: DataService,
    // speakerService: SpeakerService
  ) {
    // this.speakers = speakerService.getSpeakers();
    this.dataService.getSpeakers().subscribe(data => {
      this.speakerList = data as SpeakerList[];
    })
    console.log(this.speakerList)
    
  }

  trackItems(index: number, itemObject: Speaker) {
    return itemObject.id;
  }
}
