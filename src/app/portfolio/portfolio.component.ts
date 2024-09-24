import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from "@angular/core";
import { Portfolio } from "./model/portfolio.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { first, mergeMap, timer } from "rxjs";
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
    portfolioId: string | null = null;
    loading = false;
    constructor(
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef,
        private cdr: ChangeDetectorRef,
        private portfolioService: PortfolioService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.portfolioId = this.activatedRoute.snapshot.queryParamMap.get('portfolioId');
        if (!this.portfolioId) {
            return;
        }
        timer(0, 5000)
            .pipe(
                mergeMap(() => this.portfolioService.poll(this.portfolioId as string)),
                first(Boolean),
                mergeMap(() => this.portfolioService.get(this.portfolioId as string)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(portfolio => {
                this.portfolio = portfolio;
                this.loading = false;
                this.cdr.markForCheck();
            })
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }
}