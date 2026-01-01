import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { Route, Router } from "@angular/router";

import { EnvService } from "./env.service";

import { routes } from "../app.routes";

@Injectable({
  providedIn: "root",
})
export class SceneService {
  private readonly router: Router = inject(Router);

  private readonly env: EnvService = inject(EnvService);

  public readonly sceneIndex: WritableSignal<number> = signal(0);

  constructor() {
    const sceneIndex: string | null = sessionStorage.getItem("sceneIndex");
    if (sceneIndex !== null) {
      this.sceneIndex.set(parseInt(sceneIndex) || 0);
    }
    else {
      sessionStorage.setItem("sceneIndex", this.sceneIndex().toString());
    }
  }

  public readonly go = (target: string | number): void => {
    let index: number;

    if (typeof target === "string") {
      const path: Route | undefined = routes.find(
        ({ path }): boolean => path === target,
      );

      if (path) {
        index = routes.indexOf(path);
      }
      else {
        alert(`Page ${target} not found!`);
        return;
      }
    }
    else {
      index = target;

      if (!routes[index]) {
        alert(`Page ${target} not found!`);
        return;
      }
    }

    this.router
      .navigate([routes[index].path])
      .then((): void => {
        this.sceneIndex.set(index);
        sessionStorage.setItem("sceneIndex", String(index));
      });
  };

  public readonly goPrevious = (): void => {
    if (this.sceneIndex() > 1) this.go(this.sceneIndex() - 1);
    else alert("This page is the first page!");
  };

  public readonly goHome = (): void => {
    if (this.sceneIndex() === 1)
      if (this.env.dev) this.go(1);
      else alert("This page is the first page!");
    else this.go(1);
  };

  public readonly goNext = (): void => {
    if (this.sceneIndex() < routes.length - 1) this.go(this.sceneIndex() + 1);
    else alert("This page is the last page!");
  };
}
