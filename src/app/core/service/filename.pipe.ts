import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FileNamePipe implements PipeTransform {
  transform(value: string): any {
    let uploadedDocument=value?.split('/')
    let uploadedDoc = uploadedDocument?.pop();
    if(uploadedDoc){
        return  uploadedDoc;

    }

  }
}