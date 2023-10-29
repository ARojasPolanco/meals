import Meal from "./meals.model.js"

export class MealServices {

  async findAllMeals() {
    return await Meal.findAll({
      where: {
        status: true
      }
    })
  }

  async createMeal(data) {
    return await Meal.create(data)
  }

  async findOneMeal(id) {
    return await Meal.findOne({
      where: {
        id: id
      }
    })
  }

  async updateMeal(meal, data) {
    return await meal.update(data)
  }

  async deleteMeal(meal) {
    return await meal.update({
      status: false
    })
  }
}