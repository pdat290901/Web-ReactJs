const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, price, countInStock, rating, description ,discount} =
      newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "the name of product is already!",
        });
      }

      const newProduct = await Product.create({
        name,
        image,
        type,
        price,
        countInStock:Number(countInStock),
        rating,
        description,
        discount:Number(discount),
      });
      if (newProduct) {
        resolve({
          status: "OK",
          message: "successfully!",
          data: newProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById(id);

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "Product không tồn tại !",
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      resolve({
        status: "OK",
        message: "successfully!",
        data: updatedProduct,
      });
    } catch (e) {
      reject({
        status: "ERR",
        message: "Có lỗi xảy ra khi cập nhật người dùng.",
        error: e.message,
      });
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProduct = await Product.findById(id);

      if (checkProduct === null) {
        resolve({
          status: "OK",
          message: "Product không tồn tại !",
        });
      }
      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete Product successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteManyProduct = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      // await Product.deleteManyProduct({ _id: ids });
      await Product.deleteMany({ _id: { $in: ids } }); 
      resolve({
        status: "OK",
        message: "Delete Product successfully!",
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllProduct = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProduct = await Product.countDocuments();
      let allProduct = []
      if (filter) {
        const label = filter[0];

        const allObjectFilter = await Product.find({
          [label]: { $regex: filter[1] },
        })
          .limit(limit)
          .skip(page * limit);
        resolve({
          status: "OK",
          message: "successfully!",
          data: allObjectFilter,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPgae: Math.ceil(totalProduct / limit),
        });
      }
      if (sort) {
        const objectSort = {};
        objectSort[sort[1]] = sort[0];
        const allProductSort = await Product.find()
          .limit(limit)
          .skip(page * limit)
          .sort(objectSort);
        resolve({
          status: "OK",
          message: "successfully!",
          data: allProductSort,
          total: totalProduct,
          pageCurrent: Number(page + 1),
          totalPgae: Math.ceil(totalProduct / limit),
        });
      }
      if(!limit){
        allProduct = await Product.find();
      }else{
        allProduct = await Product.find() .limit(limit) .skip(page * limit);
      }
      resolve({
        status: "OK",
        message: "successfully!",
        data: allProduct,
        total: totalProduct,
        pageCurrent: Number(page + 1),
        totalPgae: Math.ceil(totalProduct / limit),
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findById(id);

      if (product === null) {
        resolve({
          status: "OK",
          message: "Product không tồn tại !",
        });
      }
      resolve({
        status: "OK",
        message: " successfully!",
        data: product,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct('type')

      resolve({
        status: "OK",
        message: "successfully!",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  getAllProduct,
  deleteManyProduct,
  getAllType
};
