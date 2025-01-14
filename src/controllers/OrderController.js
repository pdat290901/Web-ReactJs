const OrderService = require("../services/OrderService");

//  const { paymentMethod,  itemsPrice,  shippingPrice,  totalPrice,  fullname,  address,  city,  phone ,} = req.body;
//     if ( !paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullname || !address || !city || !phone ) 
const createOrder = async (req, res) => {
  try { 
    const { paymentMethod,  itemsPrice,   totalPrice,  fullname,  address,  city,  phone ,} = req.body;
    if ( !paymentMethod || !itemsPrice || !totalPrice || !fullname || !address || !city || !phone ) 
      {
      return res.status(200).json({
        status: "ERR",
        message: "Phải nhập đủ thông tin",
      });     
    } 
    const response = await OrderService.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    
      return res.status(404).json({
      status: "ERR",
      message: "Đã xảy ra lỗi trong quá trình tạo đơn hàng.",
      error: e.message, // Có thể ghi ra thông báo lỗi cụ thể
    });
  }
};
const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId required",
      });
    }
    const response = await OrderService.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};


const cancelOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body
    if (!orderId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId required",
      });
    }
    const response = await OrderService.cancelDetailsOrder(orderId,data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    
    const data = await OrderService.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
};
