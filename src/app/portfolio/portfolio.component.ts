import { CommonModule } from "@angular/common";
import { Component, DestroyRef, Input } from "@angular/core";
import { Portfolio } from "./model/portfolio.model";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { debounceTime, mergeMap } from "rxjs";
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
    portfolio: Portfolio | null = null;

    constructor(private activatedRoute: ActivatedRoute, private destroyRef: DestroyRef, private portfolioService: PortfolioService) { }

    ngOnInit(): void {
        this.activatedRoute.params
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                debounceTime(20),
                mergeMap(params => this.portfolioService.get(params['portfolioId']))
            )
            .subscribe(portfolio => this.portfolio = portfolio)
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }
}