import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "@core/models/response";
import { AppConstants } from "@shared/constants/app.constants";
import { environment } from "environments/environment";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {

    private prefix: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    registerUser(course: any) {
        const apiUrl = `${this.prefix}auth/UserCreate`;
        return this.http
          .post<ApiResponse>(apiUrl, course)
          .pipe(map((response) => { }));
      }

}
