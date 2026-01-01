import { Component } from "@angular/core";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: "app-title-scene",
  imports: [NgOptimizedImage],
  template: `
    <div
      class="container flex flex-wrap h-full mx-auto gap-12 justify-center items-center"
      xyz="fade stagger-1 right-5"
    >
      <div class="flex gap-3 items-center-safe xyz-in">
        <img
          alt="Presenter by Cenlun Logo"
          ngSrc="logo.svg"
          width="96"
          height="96"
        />

        <h1 class="sg-secondary mt-1 font-bold">Presenter <span class="text-black font-medium">by <span class="font-bold">Cenlun</span></span></h1>
      </div>
    </div>
  `,
})
export class TitleScene {}
