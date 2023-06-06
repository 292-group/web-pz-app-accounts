import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Account, AccountStatus } from '../models/accounts.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsValidators } from '../utils/validator';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface AccountDialogueInputData {
  account: Observable<Account>;
  title: string;
}

@Component({
  selector: 'app-account-dialogue',
  templateUrl: './account-dialogue.component.html',
  styleUrls: ['./account-dialogue.component.scss'],
})
export class AccountDialogueComponent implements OnInit, OnDestroy {
  subs = new Subscription();
  account: Account;
  formGroup: FormGroup;
  nameField: FormControl = new FormControl('', [Validators.required]);
  accountField: FormControl = new FormControl('', [Validators.required]);
  statusField: FormControl = new FormControl('', [Validators.required]);
  emailField: FormControl = new FormControl('', [Validators.required, Validators.email]);
  startControl: FormControl = new FormControl(null, [
    UtilsValidators.lessThanDateField('to'),
  ]);
  endControl: FormControl = new FormControl(null, [
    UtilsValidators.largerThanDateField('from'),
  ]);
  statuses = Object.values(AccountStatus);
  constructor(
    private dialogRef: MatDialogRef<AccountDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogueInputData,
    public formBuilder: FormBuilder,
  ) {
    this.formGroup = formBuilder.group({
      nameField: this.nameField,
      accountField: this.accountField,
      statusField: this.statusField,
      emailField: this.emailField,
      from: this.startControl,
      to: this.endControl,
  });
  }
  ngOnInit(): void {
    this.subs.add(
      this.data.account.subscribe((account) => {
        this.account = account.clone();
        this.updateControls(this.account);
      })
    );
  }
  updateControls(account: Account) {
    this.nameField.setValue(account.name);
    this.accountField.setValue(account.account_name);
    this.statusField.setValue(account.status);
    this.emailField.setValue(account.email);
    this.startControl.setValue(dayjs.unix(account.start_date).utc().toDate());
    this.endControl.setValue(dayjs.unix(account.expiration_date).utc().toDate());
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    this.account.account_name = this.accountField.value;
    this.account.name = this.nameField.value;
    this.account.email = this.emailField.value;
    this.account.status = this.statusField.value;
    this.account.start_date = dayjs(this.startControl.value).utc(true).unix();
    this.account.expiration_date = dayjs(this.endControl.value).utc(true).unix();
    this.dialogRef.close(this.account);
  }
}
