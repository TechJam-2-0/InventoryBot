package com.inventorybot.service

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.bson.Document
import java.math.BigDecimal
import java.text.DecimalFormat
import javax.inject.Singleton
import com.inventorybot.repository.OrderRepository
import com.inventorybot.model.OrderModel
import com.inventorybot.logger
import com.inventorybot.constants.InventoryConstant

interface InventoryService {
  suspend fun getAllOrders(appRegisteredId:String):JsonNode?
  suspend fun getOrderById(orderid:String): JsonNode?
  suspend fun createOrder(order:List<OrderModel>):JsonNode?
}

@Singleton
class InventoryServiceImpl(private val orderRepository: OrderRepository):InventoryService {
  companion object {
    private val LOGGER = logger(this)
  }
  override suspend fun createOrder(order:List<OrderModel>): JsonNode? {
    TODO("Not yet implemented")
    return null
  }
  override suspend fun getAllOrders(appRegisteredId:String): JsonNode? {
    LOGGER.info("Get all Orders")
    val mapper = ObjectMapper()
    var orderJsonNode: JsonNode?

    try {
      var orderResult =
        orderRepository.getAllOrders(appRegisteredId)

      when {
        orderResult.isNullOrEmpty() -> {
          throw Exception(InventoryConstant.EMPTY_LIST)
        }
        else -> {
          orderJsonNode = mapper.readTree(mapper.writeValueAsString(orderResult))
        }
      }
    } catch (ex: Exception) {
      LOGGER.error("Exception on during get all orders result ${ex.message}")
      throw ex
    }
    return orderJsonNode
  }
  override suspend fun getOrderById(orderid: String): JsonNode? {
    TODO("Not yet implemented")
    return null
  }


}
