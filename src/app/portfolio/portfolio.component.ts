import { ChangeDetectionStrategy, Component, DestroyRef } from "@angular/core";
import { Portfolio } from "./model/portfolio.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, mergeMap, takeUntil, tap, timer } from "rxjs";
import { PortfolioService } from "./portfolio.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-portfolio',
    template: `
    <main *ngIf="!loading else loadingSpinner">
        <pre>{{toString(portfolio)}}</pre>
    </main>
    <ng-template #loadingSpinner>
        <pre>Loading...</pre>
    </ng-template>
    `,
})
export class PortfolioContainerComponent {
    portfolio!: Portfolio;
    portfolioId!: string;
    loading = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef,
        private portfolioService: PortfolioService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.activatedRoute.params
            .pipe(
                tap(params => this.portfolioId = params['portfolioId']),
                mergeMap(() => timer(0, 500)),
                tap(() => console.log('bump')),
                takeUntil(this.portfolioService.poll(this.portfolioId).pipe(filter(Boolean))),
                mergeMap(() => this.portfolioService.get(this.portfolioId)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(portfolio => { 
                this.portfolio = portfolio; 
                this.loading = false; 
            })
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }
}