import { Injectable } from "@angular/core";

import packageJson from "../../../package.json";

@Injectable({
  providedIn: "root",
})
export class PackageService {
  public readonly app = {
    version: packageJson.version,
  };
}
