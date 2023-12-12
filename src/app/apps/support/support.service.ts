import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Support } from './support.model';
import { map } from 'rxjs';
import { ApiResponse } from '@core/models/response';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private http: HttpClient) { }

  defaultUrl = environment['apiUrl'];

  getAllTickets() {
    const apiUrl = `${this.defaultUrl}admin/chatbot`;
    return this.http.get<Support>(apiUrl).pipe(map((response) => response));
  }
  getTicketById(id:string) {
    const apiUrl = `${this.defaultUrl}admin/chatbot/${id}`;
    return this.http.get<Support>(apiUrl).pipe(map((response) => response));
  }

  deleteTicket(id: string) {
    const apiUrl = `${this.defaultUrl}admin/chatbot/${id}`;
    return this.http
      .delete<Support>(apiUrl)
      .pipe(map((response) => response));
  }
  updateChat(dataDetails: Support) {
    const apiUrl = `${this.defaultUrl}admin/chatbot/${dataDetails.id}`;
    return this.http.put<ApiResponse>(apiUrl, dataDetails).pipe(
      map((response) => {
        return response.data
      })
    );
  }
}
