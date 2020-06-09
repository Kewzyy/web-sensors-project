import { AlertsPage } from '../components/pages/alerts-page/'
import { LandingPage } from '../components/pages/landing-page'
import { FloorPlansPage } from '../components/pages/floor-plan-page'

export const routes = [
  {
    key: 'Landing',
    path: '/',
    component: AlertsPage,
    exact: true,
  },
  {
    key: 'AlertsPageKey',
    path: '/alerts',
    component: AlertsPage,
  },
  {
    key: 'FloorPlansPageKey',
    path: '/floor-plan',
    component: FloorPlansPage,
  },
  {
    key: 'DashboardKey',
    path: '/dashboard',
    component: LandingPage,
  },
]
