import SignUp from '../../features/auth/components/signup';
import Login from '../../features/auth/components/login';
import NotFound from './not-found';

const routes = [
  {
    path: '/signup',
    component: SignUp,
    exact: true,
    requireAuth: false,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    requireAuth: false,
  },
  { component: NotFound },
];

export default routes;