import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

callback:EventEmitter<any> =new EventEmitter<any>

constructor(){}

sendCredentials(email:string, password:string){
  console.log('ok', email, password)
}
}
