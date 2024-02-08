import express from 'express'
import {ServiceValidation} from './service.validation'
import validateRequest from '../../middleware/validateRequest'
import {ServiceControllers} from './service.controller'

const router = express.Router()

router.post(
  '/add-service', 
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceControllers.createService
)

router.get('/', ServiceControllers.getServices)
router.get('/:id', ServiceControllers.getSingleService)

router.put(
  '/update-service/:id', 
  validateRequest(ServiceValidation.updateServiceValidationSchema),
  ServiceControllers.updateService
)
router.delete(
  '/delete-service/:id', 
  ServiceControllers.deleteService
)


export const ServiceRoutes = router