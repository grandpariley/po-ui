import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

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
    
    constructor() { }
    
    ngOnInit(): void {
        this.err = history.state;
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }

}