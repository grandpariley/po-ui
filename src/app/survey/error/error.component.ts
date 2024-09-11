import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    standalone: true,
    selector: 'app-error-container',
    imports: [CommonModule],
    template: `
    <main>
        <pre>{{toString(err)}}</pre>
    </main>
    `,
})
export class ErrorContainerComponent implements OnInit {
    err: any;
    
    constructor(private router: Router) { }
    
    ngOnInit(): void {
        this.err = history.state;
    }

    toString(object: any): string {
        return JSON.stringify(object, null, 2);
    }

}