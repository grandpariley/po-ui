import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef } from "@angular/core";
import { PortfolioContainer } from "./model/portfolio.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { first, mergeMap, timer } from "rxjs";
import { PortfolioService } from "./portfolio.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-portfolio',
    template: `
    <main class="grid grid-cols-2" *ngIf="!loading else loadingSpinner">
        <table class="table-fixed w-full border-collapse m-8" *ngFor="let portolfio of portfolioContainer.portfolio">
        <thead>
            <tr class="bg-slate-100">
                <th class="border border-slate-400">Stock</th>
                <th class="border border-slate-400">Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let portfolio_option of portolfio.variables | keyvalue">
                <td class="border border-slate-400">{{portfolio_option.key}}</td>
                <td class="border border-slate-400">{{portfolio_option.value}}</td>
            </tr>
        </tbody>
        </table>
    </main>
    <ng-template #loadingSpinner>
        <pre class="flex items-center justify-center">Loading...</pre>
    </ng-template>
    `,
})
export class PortfolioContainerComponent {
    portfolioContainer!: PortfolioContainer;
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
            .subscribe(portfolioContainer => {
                this.portfolioContainer = portfolioContainer;
                this.loading = false;
                this.cdr.markForCheck();
            })
    }
}