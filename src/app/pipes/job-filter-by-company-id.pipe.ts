import { Pipe, PipeTransform } from '@angular/core';
import { Job } from '../models/job';

@Pipe({
  name: 'jobFilterByCompanyId'
})
export class JobFilterByCompanyIdPipe implements PipeTransform {

  transform(value: Job[], companyId: number): any {
    return value?.filter((job) => job.companyId.toString() === companyId.toString());
  }

}
