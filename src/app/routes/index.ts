import { Router } from "express";
import {ServiceRoutes} from "../modules/service/service.route";
import {EventRoutes} from "../modules/event/event.route";
import {RecentEventRoutes} from "../modules/recentEvent/recentEvent.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/events',
    route: EventRoutes,
  },
  {
    path: '/recent-events',
    route: RecentEventRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;