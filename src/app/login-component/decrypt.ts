import {Injectable, Pipe} from "@angular/core";

@Pipe({name: 'decrypted'})
@Injectable({providedIn: 'root'})
export class Decrypt {
  decryptData(data: string, encryptSecretKey: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}
