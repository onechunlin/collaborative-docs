import "egg";
import { Doc } from "sharedb";

declare module "egg" {
  // 扩展 app
  interface Application {
    sharedbDoc: (docId: string) => Doc;
  }
}
