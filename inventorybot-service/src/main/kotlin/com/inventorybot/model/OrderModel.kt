package com.inventorybot.model

class OrderModel{
  var orderId:String?=null
  var appRegisteredId:String?=null
  var storeId:String?-null
  var creadtedBy:String?=null
  var createdDate :String?=null
  var products:List<ProductModel>?=null
}
class ProductModel
{
  var productId:String?=null
  var productName:String?=null
  var productPrice:String?=null

}
