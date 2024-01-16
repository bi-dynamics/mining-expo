import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs-page';
import { TabsPageRoutingModule } from './tabs-page-routing.module';

import { AboutModule } from '../about/about.module';
import { MapModule } from '../map/map.module';
import { ScannerModule } from '../scanner/scanner.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { SessionDetailModule } from '../session-detail/session-detail.module';
import { SpeakerDetailModule } from '../speaker-detail/speaker-detail.module';
import { SpeakersPageModule } from '../speaker-list/speaker-list.module';
import { RegisterModule } from "../register/register.module";
import { DetailsModule } from '../details/details.module';
import { ExhibitorListPageModule } from '../exhibitor-list/exhibitor-list.module';
// import { BroadcastingPageModule } from "../broadcasting/broadcasting.module";
import { SupplierPageModule } from "../supplierplatform/supplier.module";
import { BtbPageModule } from "../btb/btb.module";
import { ExpoScheduleModule } from '../expo-schedule/expo-schedule.module';
import { Tab1PageModule } from '../tab1/tab1.module';
import { AgendaItemPageModule } from '../tab1/agenda-item/agenda-item.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    MapModule,
    ScannerModule,
    ScheduleModule,
    ExpoScheduleModule,
    SessionDetailModule,
    SpeakerDetailModule,
    SpeakersPageModule,
    RegisterModule,
    Tab1PageModule,
    AgendaItemPageModule,
    DetailsModule,
    ExhibitorListPageModule,
    SupplierPageModule,
    BtbPageModule,
    TabsPageRoutingModule
  ],
  declarations: [
    TabsPage,
  ]
})
export class TabsModule { }
