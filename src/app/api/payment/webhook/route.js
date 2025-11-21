// pages/api/payment/webhook.js
import dbConnect from "@/lib/mongodb";
import Order from "@/models/order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const event = req.body;

    if (event.event === "charge.success") {
      const { orderId } = event.data.metadata;
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).send("Order not found");

      order.status = "paid";
      await order.save();
    }

    return res.status(200).send("Webhook received");
  }
  res.status(405).send("Method not allowed");
}