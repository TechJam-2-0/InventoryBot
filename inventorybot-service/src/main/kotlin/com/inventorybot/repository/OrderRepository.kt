package com.inventorybot.repository

import com.mongodb.client.model.*
import com.inventorybot.config.MongoClientConfig
import org.bson.Document
import java.util.*
import javax.inject.Inject
import javax.inject.Singleton
import com.inventorybot.model.*
import com.inventorybot.logger
import com.inventorybot.constants.InventoryConstant

interface OrderRepository {
  fun getAllOrders(appRegisteredId:String): List<Document>?
  fun getOrderById(orderid:String): List<Document>?
  fun createOrder(order:OrderModel):Document?
}
@Singleton
class OrderRepositoryImpl:OrderRepository {
  @Inject
  lateinit var mongoClient: MongoClientConfig
  @Inject
  lateinit var mongoCollection: RepositoryCollection
  companion object {
    private val LOGGER = logger(this)
  }

  override fun createOrder(order:OrderModel): Document? {
    TODO("Not yet implemented")
    return null
  }


  override fun getAllOrders(appRegisteredId:String): List<Document>? {
    LOGGER.info("Get All Orders")
    var orderDocumentResult:List<Document>?
    try {
      val appRegisteredFilter = Filters.eq("appRegisteredId", appRegisteredId)
      var indexFields:MutableList<String>? = mutableListOf()
      //Add list of index fields
      indexFields?.add("orderId")
      indexFields?.add("appRegisteredId")
      indexFields?.add("storeId")

      var orderCollection =mongoCollection.getDbCollection(InventoryConstant.ORDER_COLLECTION,indexFields,mongoClient)
      orderDocumentResult = orderCollection?.aggregate(
        Arrays.asList(
          Aggregates.match(Filters.and(appRegisteredFilter))
        )
      )!!.toList()//?.forEach({ document -> println("Document is print $document.toJson()") })
      LOGGER.info("Get Order List : ${orderDocumentResult.size}")

    } catch (ex: Exception) {
      LOGGER.error("Exception on OrderList in repository ${ex.message}")
      throw ex
    }
    return orderDocumentResult
  }

  override fun getOrderById(orderid: String): List<Document>? {
    TODO("Not yet implemented")
    return null;
  }


}
