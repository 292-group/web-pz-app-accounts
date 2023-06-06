import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of, switchMap } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../models/accounts.model';
import { AccountFields } from '../account-list/account-list.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  account: Account;
  fields = [
    {
      field: AccountFields.NAME,
      icon: 'person',
      title: 'Name: ',
      show: (value: Account) => value ? value[AccountFields.NAME] : ''
    },
    {
      field: AccountFields.ACCOUNT_NAME,
      icon: 'account_box',
      title: 'Account name: ',
      show: (value: Account) => value ? value[AccountFields.ACCOUNT_NAME] : ''
    },
    {
      field: AccountFields.EMAIL,
      icon: 'mail',
      title: 'E-mail: ',
      show: (value: Account) => value ? value[AccountFields.EMAIL] : ''
    },
    {
      field: AccountFields.STATUS,
      icon: 'star',
      title: 'Status: ',
      show: (value: Account) => value ? value[AccountFields.STATUS] : ''
    },
    {
      field: AccountFields.START_DATE,
      icon: 'alarm',
      title: 'Status: ',
      show: (value: Account) => value ? this.datePipe.transform(value[AccountFields.START_DATE] * 1000) : ''
    },
    {
      field: AccountFields.EXPIRATION_DATE,
      icon: 'alarm_on',
      title: 'Status: ',
      show: (value: Account) => value ? this.datePipe.transform(value[AccountFields.EXPIRATION_DATE] * 1000) : ''
    },
  ]
  constructor(
    private route: ActivatedRoute,
    private accountService: AccountsService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => params.getAll('id')),
          switchMap((id) => this.accountService.getAccount(id))
        )
        .subscribe((account) => {
          this.account = account;
        })
    );
  }
  ngOnDestroy(): void {
      this.subs.unsubscribe();
  }
}
