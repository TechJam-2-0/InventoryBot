package com.inventorybot.endpoint

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import java.time.ZoneOffset
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import io.micronaut.context.annotation.Value
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.*
import io.micronaut.http.HttpResponse
import io.micronaut.validation.Validated
import kotlinx.coroutines.runBlocking
import javax.inject.Inject
import javax.validation.constraints.NotBlank
import com.inventorybot.service.InventoryService
import com.inventorybot.constants.InventoryConstant
import com.inventorybot.model.OrderModel

@Validated
@Controller(InventoryConstant.BASE_ROUTE)
class InventoryController(
  @Value("\${micronaut.application.name:`unk`}") private val appName: String,
  private val inventoryService: InventoryService
) {
  companion object {
    private val LOGGER = logger(this)
  }
  @Inject
  lateinit var inventoryValidation: InventoryValidation
  /**
   * Method Name:index - This is default method for the controller.
   */
  @Get("/")
  @Produces(MediaType.APPLICATION_JSON)
  // @Throws(Exception::class)
  fun index(): String {
    LOGGER.info("Welcome to Inventory Controller Application ")
    return "Welcome to Inventory Controller Application "
  }

  /**
   * Method Name:ping - This is ping method where we can verify the application is running or not.
   */
  @Get(InventoryConstant.ROUTE_PING)
  fun ping(): String {
    val nowStr = ZonedDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ISO_ZONED_DATE_TIME)
    val rsp = """
            {"app-name": "$appName", "server-time": "$nowStr","message": "Pinged!"}
            """
    LOGGER.debug("ping returning: {}", rsp)
    return rsp
  }

  /**
   * Method Name:getAllOrders - get all orders.
   */
  @Get(InventoryConstant.GET_ALL_ORDERS)
  @Produces(MediaType.APPLICATION_JSON)
  fun getAllOrders(@QueryValue("appRegisteredId") @NotBlank appRegisteredId:String)
    : HttpResponse<JsonNode>? {
    LOGGER.info("Get all orders in controller")
    return try {

      val orderResults =
        runBlocking { inventoryService.getAllOrders(appRegisteredId) }
      when {
        orderResults?.size() == 0 -> {
          throw Exception(InventoryConstant.EMPTY_LIST)
        }
      }
      HttpResponse.ok(orderResults)

    } catch (ex: Exception) {
      LOGGER.error("Error in get all orders ${ex.message}")
      val mapper = ObjectMapper()
      val objectNode = mapper.createObjectNode()
      objectNode.put(InventoryConstant.MESSAGE, ex.message)
      return HttpResponse.ok(objectNode)
    }
  }
  /**
   * Method Name:getAllOrders - get all orders.
   */
  @Put(InventoryConstant.CREATE_ORDER)
  @Produces(MediaType.APPLICATION_JSON)
  fun CreateOrder(@QueryValue("order") @NotBlank order: List<OrderModel>)
    : HttpResponse<JsonNode>? {
    LOGGER.info("Get all orders in controller")
    return try {

      val orderResults =
        runBlocking { inventoryService.getAllOrders() }
      when {
        orderResults?.size() == 0 -> {
          throw Exception(InventoryConstant.EMPTY_LIST)
        }
      }
      HttpResponse.ok(orderResults)

    } catch (ex: Exception) {
      LOGGER.error("Error in get all orders ${ex.message}")
      val mapper = ObjectMapper()
      val objectNode = mapper.createObjectNode()
      objectNode.put(InventoryConstant.MESSAGE, ex.message)
      return HttpResponse.ok(objectNode)
    }
  }
  /**
   * Method Name:getOrderById - This method get order details by order id.
   */
  @Get(InventoryConstant.GET_ORDER_BY_ID)
  @Produces(MediaType.APPLICATION_JSON)
  fun getOrderById(
    @QueryValue("orderId") @NotBlank orderId: String
  )
    : HttpResponse<JsonNode>? {
    LOGGER.info("Get order detials in controller orderId:$orderId")
    return try {

      val orderDetilResults =
        runBlocking { inventoryService.getOrderById(orderId) }
      when {
        orderDetilResults?.size() == 0  -> {
          throw Exception(InventoryConstant.EMPTY_LIST)
        }
      }
      HttpResponse.ok(orderDetilResults)


    } catch (ex: Exception) {
      LOGGER.error("Error in get order detail results in controller ${ex.message}")
      val mapper = ObjectMapper()
      val objectNode = mapper.createObjectNode()
      if(ex.message==null) {
        objectNode.put(InventoryConstant.MESSAGE, InventoryConstant.EMPTY_LIST)
      }
      else {
        objectNode.put(InventoryConstant.MESSAGE, ex.message)
      }
      return HttpResponse.ok(objectNode)
    }
  }

}
