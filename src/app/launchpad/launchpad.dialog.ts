import { DialogRef } from "@angular/cdk/dialog";
import { Component, inject } from "@angular/core";
import { Routes } from "@angular/router";

import { SceneService } from "../services/scene.service";
import { routes } from "../app.routes";

@Component({
  selector: "app-launchpad",
  imports: [],
  template: `
    <div
      class="-z-[1] fixed inset-0 -mt-64 flex justify-center items-center h-svh"
      (mousedown)="dialogRef.close()"
    >
      <h1 class="text-white">
        Launchpad
      </h1>
    </div>

    <div class="overflow-auto w-[367px] h-[367px] rounded-2xl bg-white p-6 shadow-xl">
      <div class="flex flex-wrap gap-3">
        @for (route of routes; track route) {
          @if ($index !== 0) {
            <button
              (click)="sceneService.go($index); dialogRef.close()"
              class="soft-button"
              style="width: 51px;"
            >
              {{ $index }}
            </button>
          }
        }
      </div>
    </div>
  `,
})
export class LaunchpadDialog {
  protected readonly dialogRef: DialogRef<undefined>
    = inject(DialogRef);

  protected readonly sceneService: SceneService
    = inject(SceneService);

  protected readonly routes: Routes
    = routes;
}
