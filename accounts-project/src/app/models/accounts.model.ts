export interface IAccount {
  name: string;
  account_name: string;
  email: string;
  status: AccountStatus;
  id: number;
  start_date: number;
  expiration_date: number;
}

export enum AccountStatus {
  ACTIVE = 'Active',
  PENDING = 'Pending',
  DISABLE = 'Disable',
}

export class Account implements IAccount {
  name: string;
  account_name: string;
  email: string;
  status: AccountStatus;
  id: number;
  start_date: number;
  expiration_date: number;
  constructor(
    id: number,
    name: string = '',
    account_name: string = '',
    email: string = '',
    status: AccountStatus = AccountStatus.ACTIVE,
    start_date: number = Date.now() / 1000,
    expiration_date: number = Date.now() / 999,
  ) {
    this.name = name;
    this.account_name = account_name;
    this.email = email;
    this.status = status;
    this.id = id;
    this.start_date = start_date;
    this.expiration_date = expiration_date;
  }
  clone() {
    return new Account(
      this.id,
      this.name,
      this.account_name,
      this.email,
      this.status,
      this.start_date,
      this.expiration_date,
    );
  }
  toDto(): IAccount {
    return {
      name: this.name,
      account_name: this.account_name,
      email: this.email,
      status: this.status,
      id: this.id,
      start_date: this.start_date,
      expiration_date: this.expiration_date
    }
  }
}
export type AccountDto = {
  name: string;
  account_name: string;
  email: string;
  status: string;
};
