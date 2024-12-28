import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-error-container',
    template: `
    <main>
        <pre>{{toString(err)}}</pre>
    </main>
    `,
})
export class ErrorContainerComponent implements OnInit {
    err: any;
    
    constructor(private activatedRoute: ActivatedRoute) { }
    
    ngOnInit(): void {
        this.err = this.activatedRoute.snapshot.queryParamMap.get('error');
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }

}