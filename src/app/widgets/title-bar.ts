import { Component, inject } from "@angular/core";

import { EnvService } from "../services/env.service";

@Component({
  selector: "app-title-bar",
  standalone: true,
  template: `
    @if (
      env.os.macos && env.desktop() && env.windowed()
    ) {
      <div
        style="height: 28px;"
        [attr.data-tauri-drag-region]="env.runtime().tauri"
      ></div>
    }
  `,
})
export class TitleBar {
  protected readonly env: EnvService = inject(EnvService);
}
