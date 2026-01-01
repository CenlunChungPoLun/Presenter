import { Routes } from "@angular/router";

import { Splash } from "./widgets/splash";

import { TitleScene } from "./scenes/title.scene";

import { Scene2 } from "./scenes/scene2";
import { Scene3 } from "./scenes/scene3";

export const routes: Routes = [
  { path: "", component: Splash },

  { path: "title-scene", component: TitleScene },

  { path: "scene2", component: Scene2 },
  { path: "scene3", component: Scene3 },
];
