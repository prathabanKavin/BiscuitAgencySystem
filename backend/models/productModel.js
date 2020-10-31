const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    ProductId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ProductId',
       },

    ProductName: {
        type:String,
        required:true,
       },

    ProductWeight: {
        type:String,
        required:true,
       },

    ProductDescription:{
        Product_Type : { type:String, required:true},
        ExpireDate :{ type:Date, required:true}
     },

     Product_BuyingPrice:{
      type:Number,
      required:true,
    },

   Product_sellingPrice:{
      type:Number,
      required:true,
    },
   CountInStockIdeam:{
        type:Number,
         required:true,
    },
     Bought_From:{
      type:String,
      required:true,
     },

     Bought_date:{
       type:Date,
       required:true,
     },
    },
     {
      timestamps : true
  })
  
  const Product = mongoose.model('Product', productSchema)
  
  module.exports = Product