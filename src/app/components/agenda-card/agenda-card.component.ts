import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgendaService } from '../../services/agenda.service';
import { SpeakerService } from '../../services/speaker.service';
import { CompanyService } from '../../services/company.service';
import { AgendaItem, ConferenceScheduleItem, Speaker } from '../../types';

@Component({
  selector: 'app-agenda-card',
  templateUrl: './agenda-card.component.html',
  styleUrls: ['./agenda-card.component.scss'],
})
export class AgendaCardComponent implements OnInit {
  @Input() id: number;
  @Input() schedule: ConferenceScheduleItem

  public agenda: AgendaItem;
  public speakers: Speaker[];
  public photoUrls: string[] = [];

  constructor(
    private agendaService: AgendaService,
    private speakerService: SpeakerService,
    private companyService: CompanyService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.agenda = this.agendaService.getAgendaItem(this.id);
    // this.speakers = this.speakerService.getSpeakers(this.agenda.speakerIds);
    // this.photoUrls = this.speakers.map(speaker => speaker.photoUrl);
  }

  formatDate(timestamp: any) {
    const date = new Date(timestamp.seconds * 1000); // Convert timestamp to milliseconds
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  formatTime(timestamp: any) {
    const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
    const hours = date.getHours().toString().padStart(2, '0'); // Pad hours with leading zero
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes with leading zero
    return `${hours}:${minutes}`;
  }

  navigateToAgendaItemPage() {
    this.router.navigate([`/agenda/${this.id}`]);
  }

  getCompanyName(companyId: number) {
    return this.companyService.getCompany(companyId).name;
  }

  formatTalkTime(agendaItem: AgendaItem) {
    return this.agendaService.formatTalkTime(agendaItem);
  }
}
