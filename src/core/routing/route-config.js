import SignUp from '../../features/auth/components/signup';
import Login from '../../features/auth/components/login';
import CreateHotelPage from '../../features/admin-page/components/create-hotel-page';
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
  {
    path: '/new-hotel',
    component: CreateHotelPage,
    exact: true,
    requireAuth: true,
  },
  { component: NotFound },
];

export default routes;
