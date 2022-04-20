import { Application } from "egg";

export default (app: Application) => {
  const { controller, router, io } = app as any;
  router.prefix("/api");

  router.post("/user/login", controller.user.login);
  router.post("/user/register", controller.user.register);
  router.get("/user/userInfo", controller.user.userInfo);
  router.get("/user/getToken", controller.user.getToken);

  router.post("/doc/create", controller.doc.create);
  router.post("/doc/delete", controller.doc.delete);

  // websocket 路由
  io.of("/io/doc").route("detail", io.controller.doc.detail);
  io.of("/io/doc").route("disconnect", io.controller.doc.disconnect);
};
