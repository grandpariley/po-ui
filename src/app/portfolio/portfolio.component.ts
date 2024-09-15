import { CommonModule } from "@angular/common";
import { Component, DestroyRef } from "@angular/core";
import { Portfolio } from "./model/portfolio.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, interval, mergeMap, takeUntil, tap } from "rxjs";
import { PortfolioService } from "./portfolio.service";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-portfolio',
    template: `
    <main>
        <pre>{{toString(portfolio)}}</pre>
    </main>
    `,
})
export class PortfolioContainerComponent {
    portfolio!: Portfolio;
    portfolioId!: string;
    loading = false;
    constructor(private activatedRoute: ActivatedRoute, private destroyRef: DestroyRef, private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.loading = true;
        this.activatedRoute.params
            .pipe(
                tap(params => this.portfolioId = params['portfolioId']),
                mergeMap(() => interval(500)),
                takeUntil(this.portfolioService.poll(this.portfolioId).pipe(filter(Boolean))),
                mergeMap(() => this.portfolioService.get(this.portfolioId)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(portfolio => { this.portfolio = portfolio; this.loading = false; })
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }
}