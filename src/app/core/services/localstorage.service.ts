import { Injectable } from '@angular/core';

const USER_INFO = 'userinfo';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  /**
   * store current user info
   *
   * @param {*} userInfo
   */
  storeUser(userInfo): void {
    this.store(USER_INFO, userInfo);
  }

  /**
   * get current user info
   *
   * @returns {string}
   */
  getUserInfo(): string {
    return this.get(USER_INFO);
  }

  /**
   * store info in the local storage
   *
   * @param {string} key
   * @param {string} data
   */
  store(key: string, data: string) {
    localStorage.setItem(key, data);
  }

  /**
   * get an item from the local storage
   *
   * @param {string} key
   * @returns {string}
   */
  get(key: string): string {
    return localStorage.getItem(key);
  }
}
