import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import {EventControllers} from './event.controller'
import {EventValidation} from './event.validation'

const router = express.Router()

router.post(
  '/add-event', 
  validateRequest(EventValidation.createEventValidationSchema),
  EventControllers.createEvent
)

router.get('/', EventControllers.getEvents)
router.get('/:id', EventControllers.getSingleEvent)

router.put(
  '/update-event/:id', 
  validateRequest(EventValidation.updateEventValidationSchema),
  EventControllers.updateEvent
)
router.delete(
  '/delete-event/:id', 
  EventControllers.deleteEvent
)


export const EventRoutes = router