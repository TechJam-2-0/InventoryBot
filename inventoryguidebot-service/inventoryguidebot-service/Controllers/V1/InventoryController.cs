using inventoryguidboat.RepositoryInterface;
using inventoryguidboat_repository.Models;
using inventoryguidboat_repository.RepositoryInterface;
using Inventoryguidebot.api.Routes.V1;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using Nancy.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventoryguidebot.api.Controllers.v1
{
   
    [ApiController]
    [EnableCors("ApiCorsPolicy")]
    public class InventoryController : ControllerBase
    {
        #region Private Fields
        
        private readonly ILogger<InventoryController> _logger;
        private readonly IProductRepository _productRepository;
        private readonly IInvetnoryRepository _orderRepository;
        private readonly IPaymentTransaction _paymentRepository;
        #endregion
        #region Constructor
        public InventoryController(ILogger<InventoryController> logger, IProductRepository productRepository,
                                    IInvetnoryRepository invetnoryRepository,IPaymentTransaction paymentTransaction)
        {
            this._logger = logger;
            this._productRepository = productRepository;
            this._orderRepository = invetnoryRepository;
            this._paymentRepository = paymentTransaction;

        }
        #endregion
        #region API Methods
        [HttpGet(ApiRoutes.ProductRoutes.GetAllProductsByStoreId)]
        public async Task<IActionResult> GetAllProductsByStoreId(string storeId)
        {
            StoreProduct productDetailResponse =null;
            
            try
            {
                if (!string.IsNullOrEmpty(storeId))
                {
                  productDetailResponse = _productRepository.GetAllProductsByStoreId(storeId);
                                     
                }
                return productDetailResponse != null ? (IActionResult)Ok(productDetailResponse) : NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllProductsByStoreId Error :-{ex.Message}");
                return new NotFoundObjectResult("Product is not found");
            }
        }
        [HttpGet(ApiRoutes.InventoryRoutes.GetAllOrdersByAppIdStoreId)]
        public async Task<IActionResult> GetAllOrdersByAppIdStoreId(string appId,string storeId)
        {
            List<OrderModel> orderDetailResponse = null;

            try
            {
                if (!string.IsNullOrEmpty(storeId))
                {
                    orderDetailResponse = _orderRepository.GetAllOrdersByAppIdStoreId(appId,storeId);
                }
                return orderDetailResponse != null ? (IActionResult)Ok(orderDetailResponse) : NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllProductsByStoreId Error :-{ex.Message}");
                return new NotFoundObjectResult("Product is not found");
            }
        }
        [HttpGet(ApiRoutes.PaymentTransactionRoutes.GetAllPaymentTransactionByAppIdStoreId)]
        public async Task<IActionResult> GetAllPaymentTransactionByAppIdStoreId(string appId, string storeId)
        {
            List<PaymentModel> paymentTransactionDetailResponse = null;

            try
            {
                if (!string.IsNullOrEmpty(storeId))
                {
                    paymentTransactionDetailResponse = _paymentRepository.GetAllPaymentTransactionsByAppIdStoreId(appId, storeId);

                }
                return paymentTransactionDetailResponse != null ? (IActionResult)Ok(paymentTransactionDetailResponse) : NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError($"GetAllPaymentTransactionByAppIdStoreId Error :-{ex.Message}");
                return new NotFoundObjectResult("Payment Transaction is not found");
            }
        }
        #endregion
    }
}
