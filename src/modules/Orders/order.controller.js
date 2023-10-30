import { AppError, catchAsync } from "../../errors/index.js"
import { validateOrder } from "./order.schema.js"
import { OrderServices } from "./order_service.js"
import { totalPrice } from "../../common/utils/totalPrice.js"
import { mealService } from '../Meals/meals.controller.js'

export const orderService = new OrderServices()

export const createOrder = catchAsync(async (req, res, next) => {
    const { hasError, errorMessage, orderData } = validateOrder(req.body)

    if (hasError) {
        return res.status(422).json({
            status: "error",
            message: errorMessage
        })
    }

    orderData.UserId = req?.sessionUser?.id;

    const meal = await mealService.findOneMeal(orderData.mealId)

    if (!meal) {
        next(new AppError(`Meal whit id ${orderData.mealId} not found`))
    }

    orderData.totalPrice = totalPrice(meal.price, orderData.quantity)

    const order = await orderService.createOrder(orderData)

    return res.json(order)
})

export const updateOrder = catchAsync(async (req, res, next) => {
})

export const deleteOrder = catchAsync(async (req, res, next) => {
})

export const findAllUserOrders = catchAsync(async (req, res, next) => {

    const { sessionUser: user } = req

    const orders = await orderService.findAllOrders(user?.id);

    return res.status(200).json(orders);
})