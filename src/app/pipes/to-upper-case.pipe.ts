import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toUpperCase'
})
export class ToUpperCasePipe implements PipeTransform {

  transform(text : string): string {
    let firstLetter = text.charAt(0).toUpperCase();
    let otherletter = text.slice(1); 
    return `${firstLetter}${otherletter}`
  }

}
