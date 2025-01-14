
const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel")
const EmailService = require("../services/EmailService")

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {  orderItems,  paymentMethod,  itemsPrice, shippingPrice,  totalPrice,  fullname,  address,  city,  phone,  user ,isPaid ,paidAt,email} = newOrder;
    try {
      const promises = orderItems.map(async(order)=>{
          const productData = await Product.findOneAndUpdate(
            {
              _id: order.product,
              countInStock: { $gte: order.amount },
            },
            {
              $inc: {
                countInStock: -order.amount,
                selled: +order.amount,
              }},
            { new: true }
            )
            if (productData) {
                return {
                  status: 'OK',
                  message: "success"
                }
            } 
            else {
                return {
                  status: "OK",
                  message: "ERR",
                  id: order.product,
                }
            }
      })
      const results = await Promise.all(promises)
      const newData = results && results.filter((item)=>item.id)
      if(newData.length){
          const arrId = []
          newData.forEach((item)=>{arrId.push(item.id) 

          })
          resolve({
            status: "ERR",
            message: `Sản phẩm có id ${arrId.join(',')} đã hết hàng`
          })
          
      }else{
      const createdOrder = await Order.create({
              orderItems,
              shippingAddress: {
                fullname,
                address,
                city,
                phone,
                },
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
                user: user,
                isPaid,
                paidAt,
              });
      if (createdOrder) {
           await EmailService.sendEmailCreateOrder(email, orderItems);
           resolve ({
             status: "OK",
             message: "Đơn hàng đã được tạo thành công!",
           })
         }
      }
    } catch (e) {
      console.log('Lỗi ở :',e)
      reject(e);
    }
  })
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      });

      if (order === null ) {
        resolve({
          status: "ERR",
          message: "Order không tồn tại!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Successfully retrieved order",
          data: order,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });

      if (order === null) {
        resolve({
          status: "ERR",
          message: "Order không tồn tại!",
        });
      } else {
        resolve({
          status: "OK",
          message: "Successfully retrieved order!",
          data: order,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


const cancelDetailsOrder = (id,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = []
      const promises = data.map(async(order)=>{
          const productData = await Product.findOneAndUpdate(
            {
              _id: order.product,
              selled : { $gte: order.amount },
            },
            {
              $inc: {
                countInStock: +order.amount,
                selled: -order.amount,
              }},
            { new: true }
          );
            if (productData) {
               order = await Order.findByIdAndDelete(id);
                if (!order) {
                  resolve({
                    status: "ERR",
                    message: "Order không tồn tại!",
                  });
                }
            } else {
                return{
                  status: "OK",
                  message: "ERR",
                  id: order.product
                }
            }
      })
      const results = await Promise.all(promises)
      const newData = results && results.filter((item)=>item)

      if(newData.length){
        resolve({
          status: "ERR",
          message: `Sản phẩm có id ${newData.join(",")} không tồn tại!`,
        });
      }else{
        resolve({
          status: "OK",
          message: 'successfully!',
          data: order
        });
      }
    }catch (e) {
      console.log('e',e)

      reject(e);
    }
  });
};



const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find();
      resolve({
        status: "OK",
        message: "successfully!",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};



module.exports = {
  createOrder,
  getAllOrderDetails,
  getOrderDetails,
  cancelDetailsOrder,
  getAllOrder,
};
