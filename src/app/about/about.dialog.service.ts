import { Dialog, DialogRef } from "@angular/cdk/dialog";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AboutDialog } from "./about.dialog";

@Injectable({
  providedIn: "root",
})
export class AboutDialogService {
  private readonly dialog: Dialog
    = inject(Dialog);

  public readonly showAboutDialogAsync = async (): Promise<undefined> => {
    const dialogRef: DialogRef<unknown, AboutDialog>
      = this.dialog.open(AboutDialog);

    const result: unknown = await firstValueFrom(dialogRef.closed);

    return result as undefined;
  };
}
