import { Pipe, PipeTransform } from "@angular/core";
import { ChangeStatusEnum } from "src/app/_models/time-task";

@Pipe({
  name: 'translateTimeStatus',
  pure: false,
})
export class TimeStatusPipe implements PipeTransform {
  constructor() {}

  transform(value: ChangeStatusEnum): any {

    if(value == ChangeStatusEnum.paid ){
      return "Pago";
    }else{
      return "Aberto";
    }
  }
}
