import {
  Injectable,
  isDevMode,
  signal,
  WritableSignal,
} from "@angular/core";

import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";

type GlobalThis = typeof globalThis & Window & {
  NaN: never;
  Infinity: never;
};

interface CurrentWindow extends GlobalThis {
  isTauri: boolean;
}

@Injectable({
  providedIn: "root",
})
export class EnvService {
  public readonly dev: boolean = isDevMode();
  public readonly release: boolean = !this.dev;

  public readonly os = {
    linux: navigator.userAgent.toLowerCase().includes("linux"),
    macos: navigator.userAgent.toLowerCase().includes("mac"),
    windows: navigator.userAgent.toLowerCase().includes("win"),
  };

  public readonly desktop: WritableSignal<boolean> = signal(false);
  public readonly web: WritableSignal<boolean> = signal(false);

  public readonly runtime = signal({
    tauri: (window as CurrentWindow).isTauri,
  });

  public readonly fullscreen: WritableSignal<boolean> = signal(false);
  public readonly windowed: WritableSignal<boolean> = signal(
    !this.fullscreen(),
  );

  constructor() {
    this.checkIsDesktopRuntime().then((response: void) => response);
  }

  public readonly toggleFullscreen = async (): Promise<void> => {
    if (this.runtime().tauri) await getCurrentWebviewWindow().setFullscreen(!this.fullscreen());
    else if (this.fullscreen()) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
    this.windowed.set(this.fullscreen());
    this.fullscreen.set(!this.fullscreen());
  };

  private readonly checkIsDesktopRuntime = async (): Promise<void> => {
    this.desktop.set(this.runtime().tauri);
    this.web.set(!this.desktop());
  };
}
