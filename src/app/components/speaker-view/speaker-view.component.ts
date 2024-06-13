import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Speaker, SpeakerList } from '../../types';
import { SpeakerService } from '../../services/speaker.service';
import { Browser } from '@capacitor/browser';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
})
export class SpeakerViewComponent implements OnInit {
  public speakers: SpeakerList[] | null;
  // public speaker: Speaker;

  @Input() id: number;
  @Input() speaker: SpeakerList;


  constructor(
    private speakerService: SpeakerService,
    private modalController: ModalController,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    // this.speaker = this.speakerService.getSpeaker(this.id);
    // this.dataService.getSpeakers().subscribe(data => {
    //   this.speakers = data as SpeakerList[]
      
    // })
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async openLink(link: string) {
    await Browser.open({ url: link})
  }

}
