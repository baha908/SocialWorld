import { Injectable } from '@angular/core';
declare let alertify: any;
@Injectable()
export class AlertifyService {
  constructor() {}

  success(message: string): any {
    alertify.success(message);
  }
  error(message: string): any {
    alertify.error(message);
  }
  warning(message: string): any {
    alertify.warning(message);
  }
}
