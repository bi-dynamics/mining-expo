import { Component, OnInit } from '@angular/core';
import { AgendaItem, ScheduleItem } from '../../types';
import { AgendaService } from '../../services/agenda.service';
import { ModalController } from '@ionic/angular';
import { PermissionsModalComponent } from '../../components/permissions-modal/permissions-modal.component';
import { Capacitor } from '@capacitor/core';
import { PushNotificationService } from '../../services/push-notification.service';
import { StorageService } from '../../services/storage.service';
import { DataService } from '../../services/data.service';
import { Timestamp } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public agenda: AgendaItem[] = [];
  public conferenceSchedule: ScheduleItem[] = [];
  public daySchedule: ScheduleItem[] = [];
  public selectedDay: number = 0; // Initial selected day

  
  constructor(private agendaService: AgendaService,
    private modalController: ModalController,
    private pushNotificationService: PushNotificationService,
    private storageService: StorageService, private dataService: DataService ) {
      this.agenda = this.agendaService.getAgenda();
      this.dataService.getExpoSchedule().subscribe( data => { 
        this.conferenceSchedule = data as ScheduleItem[]
        this.sortScheduleByStartTime();
    });
    
  }
  
  ngOnInit() {
    console.log('My app has initialized');
    // this.presentModal();
  }

  setSelectedDay(day: number) {
    this.selectedDay = day;
    this.setDaySchedule(day);
  }

  setDaySchedule(day: number) {
    this.daySchedule = this.conferenceSchedule.filter((schedule) => {
      const scheduleDate = new Date(schedule.timeStart?.seconds * 1000);
      if (scheduleDate.getDate() === day){
        return true;
      } else { return false}
    });
  }

  sortScheduleByStartTime() {
    this.conferenceSchedule.sort((a: any, b: any) => a.timeStart - b.timeStart);
  }


  
  trackItems(index: number, itemObject: AgendaItem) {
    return itemObject.id;
  }
  
   
  

  async presentModal() {
   
    // Call register every time the app launches
    // Show permission prompt the first time app is launched
    if (Capacitor.getPlatform() !== 'web') {
      const permStatus = await this.pushNotificationService.checkPermissionStatus();

      if (permStatus === 'granted') {
        // On Android, permission is granted automatically
        await this.pushNotificationService.registerPush();
      }
      else if (permStatus === 'prompt' && !(await this.storageService.getPushNotesModalShown())) {
        // On iOS, ask the user for permission first. only once.
        await this.storageService.setPushNotesModalShown();

        const modal = await this.modalController.create({
          component: PermissionsModalComponent,
          initialBreakpoint: 1,
          breakpoints: [0, 1],
          cssClass: 'permissions-modal'
        });
        
        return await modal.present();
        
      }
    }
  }
}
