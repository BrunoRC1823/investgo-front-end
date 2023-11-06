import { Component, Input, OnInit } from '@angular/core';

import { ImageSlider } from 'src/app/shared/interfaces/image-slider.interface';

@Component({
  selector: 'shared-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  @Input() sliders: ImageSlider[] = [];
}
