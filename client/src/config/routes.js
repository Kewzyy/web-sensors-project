import { AlertsPage } from '../components/pages/alerts-page/'
import { LandingPage } from '../components/pages/landing-page'
import { FloorPlansPage } from '../components/pages/floor-plan-page'
import { DataOverviewPage } from '../components/pages/data-overview-page'
import {
  LANDING_PATH,
  ALERTS_PATH,
  FLOOR_PLAN_PATH,
  CHARTS_PATH,
  REAL_TIME_DATA_PATH,
} from '../constants'

export const routes = [
  {
    key: 'Landing',
    path: LANDING_PATH,
    component: LandingPage,
    exact: true,
  },
  {
    key: 'AlertsPageKey',
    path: ALERTS_PATH,
    component: AlertsPage,
  },
  {
    key: 'FloorPlansPageKey',
    path: FLOOR_PLAN_PATH,
    component: FloorPlansPage,
  },
  {
    key: 'ChartsKey',
    path: CHARTS_PATH,
    component: DataOverviewPage,
  },
  {
    key: 'RealTimeDataKey',
    path: REAL_TIME_DATA_PATH,
    component: LandingPage,
  },
]
