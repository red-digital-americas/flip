import { Injectable } from '@angular/core';

// Importar objetos de la librería http
//import { Http, Response, RequestOptions, Headers } from '@angular/http';
// Importar la clase Observable desde la librería rxjs
//import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root'
})
export class DatosService {


<<<<<<< HEAD
  //public heroesUrl = 'http://localhost:49314/api/';  // URL to web api 
   public heroesUrl = 'http://23.253.173.64:8088/api/';  // URL to web api 
=======
  // public heroesUrl = 'http://localhost:49314/api/';  // URL to web api 
  public heroesUrl = 'http://23.253.173.64:8088/api/';  // URL to web api 
>>>>>>> 907108201cf6fa6333ea974f3566531a05d333ba
  private url: string = 'http://23.253.173.64:8088/'; // URL api server 
  
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

}
