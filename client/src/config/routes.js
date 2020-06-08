import { AlertsPage } from '../components/pages/alerts-page/'
import { LandingPage } from '../components/pages/landing-page'

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
    key: 'DashboardKey',
    path: '/dashboard',
    component: LandingPage,
  },
]
