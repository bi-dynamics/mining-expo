import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  query,
  orderBy,
  doc,
  docData,
  addDoc,
  Timestamp,
  where,
} from "@angular/fire/firestore";

export interface Scan {
  id?: string;
  scan: string;
  dateTime: Date;
  action: String;
}

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getConferenceSchedule() {
    const confScheduleRef = collection(this.firestore, "conference_schedule");
    const sortedScheduleQuery = query(confScheduleRef, orderBy("timeStart"));
    return collectionData(sortedScheduleQuery);
  }

  getExpoSchedule() {
    const expoScheduleRef = collection(this.firestore, "expo_schedule");
    return collectionData(expoScheduleRef);
  }

  //get only with status of 'active' speakers
  getSpeakers() {
    const speakersRef = collection(this.firestore, "speakers");
    const activeSpeakersQuery = query(
      speakersRef,
      where("status", "==", "active")
    );
    return collectionData(activeSpeakersQuery);
  }

  getExhibitors() {
    const currentYear = new Date().getFullYear();
    const exhibitorsRef = collection(this.firestore, "exhibitors");
    const yearQuery = query(
      exhibitorsRef,
      where("yearsAtEvent", "array-contains", currentYear)
    );
    return collectionData(yearQuery);
  }

  getSupPlatform() {
    const supPlatformRef = collection(this.firestore, "suppliers_platform");
    return collectionData(supPlatformRef);
  }

  getScans() {
    const scannerRef = collection(this.firestore, "scanner");
    return collectionData(scannerRef);
  }

  addScan(scan: Scan) {
    const scanRef = collection(this.firestore, "scanner");
    return addDoc(scanRef, scan);
  }

  getFloorPlans() {
    const floorPlansRef = collection(this.firestore, "floor_plans_2024");
    return collectionData(floorPlansRef);
  }

  getPageConfig(page: string) {
    const pageConfigRef = doc(this.firestore, `app_page_configs/${page}`);
    return docData(pageConfigRef);
  }
}
