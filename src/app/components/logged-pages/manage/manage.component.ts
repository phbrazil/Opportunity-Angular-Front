import { Component, OnInit } from '@angular/core';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  user: User

  faSignOut = faSignOut;

  constructor(private accountService: AccountService) {

    this.accountService.user.subscribe(x => this.user = x);

  }


  ngOnInit(): void {
  }


  logout() {

    this.accountService.logout();

  }

}
