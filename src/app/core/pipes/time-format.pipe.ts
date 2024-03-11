import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) return "00:00:00";

    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value - (hours * 3600)) / 60);
    const seconds: number = Math.floor(value - (hours * 3600) - (minutes * 60));

    const formattedHours: string = hours < 10 ? "0" + hours : hours.toString();
    const formattedMinutes: string = minutes < 10 ? "0" + minutes : minutes.toString();
    const formattedSeconds: string = seconds < 10 ? "0" + seconds : seconds.toString();

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

}
