import express from "express";
import asyncHandler from "express-async-handler";
import { HTTP_STATUS } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from "../middlewares/auth.mid";

const router = express.Router();
router.use(auth);

router.post("/create", asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0){
        res.status(HTTP_STATUS.BAD_REQUEST).send("Cart Is Empty");
        return;
    }

    //deleting if a new order there, rather than updating it
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW,
    })

    const newOrder = new OrderModel({...requestOrder, user:req.user.id});
    await newOrder.save();

    res.send(newOrder);
}))

router.get("/newOrderForCurrentUser", asyncHandler(async (req:any, res)=> {
    const order = await getNewOrderForCurrentUser(req)

    if(order) res.send(order);

    res.status(HTTP_STATUS.NOT_FOUND).send();
}))

router.post('/pay', asyncHandler(async (req:any, res:any) => {
    const {paymentId} = req.body;

    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_STATUS.NOT_FOUND).send("order not found");
        return;
    }

    order.paymentId = paymentId;
    order.status =  OrderStatus.PAYED;
    
    await order.save();
    res.send(order._id);
}))

router.get('/track/:orderId', asyncHandler(async(req:any, res) => {
    const order = await OrderModel.findById(req.params.orderId);
    res.send(order);
}))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });
}
