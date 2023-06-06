import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { AccountsService } from '../services/accounts.service';
import { Account, AccountStatus } from '../models/accounts.model';
import { MatDialog } from '@angular/material/dialog';
import { AccountDialogueComponent } from '../account-dialogue/account-dialogue.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../app.constants';

export enum AccountFields {
  NAME = 'name',
  ACCOUNT_NAME = 'account_name',
  EMAIL = 'email',
  STATUS = 'status',
  START_DATE = 'start_date',
  EXPIRATION_DATE = 'expiration_date',
  ACTIONS = 'actions'
}

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss'],
})
export class AccountListComponent implements OnInit, OnDestroy {
  accounts$: Observable<Account[]> = of([]);
  accounts: Account[] = [];
  subs = new Subscription();
  dataSource = new MatTableDataSource(this.accounts);
  displayedColumns: string[] = [
    AccountFields.NAME,
    AccountFields.ACCOUNT_NAME,
    AccountFields.EMAIL,
    AccountFields.STATUS,
    AccountFields.START_DATE,
    AccountFields.EXPIRATION_DATE,
    AccountFields.ACTIONS

  ];
  fieldType = AccountFields;
  colorBinding: {[key: string]: string} = {
    [AccountStatus.ACTIVE]: 'blue',
    [AccountStatus.DISABLE]: 'orange',
    [AccountStatus.PENDING]: 'tomato',
  }
  @ViewChild(MatTable) table: MatTable<Account>;

  constructor(
    private accountService: AccountsService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAccounts();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  getAccounts() {
    this.accounts$ = this.accountService.getAccounts();
    this.subs.add(
      this.accounts$.subscribe((accounts) => {
        this.accounts = [...accounts];
        this.dataSource = new MatTableDataSource(this.accounts);
        this.table.renderRows();
      })
    );
  }
  createAccount() {
    const account = new Account(this.accounts.length + 1);
    const dialogRef = this.dialog.open(AccountDialogueComponent, {
      width: '600px',
      data: {
        account: of(account),
        title: 'Create account'
      },
    });
    dialogRef.afterClosed().subscribe((result: Account) => {
      if (result) this.addAccount(result);
    });
  }
  addAccount(account: Account) {
    this.subs.add(
      this.accountService.addAccount(account).subscribe(() => {
        this.getAccounts();
      })
    );
  }
  deleteAccount(id: string) {
    this.subs.add(
      this.accountService.deleteAccount(id).subscribe(() => {
        this.getAccounts();
      })
    );
  }
  updateAccount(account: Account) {
    this.subs.add(
      this.accountService.updateAccount(account).subscribe(() => {
        this.getAccounts();
      })
    );
  }
  editAccount(id: string) {
    const dialogRef = this.dialog.open(AccountDialogueComponent, {
      width: '600px',
      data: {
        account: this.accountService.getAccount(id),
        title: 'Edit account'
      },
    });
    dialogRef.afterClosed().subscribe((result: Account) => {
      if (result) this.updateAccount(result);
    });
  }
  navigateToAccount(account: Account) {
    this.router.navigate([APP_ROUTES.PROFILE, account.id]);
  }
}
