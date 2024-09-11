import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Portfolio } from "./model/portfolio.model";

const URI = ''

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    constructor(private http: HttpClient) { }

    get(portfolioId: string): Observable<Portfolio> {
        return this.http.get<Portfolio>(`${URI}/${portfolioId}`)
    }
}
