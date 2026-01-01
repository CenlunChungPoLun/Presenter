import { Component, inject } from "@angular/core";

import { EnvService } from "../services/env.service";

@Component({
  selector: "app-frame",
  standalone: true,
  template: `
    <div
      class="h-screen px-2 pb-2"
      [class.pt-2]="
        !(
          env.os.macos &&
          env.desktop() &&
          env.windowed()
        )
      "
      [class.bg-white]="env.os.linux"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class Frame {
  protected readonly env: EnvService = inject(EnvService);
}
