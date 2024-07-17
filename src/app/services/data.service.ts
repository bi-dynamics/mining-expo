import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, orderBy, doc, docData, addDoc, Timestamp } from '@angular/fire/firestore';

export interface Scan {
  id?: string;
  scan: string;
  dateTime: Date;
  action: String;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {}

    getConferenceSchedule() {
      const confScheduleRef = collection(this.firestore, 'conference_schedule');
      // Create a query to order by timeStart (ascending order)
  const sortedScheduleQuery = query(confScheduleRef, orderBy('timeStart'));

      return collectionData(sortedScheduleQuery);
    }
    getExpoSchedule() {
      const expoScheduleRef = collection(this.firestore, 'expo_schedule');
      return collectionData(expoScheduleRef);
    }

    getSpeakers() {
      const speakersRef = collection(this.firestore, 'speakers');
      return collectionData(speakersRef);
    }

    getExhibitors() {
      const exhibitorsRef = collection(this.firestore, 'exhibitors');
      return collectionData(exhibitorsRef);
    }

    getSupPlatform() {
      const supPlatformRef = collection(this.firestore, 'suppliers_platform');
      return collectionData(supPlatformRef);
    }


    getScans() {
      const scannerRef = collection(this.firestore, 'scanner');
      return collectionData(scannerRef);
    }

    addScan(scan: Scan){
      const scanRef = collection(this.firestore, 'scanner');
      return addDoc(scanRef, scan);
    }

    getFloorPlans(){
      const floorPlansRef = collection(this.firestore, 'floor_plans_2024');
      return collectionData(floorPlansRef);
    }


}
