﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Settings } from '../_models/settings';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Constants } from '../components/shared/utils/Constants';
import { User } from '../_models/user';
@Injectable({ providedIn: 'root' })
export class SettingsService {

  private isReloadSettings = new BehaviorSubject<boolean>(false);
  readonly baseUrl: string = Constants.baseUrl;

  private settingsSubject: BehaviorSubject<Settings>;
  public settings: Observable<Settings>;


  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {

    this.settingsSubject = new BehaviorSubject<Settings>(JSON.parse(localStorage.getItem('settings')));
    this.settings = this.settingsSubject.asObservable();

  }

  public setIsReload(status: boolean): void {
    this.isReloadSettings.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadSettings.asObservable();

  }

  public get settingsValue(): Settings {
    return this.settingsSubject.value;
  }

  public setSettings(settings: Settings) {

    this.settingsSubject.next(settings);

  }

  getSettings(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/getSettings/${idUser}`

    return this.http.get<Settings>(url, header).pipe(map(settings => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('settings', JSON.stringify(settings));
      return settings;
    }));
  }

  newSettings(settings: Settings, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/newSettings`;

    return this.http.post<any>(url, settings, header)
      .pipe(map(res => {
        return res;
      }));
  }

  editSettings(settings: Settings, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/settings/editSettings`;

    return this.http.put<any>(url, settings, header)
      .pipe(map(res => {
        return res;
      }));
  }

  disableInitialSetup(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/user/setup/${idUser}`;

    return this.http.post<User>(url, {}, header)
      .pipe(map(res => {
        return res;
      }));
  }
}
