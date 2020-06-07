import { AlertsPage } from '../components/pages/alerts-page'
import { TestPage } from '../components/pages/test-page'
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
    component: TestPage,
  },
]
