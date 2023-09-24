import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(encodeURIComponent(JSON.stringify(value)));

    await Preferences.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  async get(storageKey: string) {
    try {
      const encryptedValue = await Preferences.get({
        key: storageKey
      });

      return JSON.parse(decodeURIComponent(atob(encryptedValue.value!)));
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async remove(storageKey: string) {
    await Preferences.remove({
      key: storageKey
    })
  }

  async clear() {
    await Preferences.clear();
  }
}
