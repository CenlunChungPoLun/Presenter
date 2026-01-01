import { Component } from "@angular/core";

@Component({
  selector: "app-scene2",
  standalone: true,
  template: `
    <div class="container pt-8 xyz-in" xyz="fade stagger-0.5 right-5">
      <h1 class="xyz-in">Page 2</h1>
      <hr class="xyz-in" />
      <h1 class="display-1 xyz-in">Lorem Ipsum.</h1>
      <h1 class="display-2 xyz-in">Lorem Ipsum.</h1>
      <h1 class="display-3 xyz-in">Lorem Ipsum.</h1>
      <h1 class="display-4 xyz-in">Lorem Ipsum.</h1>
      <h1 class="display-5 xyz-in">Lorem Ipsum.</h1>
      <h1 class="display-6 xyz-in">Lorem Ipsum.</h1>
    </div>
  `,
})
export class Scene2 {}
