import express from 'express';

import {
  findAllMeals,
  findOneMeals,
  updateMeals,
  deleteMeals,
  createMeals,
} from "./meals.controller.js"

import { validExistRestaurant } from '../Restaurants/restaurant.middleware.js'

export const router = express.Router();

router.route('/:id').post(validExistRestaurant, createMeals)

router.route('/').get(findAllMeals)

router.route('/:id')
  .get(findOneMeals)
  .patch(updateMeals)
  .delete(deleteMeals)

