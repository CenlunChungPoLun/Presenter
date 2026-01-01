import { Component } from "@angular/core";

@Component({
  selector: "app-layout",
  standalone: true,
  template: `
    <div class="flex flex-col h-full">
      <ng-content></ng-content>
    </div>
  `,
})
export class Layout {}
