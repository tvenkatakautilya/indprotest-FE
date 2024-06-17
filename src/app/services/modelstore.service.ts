import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelstoreService {

  private localStorage: Storage = window.localStorage;

  constructor() {
    this.localStorage = window.localStorage;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saveModel(model_name:string, model: any) {
    this.localStorage.setItem(model_name, JSON.stringify(model));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getModel(model_name:string = ''): any { 
    const item = this.localStorage.getItem(model_name);
    return item ? JSON.parse(item) : {};
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteModel(model_name:string = ''): any {
    localStorage.removeItem(model_name)
  }
}
