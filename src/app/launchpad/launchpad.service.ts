import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { LaunchpadDialog } from "./launchpad.dialog";

@Injectable({
  providedIn: "root",
})
export class LaunchpadService {
  private readonly dialog: Dialog
    = inject(Dialog);

  public readonly showLaunchpadAsync = async (): Promise<undefined> => {
    const dialogRef: DialogRef<unknown, LaunchpadDialog>
      = this.dialog.open(LaunchpadDialog);

    const result: unknown = await firstValueFrom(dialogRef.closed);

    return result as undefined;
  };
}
