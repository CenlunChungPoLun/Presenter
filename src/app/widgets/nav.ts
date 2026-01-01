import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from "@angular/core";
import { NgOptimizedImage } from "@angular/common";
import { Routes } from "@angular/router";

import { EnvService } from "../services/env.service";
import { SceneService } from "../services/scene.service";
import { AboutDialogService } from "../about/about.dialog.service";
import { LaunchpadService } from "../launchpad/launchpad.service";

import { routes } from "../app.routes";

import { sleep } from "../../esm/sleep";

@Component({
  selector: "app-nav",
  imports: [NgOptimizedImage],
  template: `
    @if (active()) {
      <div class="mt-2" xyz="fade down-100%">
        <nav
          class="grid grid-cols-[168px_minmax(0,_1fr)_168px] p-2 bg-white sg-corner-radius sg-shadow"
          [class.xyz-in]="env.release"
        >
          <div
            class="flex gap-2"
            xyz="fade down-100% small-100% stagger-1 delay-1"
          >
            <button
              title="Previous page"
              (click)="scene.goPrevious()"
              class="sg-button"
              [class.xyz-in]="env.release"
            >
              <i class="bi bi-arrow-left"></i>
            </button>

            <button
              title="Home page"
              (click)="scene.goHome()"
              class="sg-button"
              [class.xyz-in]="env.release"
            >
              <i class="bi bi-house-door"></i>
            </button>

            <button
              [title]="env.fullscreen() ? 'Windowed mode' : 'Fullscreen mode'"
              (click)="env.toggleFullscreen()"
              class="sg-button"
              [class.xyz-in]="env.release"
            >
              <i
                [class.bi-fullscreen]="!env.fullscreen()"
                [class.bi-fullscreen-exit]="env.fullscreen()"
              ></i>
            </button>

            <button
              title="About Presenter by Cenlun"
              (click)="aboutDialogService.showAboutDialogAsync()"
              class="sg-button"
              [class.xyz-in]="env.release"
            >
              <i class="bi bi-info-circle"></i>
            </button>
          </div>

          <div class="flex justify-center" xyz="fade delay-9">
            <div class="flex gap-2 items-center" [class.xyz-in]="env.release">
              <img
                alt="Presenter by Cenlun Logo"
                ngSrc="logo.svg"
                width="24"
                height="24"
              />

              <span class="sg-secondary font-bold">Presenter <span class="text-black font-medium">by <span class="font-bold">Cenlun</span></span></span>
            </div>
          </div>

          <div
            class="flex gap-2 justify-end"
            xyz="fade down-100% small-100% stagger-rev-3 delay-1"
          >
            <button
              title="Launchpad"
              (click)="launchpadService.showLaunchpadAsync()"
              class="flex gap-2 sg-button"
              [class.xyz-in]="env.release"
            >
              <i class="bi bi-grid-3x3-gap"></i>
              <span>{{ scene.sceneIndex() }}...{{ routes.length - 1 }}</span>
            </button>

            <button
              title="Next page"
              (click)="scene.goNext()"
              class="sg-button"
              [class.xyz-in]="env.release"
            >
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </nav>
      </div>
    }
  `,
})
export class Nav implements OnInit {
  protected readonly active: WritableSignal<boolean> = signal(false);

  protected readonly env: EnvService = inject(EnvService);
  protected readonly scene: SceneService = inject(SceneService);

  protected readonly aboutDialogService: AboutDialogService
    = inject(AboutDialogService);

  protected readonly launchpadService: LaunchpadService
    = inject(LaunchpadService);

  protected readonly routes: Routes = routes;

  public async ngOnInit(): Promise<void> {
    if (this.env.release) await sleep(2400);
    this.active.set(true);
  }

  @HostListener("window:keydown", ["$event"])
  protected readonly HotkeyHandler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "PageUp":
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        this.scene.goPrevious();
        break;

      case "PageDown":
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        this.scene.goNext();
        break;
      default:
        break;
    }
  };
}
