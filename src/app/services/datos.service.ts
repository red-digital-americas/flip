import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DatosServiceService {

  //Use the outer datos.service.ts
  public heroesUrl = 'http://localhost:50570/api/';  // URL to web api  
  private url: string = 'http://23.253.173.64/'; // URL api server 

  constructor(private http: HttpClient, private https: Http) { }


  ServicioPostGeneral(url, parametros): Observable<any> {
    console.log(this.http);
    let headers = new HttpHeaders();
    console.log(parametros);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.heroesUrl + 'Partners_Cotizacion/' + url, parametros);
  }

  ServicioPostGeneral_nuevo(url, parametros): Observable<any> {
    // debugger;
    // console.log(parametros);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get(this.heroesUrl + url + parametros);
  }


}
