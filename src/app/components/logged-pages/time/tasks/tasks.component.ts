import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
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

  public check: Check = {
    name: 'Indeterminate',
    completed: false,
    color: 'warn',
    subchecks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'},
    ],
  };

  public isLoading: boolean = false;

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

  changeStatus(idTime: number, event: any){
    this.isLoading = true;

    let changeStatus = {
      status: event.target.checked? ChangeStatusEnum.paid : ChangeStatusEnum.open,
      idTime: idTime
    } as ChangeStatus;

    let list: ChangeStatus[] = [];

    list.push(changeStatus);

    this.timeService.changeStatus(list,this.user.idUser, this.accountService.getToken()).subscribe(res =>{
      this.task.status = changeStatus.status;
      this.isLoading = false;
    }, _err =>{
        this.isLoading = false;
    })

  }

  public isChecked(task: TimeTask): boolean{
    //to do enum here
   return task.status == 'paid' ? true : false
  }


}

export interface Check {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subchecks?: Check[];
}
