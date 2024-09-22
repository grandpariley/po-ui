import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Portfolio } from "./model/portfolio.model";
import { environment } from "../../environment/environment";

const URI = `${environment.SERVICE_URI}/portfolio`

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
