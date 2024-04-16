import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SpeakerViewComponent } from '../speaker-view/speaker-view.component';
import { Company, Speaker, SpeakerList } from '../../types';
import { SpeakerService } from '../../services/speaker.service';
import { CompanyService } from '../../services/company.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-speaker-card',
  templateUrl: './speaker-card.component.html',
  styleUrls: ['./speaker-card.component.scss'],
})
export class SpeakerCardComponent implements OnInit {
  public company: Company;

  @Input() id: number;
  @Input() button: boolean = false;
  @Input() safeArea: boolean = false;
  @Input() speaker: SpeakerList;


  constructor(
    private speakerService: SpeakerService,
    private companyService: CompanyService,
    private modalController: ModalController,
    private dataService: DataService,
  ) {}

  ngOnInit() {

    // this.speaker = this.speakerService.getSpeaker(this.id);

    //dont need this, speaker and id is already passed in
    //just send this speaker as a prop for speakerviewcomponent
    // this.dataService.getSpeakers().subscribe(data => {
    //   this.speakers = data as SpeakerList[]
      
    // })
    // console.log(this.id)
    // this.company = this.companyService.getCompany(this.speaker.companyId);
  }

  async presentModal() {
    if (!this.button) return;

    const modal = await this.modalController.create({
      component: SpeakerViewComponent,
      componentProps: {
        id: this.id
      }
    });

    modal.present();
  }

}
