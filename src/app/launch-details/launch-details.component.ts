import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from "@kolkov/ngx-gallery";
import { map, switchMap } from "rxjs/operators";
import { LaunchDetailsGQL } from "../services/spacexGraphql.service";

@Component({
  selector: "app-launch-details",
  templateUrl: "./launch-details.component.html",
  styleUrls: ["./launch-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchDetailsComponent {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly launchDetailsService: LaunchDetailsGQL
  ) {}
  
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  
  launchDetails$ = this.route.paramMap.pipe(
    map(params => params.get("id") as string),
    switchMap(id => this.launchDetailsService.fetch({ id })),
    map(res => res.data.launch)
  );
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  ngOnInit() {
    this.makeGalleryOptions();
    this.getAllDetailImages();
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
          console.log(this.galleryImages);
        });
      }
    });
  }
}

