import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { ConferenceData } from "../../providers/conference-data";
import { Platform } from "@ionic/angular";
import { DOCUMENT } from "@angular/common";
import { darkStyle } from "./map-dark-style";
import { IonicSlides } from "@ionic/angular"; //Import Ionic slides module for Swiper package
import { DataService } from "../../services/data.service";
import { HttpClient } from "@angular/common/http";

interface FloorPlanSourceYear {
  year: number;
  src: string;
}

interface FloorPlan {
  alt: string;
  id: string;
  sourceYears?: FloorPlanSourceYear[];
  irl_image?: string; // Assuming irl_image is optional
  exhibitors?: any[]; // Adjust this type as per your exhibitor structure
  activeFloorPlanSrc?: string; // New property to store the active floor plan source
}

@Component({
  selector: "page-map",
  templateUrl: "map.html",
  styleUrls: ["./map.scss"],
})
//galleryType = 'regular';
export class MapPage implements AfterViewInit {
  @ViewChild("mapCanvas", { static: true }) mapElement: ElementRef;

  public segment: string = "overview";
  public floorPlans: any = [];
  public filteredFloorPlans: any = [];
  floorPlansOpen: boolean = true;

  swiperModules = [IonicSlides]; // Install Swiper modules

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public confData: ConferenceData,
    public platform: Platform,
    public dataService: DataService,
    private http: HttpClient
  ) {
    // Moved the subscription and data processing inside the constructor
    // This is generally acceptable for data loading that's immediately needed.
    // However, for more complex scenarios, ngOnInit is often preferred.
    this.dataService.getFloorPlans().subscribe((data: FloorPlan[]) => {
      // Process data to determine activeFloorPlanSrc for each plan
      this.floorPlans = data.map((plan) => {
        const currentYear = new Date().getFullYear();
        let activeSrc = "";

        if (plan.sourceYears && plan.sourceYears.length > 0) {
          // Find current year's floor plan
          const currentYearPlan = plan.sourceYears.find(
            (sy) => sy.year === currentYear
          );

          if (currentYearPlan) {
            activeSrc = currentYearPlan.src;
          } else {
            // If current year not found, try to find the previous year's floor plan
            const previousYear = currentYear - 1;
            const previousYearPlan = plan.sourceYears.find(
              (sy) => sy.year === previousYear
            );
            if (previousYearPlan) {
              activeSrc = previousYearPlan.src;
            } else {
              // Fallback to the first available source if no current/previous year found
              // Only if sourceYears is not empty
              activeSrc = plan.sourceYears[0].src;
            }
          }
        }

        return {
          ...plan,
          activeFloorPlanSrc: activeSrc,
        };
      });

      // Now filter the floor plans based on your segment and also ensure they have an active source
      this.applyFilter(); // Call a dedicated method for filtering

      console.log("Floor Plans (after data arrives):", this.floorPlans);
      console.log(
        "Filtered Floor Plans (after data arrives):",
        this.filteredFloorPlans
      );
    });
  }

  ngOnInit() {
    this.http
      .get<{ floorPlansOpen: boolean }>("assets/pages-config.json")
      .subscribe((config) => {
        this.floorPlansOpen = config.floorPlansOpen;
      });
  }
  async ngAfterViewInit() {
    const appEl = this.doc.querySelector("ion-app");
    let isDark = false;
    let style = [];
    if (appEl.classList.contains("dark-theme")) {
      style = darkStyle;
    }
  }
  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
    this.applyFilter(); // Re-apply filter when segment changes
  }

  private applyFilter() {
    this.filteredFloorPlans = this.floorPlans.filter((plan) => {
      const lowerCaseAlt = plan.alt ? plan.alt.toLowerCase() : "";
      // Ensure the plan has an activeFloorPlanSrc before displaying
      return (
        lowerCaseAlt.includes(this.segment.toLowerCase()) &&
        plan.activeFloorPlanSrc
      );
    });
  }
}
