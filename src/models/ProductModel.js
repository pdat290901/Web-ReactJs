// const mongoose = require('mongoose')
// const ProductShema = new mongoose.Schema(
//     {
//         name:{type: String,required: true,unique: true},
//         image:{type: String,required: true},
//         type:{type: String,required: true},
//         price:{type: Number,required: true},
//         countInStock:{type: Number,required: true},
//         rating:{type: Number,required: true},
//         description:{type: String,required: true},

//     },
//     {
//         timestamps: true
//     }
// );
// const Product = mongoose.model("Product",userShema);
// module.exports = Product;
// ****************************************************************
//fixed
// Import thư viện Mongoose để kết nối và làm việc với MongoDB.
const mongoose = require('mongoose');
// Định nghĩa schema cho mô hình dữ liệu Product.
const ProductSchema = new mongoose.Schema(
    {
        // Trường name: kiểu dữ liệu là String, bắt buộc phải có, và phải là duy nhất trong collection.
        name: { type: String, required: true, unique: true },  
        image: { type: String, required: true }, 
        type: { type: String, required: true },     
        price: { type: Number, required: true },    
        countInStock: { type: Number, required: true }, 
        rating: { type: Number, required: true },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number },
        

    },
    {
        // Tùy chọn timestamps: true sẽ tự động thêm các trường createdAt và updatedAt vào tài liệu.
        timestamps: true
    }
);
// Tạo mô hình Product từ schema ProductSchema.
// Mô hình này sẽ dùng để tương tác với collection "products" trong MongoDB.
const Product = mongoose.model("Product", ProductSchema);

// Xuất mô hình Product để có thể sử dụng ở các module khác trong ứng dụng.
module.exports = Product;
