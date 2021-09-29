import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "@kolkov/ngx-gallery";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsFacadeService } from "../services/launch-details-facade.service";


@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsFacade: LaunchDetailsFacadeService
  ) {}
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  launchDetails$: Observable<any>;

  
  ngOnInit() {
    this.getAllLaunchDetails();
    this.makeGalleryOptions();
    this.getAllDetailImages();
  }

  getAllLaunchDetails() {
    this.route.paramMap.subscribe(params => {
      this.launchDetails$ = this.launchDetailsFacade.launchDetailsStoreCache(
        params.get("id")
      );
    })
  }

  makeGalleryOptions() {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  getAllDetailImages() {
    this.launchDetails$.subscribe(result => {
      if (result && result.links) {
        result.links.flickr_images.map((image: string) => {
          const galleryModel =  {
            small: image,
            medium: image,
            big: image
          };
          this.galleryImages.push(galleryModel);
        });
      }
    });
  }
}

