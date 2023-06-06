import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, switchMap } from 'rxjs';
import { APP_ROUTES } from '../app.constants';
import { Account, IAccount } from '../models/accounts.model';
@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  constructor(private http: HttpClient) {}
  getAccounts(): Observable<Account[]> {
    const url = `${environment.serverUrl}${APP_ROUTES.ACCOUNTS}`
    return this.http
      .get<IAccount[]>(url)
      .pipe(
        map((accounts) =>
          accounts.map(
            (account) =>
              new Account(
                account.id,
                account.name,
                account.account_name,
                account.email,
                account.status,
                account.start_date,
                account.expiration_date
              )
          ).sort((a, b) => b.expiration_date - a.expiration_date)
        )
      );
  }
  getAccount(id: string): Observable<Account> {
    const url = `${environment.serverUrl}${APP_ROUTES.ACCOUNTS}/${id}`;
    return this.http
      .get<IAccount>(url)
      .pipe(
        map(
          (account) =>
            new Account(
              account.id,
              account.name,
              account.account_name,
              account.email,
              account.status,
              account.start_date,
              account.expiration_date
            )
        )
      );
  }
  addAccount(account: Account): Observable<Account[]> {
    const url = `${environment.serverUrl}${APP_ROUTES.ACCOUNTS}`;
    return this.http
      .post(url, account.toDto())
      .pipe(switchMap(() => this.getAccounts()));
  }
  updateAccount(account: Account): Observable<Account> {
    const url = `${environment.serverUrl}${APP_ROUTES.ACCOUNTS}/${account.id}`;
    return this.http.put(url, account.toDto()).pipe(map(() => account));
  }
  deleteAccount(id: string): Observable<Account[]> {
    const url = `${environment.serverUrl}${APP_ROUTES.ACCOUNTS}/${id}`;
    return this.http.delete(url).pipe(switchMap(() => this.getAccounts()));
  }
}
