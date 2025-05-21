import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Payment, PaymentStatus } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }
  private getHeaders():HttpHeaders{
      const token = localStorage.getItem("accessToken")
      return new HttpHeaders({
            Authorization : `Bearer ${localStorage.getItem("accessToken")}` 
          })
  
    }
  
  getAllPayment():Observable<Array<Payment>>{
    const headers = this.getHeaders();
    return this.http.get<Array<Payment>>(environment.paymentUrl,{headers});
  }
  savePayment(formdata:any):Observable<Payment>{
    const headers = this.getHeaders();
    return this.http.post<Payment>(`${environment.paymentUrl}`,formdata,{headers});
  }
  deletePayment(id:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${environment.paymentUrl}/${id}`,{headers});
  }
  editePayment(id:any,formdata:any):Observable<Payment>{
    const headers = this.getHeaders();
    return this.http.put<Payment>(`${environment.paymentUrl}/${id}`,formdata,{headers});
  }
  deletePayemntByCode(code:any):Observable<any>{
    const headers = this.getHeaders();
    return this.http.delete(`${environment.paymentUrl}/paymentStudent/${code}`,{headers});
  }
  getPaymentById(id:any):Observable<Payment>{
    const headers = this.getHeaders();
    return this.http.get<Payment>(`${environment.paymentUrl}/paymentById/${id}`,{headers})
  }
  getFilePayment(id:any):Observable<Blob>{
    const headers = this.getHeaders();
    return this.http.get<Blob>(`${environment.paymentUrl}/paymentFile/${id}`,{
      responseType: 'blob' as 'json' ,headers});
  }
  editStatusPayment(id:any,status:string):Observable<Payment>{
    const headers = this.getHeaders();
    const params = new HttpParams().set('statusPayment', status);
    return this.http.put<Payment>(`${environment.paymentUrl}/paymentStatus/${id}`,null,{params,headers});
  }
}
