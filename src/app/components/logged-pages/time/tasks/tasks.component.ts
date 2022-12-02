import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangeStatus, ChangeStatusEnum, TimeTask } from 'src/app/_models/time-task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TimeService } from 'src/app/_services/time.service';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  @Input() user: User
  @Input() task: TimeTask
  @Input() disableButtons: boolean = false;
  @Input() showDate: boolean = false;
  @Input() size: string = '';

  constructor(public dialog: MatDialog, private readonly timeService: TimeService, private readonly accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  ngOnInit() {

  }

  edit() {

    this.dialog.open(EditTaskComponent,
      {
        data: {
          task: this.task
        }
      })


  }

  delete() {

    this.dialog.open(DeleteTaskComponent,
      {
        data: {
          task: this.task
        }
      })

  }

  changeStatus(idTask: number, event: any){

    let changeStatus = {
      status: event.checked? ChangeStatusEnum.paid : ChangeStatusEnum.open,
      idTask: idTask
    } as ChangeStatus;

    let list: ChangeStatus[] = [];

    list.push(changeStatus);

    this.timeService.changeStatus(list,this.user.idUser, this.accountService.getToken()).subscribe(res =>{
      console.log(res);
      this.task.status = changeStatus.status;

    }, err =>{
      console.log(err)
    })

  }


}
