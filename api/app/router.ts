import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app as any;
  router.prefix("/api");

  router.post("/user/login", controller.user.login);
  router.post("/user/register", controller.user.register);
  router.get("/user/userInfo", controller.user.userInfo);
  router.get("/user/getToken", controller.user.getToken);

  // md 文档接口
  router.post("/md_doc/create", controller.mdDoc.create);
  router.post("/md_doc/update", controller.mdDoc.update);
  router.post("/md_doc/detail", controller.mdDoc.detail);
  router.post("/md_doc/search", controller.mdDoc.search);

  // 协同文档
  router.post("/coll_doc/create", controller.collDoc.create);
  router.post("/coll_doc/updateTitle", controller.collDoc.updateTitle);
  router.post("/coll_doc/detail", controller.collDoc.detail);
  router.post("/coll_doc/search", controller.collDoc.search);
};
