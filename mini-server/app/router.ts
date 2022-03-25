import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.prefix('/api');

  router.post('/user/login', controller.user.login);
  router.post('/user/register', controller.user.register);
  router.get('/user/userInfo', controller.user.userInfo);
};
