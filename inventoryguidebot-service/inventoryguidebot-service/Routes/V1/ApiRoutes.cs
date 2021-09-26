using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventoryguidebot.api.Routes.V1
{
    /// <summary>
    /// Clean approach to write Routes for API Controller
    /// </summary>
    public static class ApiRoutes
    {
        private const string Root = "api";
        private const string Version = "v1";
        private const string Base = Root + "/" + Version;

        /// <summary>
        /// Routes for Product API(s).
        /// </summary>
        public static class InventoryRoutes
        {
            public const string CreateOrder = Base + "/createOrder";
            public const string GetAllOrdersByAppIdStoreId = Base + "/getAllOrdersByAppIdStoreId";
            public const string GetOrderById = Base + "/getOrderById";

        }
        public static class ProductRoutes
        {
            public const string GetAllProductsByStoreId = Base + "/getAllProductsByStoreId";            

        }
        public static class PaymentTransactionRoutes
        {
            public const string GetAllPaymentTransactionByAppIdStoreId = Base + "/getAllPaymentTransactionByAppIdStoreId";
        }
    }
}
