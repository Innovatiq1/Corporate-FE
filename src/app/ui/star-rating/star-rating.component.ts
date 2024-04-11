import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() value: number =0;
  @Input() disabled: boolean = false;
  @Input() isHalfstar: boolean = false;
  @Input() isNumberRating: boolean = false;
  @Input() maxRating: any  = 5;
  @Output() changeEvent: EventEmitter<any> = new EventEmitter<any>();

  ratings: number[] = [];
  temp_value: any = null;

  ngOnChanges() {
    this.temp_value = this.value;
  }

  star_over(index: number) {
    if (!this.disabled) {
      this.temp_value = index;
    }
  }

  star_out() {
    if (!this.disabled) {
      this.temp_value = this.value;
    }
  }

  setStar(value: any) {
    if (!this.disabled) {
      this.temp_value = value;
      this.changeEvent.next(this.temp_value);
    }
  }

  customRating(max: any) {
    const maxRating = parseInt(max?.toString()||0, 10);
    const data = Array.from(Array(maxRating), (_, i) => i + 1);
    if (this.isHalfstar) {
      const halfStarRatings: number[] = [];
      data.forEach((element: number) => {
        halfStarRatings.push(element - 0.5);
        halfStarRatings.push(element);
      });
      return halfStarRatings;
    }
    return data;
  }

  checkHalfStar(star: number) {
    return (star / 0.5) % 2 !== 0;
  }
}
