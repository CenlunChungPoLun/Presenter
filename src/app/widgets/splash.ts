import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

import { EnvService } from "../services/env.service";

import { sleep } from "../../esm/sleep";

@Component({
  imports: [NgOptimizedImage],
  template: `
    @if (env.release) {
      <div
        class="fixed flex h-screen inset-0 justify-center items-center"
        xyz="small-5 origin-center"
      >
        <div
          class="flex gap-3 items-center-safe"
          [class.xyz-in]="active()"
          [class.animate__animated]="!active()"
          [class.animate__bounceOut]="!active()"
        >
          <img
            alt="Presenter by Cenlun Wordmark"
            ngSrc="logo.svg"
            width="96"
            height="96"
          />

          <h1 class="sg-secondary mt-1 font-bold">Presenter <span class="text-black font-medium">by <span class="font-bold">Cenlun</span></span></h1>
        </div>
      </div>
    }
  `,
})
export class Splash implements OnInit {
  protected readonly active: WritableSignal<boolean> = signal(true);

  protected readonly env: EnvService = inject(EnvService);

  public async ngOnInit(): Promise<void> {
    if (this.env.release) {
      await sleep(2000);
      this.active.set(false);
    }
  }
}
