import SignUp from '../../features/auth/components/signup';
import Login from '../../features/auth/components/login';
import CreateHotelPage from '../../features/admin-page/components/create-hotel-page';
import NotFound from './not-found';

import Home from '../../features/home/components/home';
import Review from '../../features/home/components/reviews';

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
  {
    path: '/hotel',
    component: CreateHotelPage,
    exact: true,
    requireAuth: true,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    requireAuth: false,
  },

  {
    path: '/review',
    component: Review,
    exact: true,
    requireAuth: false,
  },
  { component: NotFound },
];

export default routes;
