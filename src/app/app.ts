import { Component, HostListener, inject, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { EnvService } from "./services/env.service";
import { SceneService } from "./services/scene.service";

import { Frame } from "./widgets/frame";
import { Layout } from "./widgets/layout";
import { TitleBar } from "./widgets/title-bar";
import { Canvas } from "./widgets/canvas";
import { Nav } from "./widgets/nav";

import { sleep } from "../esm/sleep";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    Frame,
    Layout,
    TitleBar,
    Canvas,
    Nav,
  ],
  template: `
    <app-frame>
      <app-layout>
        <app-title-bar></app-title-bar>

        <app-canvas class="h-full">
          <router-outlet></router-outlet>
        </app-canvas>

        <app-nav></app-nav>
      </app-layout>
    </app-frame>
  `,
})
export class App implements OnInit {
  protected readonly env: EnvService = inject(EnvService);
  protected readonly scene: SceneService = inject(SceneService);

  public async ngOnInit(): Promise<void> {
    if (this.env.release) {
      await sleep(3300);
      this.scene.go(1);
    }
  }

  @HostListener("contextmenu")
  protected readonly onContextMenu = (event: MouseEvent): void => {
    if (this.env.release) event.preventDefault();
  };

  @HostListener("dragstart")
  protected readonly onDragStart = (event: MouseEvent): void =>
    event.preventDefault();

  @HostListener("selectstart")
  protected readonly onSelectStart = (event: MouseEvent): void =>
    event.preventDefault();
}
