import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";

import { EnvService } from "../services/env.service";

import { sleep } from "../../esm/sleep";

@Component({
  selector: "app-canvas",
  standalone: true,
  template: `
    <div
      class="h-full transition-all"
      [class.bg-white]="active()"
      [class.sg-corner-radius]="active()"
      [class.sg-shadow]="active()"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class Canvas implements OnInit {
  protected readonly active: WritableSignal<boolean> = signal(false);

  private readonly env: EnvService = inject(EnvService);

  public async ngOnInit(): Promise<void> {
    if (this.env.release) await sleep(3300);
    this.active.set(true);
  }
}
