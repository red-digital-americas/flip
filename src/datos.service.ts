import { Injectable } from '@angular/core';

// Importar objetos de la librería http
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
// Importar la clase Observable desde la librería rxjs
//import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';



@Injectable({
    providedIn: 'root'
})
export class DatosService {


  //public heroesUrl = 'http://localhost:49314/api/';  // URL to web api 
  public heroesUrl = environment.URL + '/api/';  // URL to web api 
  private url: string = environment.URL ; // URL api server 
  
  constructor(private http: HttpClient, private https: Http) { }
  getAPI() { return this.heroesUrl; }
  getURL() { return this.url; }

  ServicioPostLogin(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    console.log(parametros);    
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.heroesUrl + 'Login/' + url, parametros);
  }

  ServicioPostRecoverPass(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    console.log(parametros);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.heroesUrl + 'RecoverPass/' + url, parametros);
  }

  ServicioPostPost(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    console.log(parametros);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.heroesUrl + 'Post/' + url, parametros);
  }

  ServicioPostBuilds(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    console.log(parametros);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.heroesUrl + 'Building/' + url, parametros);
  }

  UploadImgSuc(fileToUpload: any): any {
    let input = new FormData();
    input.append("file", fileToUpload);    
    return this.http.post(this.heroesUrl + "Post/UploadImg", input);
  }

////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERAL
////////////////////////////////////////////////////////////////////////////////////////////////////
  public getJSON(_jsonURL): Observable<any> {
    return this.https.get(_jsonURL)
      .map((response: any) => response.json());
  }

  service_general_get(url): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');    
    return this.http.get(this.heroesUrl + url, { headers: headers });
  }

  service_general_get_with_params(url, parametros): Observable<any> {
    debugger;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');    
    return this.http.get(this.heroesUrl + url, { headers: headers, params: parametros });
  }

  service_general_post(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');    
    return this.http.post(this.heroesUrl + url, parametros, { headers: headers });
  }

  service_general_put(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');    
    return this.http.put(this.heroesUrl + url, parametros, { headers: headers });
  }

  service_general_delete(url): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');    
    return this.http.delete(this.heroesUrl + url, { headers: headers });
  }
  ServicioPostMessage(url, parametros): Observable<any> {
    let headers = new HttpHeaders();
    console.log(parametros);
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.heroesUrl + 'Message/' + url, parametros);
}

ServicioPostUsers(url, parametros): Observable<any> {
  let headers = new HttpHeaders();
  console.log(parametros);
  headers = headers.set('Content-Type', 'application/json; charset=utf-8');
  return this.http.post(this.heroesUrl + 'Users/' + url, parametros);
}

}
