import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import {RecentEventValidation} from './recentEvent.validation'
import {RecentEventControllers} from './recentEvent.controllers'

const router = express.Router()

router.post(
  '/add-recent-event', 
  validateRequest(RecentEventValidation.createRecentEventValidationSchema),
  RecentEventControllers.createRecentEvent
)

router.get('/', RecentEventControllers.getRecentEvents)
router.get('/:id', RecentEventControllers.getSingleRecentEvent)

router.put(
  '/update-recent-event/:id', 
  validateRequest(RecentEventValidation.updateRecentEventValidationSchema),
  RecentEventControllers.updateRecentEvent
)
router.delete(
  '/delete-recent-event/:id', 
  RecentEventControllers.deleteRecentEvent
)


export const RecentEventRoutes = router