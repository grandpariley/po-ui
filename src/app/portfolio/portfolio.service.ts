import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Portfolio } from "./model/portfolio.model";

const URI = './api/v1/portfolio'

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    constructor(private http: HttpClient) { }

    get(portfolioId: string): Observable<Portfolio> {
        return this.http.get<Portfolio>(`${URI}/${portfolioId}`)
    }

    poll(portfolioId: string): Observable<boolean> {
        return this.http.get<{ 'status': string }>(`${URI}/${portfolioId}/status`)
            .pipe(
                map(statusResponse => statusResponse['status'] === 'READY')
            )
    }
}
