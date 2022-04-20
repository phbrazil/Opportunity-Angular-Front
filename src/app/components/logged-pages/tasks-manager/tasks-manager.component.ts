import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/_models/task';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { TaskService } from 'src/app/_services/task.service';
import { NewTaskManagerComponent } from './new-task-manager/new-task-manager.component';

@Component({
  selector: 'app-tasks-manager',
  templateUrl: './tasks-manager.component.html',
  styleUrls: ['./tasks-manager.component.scss']
})
export class TasksManagerComponent implements OnInit {

  constructor(private dialog: MatDialog, private taskService: TaskService, private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

   }

  faPlus = faPlus;

  isLoading: boolean = false;

  tasks: Task[] = [];

  user: User;


  ngOnInit(): void {

    this.taskService.getIsReload().subscribe(status=>{
      if(status){
        this.loadTasks();
      }
    })

    this.loadTasks();
  }

  newTaskManager(){
    this.dialog.open(NewTaskManagerComponent)
  }

  loadTasks(){

    this.isLoading = true;

    this.taskService.getTasks(this.user.idGroup, this.accountService.getToken()).subscribe(res =>{
      this.isLoading = false;
      this.tasks = res;
    }, err=>{
      this.isLoading = false;
    })

  }


}
