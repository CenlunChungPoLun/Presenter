import { NgOptimizedImage } from "@angular/common";
import { Component, inject } from "@angular/core";

import { PackageService } from "../services/package.service";

@Component({
  selector: "app-about-dialog",
  imports: [
    NgOptimizedImage,
  ],
  template: `
    <div class="overflow-auto max-w-[calc(100svw-2.5rem)] max-h-[calc(100svh-5rem)] rounded-2xl bg-white p-6 shadow-xl">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col py-4 gap-4 items-center">
          <div class="mt-4 flex gap-2.5 items-center-safe">
            <img
              alt="Presenter by Cenlun Logo"
              ngSrc="logo.svg"
              width="64"
              height="64"
            />

            <h3 class="sg-secondary mt-1 font-bold">Presenter <span class="text-black font-medium">by <span class="font-bold">Cenlun</span></span></h3>
          </div>

          <div class="flex flex-col justify-center-safe items-center-safe">
            <p>Version {{ package.app.version }}</p>
            <p>© 2026 鐘柏倫 (Cenlun Chung Po Lun)</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutDialog {
  protected readonly package: PackageService
    = inject(PackageService);
}
