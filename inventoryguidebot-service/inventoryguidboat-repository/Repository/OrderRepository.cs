using inventoryguidboat.RepositoryInterface;
using inventoryguidboat_repository.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.Repository
{
    public class OrderRepository : IInvetnoryRepository
    {
        private readonly MongoConfig mongoConfig;
        private readonly MongoClient MongoClientConfig;
        protected IMongoCollection<OrderModel> collectionInventory;

        public OrderRepository()
        {
            mongoConfig = new MongoConfig();
            MongoClientConfig = mongoConfig.GetMongoClient();

        }
        public OrderModel CreateOrder(OrderModel order)
        {
            return new OrderModel();
        }

        public List<OrderModel> GetAllOrdersByAppIdStoreId(string appId,string storeId)
        {
            List<OrderModel> orderResult = new List<OrderModel>();

            List<ProductModel> productList = new List<ProductModel>();
            try
            {
                var mongoDatabaseBase = MongoClientConfig.GetDatabase("inventory");
                var storeOrderCollection = mongoDatabaseBase.GetCollection<BsonDocument>("orders");
               // var filter = Builders<BsonDocument>.Filter.Eq("storeId", storeId);
                var builder = Builders<BsonDocument>.Filter;
                var filter = builder.Eq("appRegisteredId", appId) & builder.Eq("storeId", storeId);
                var storeOrderDocumentResults = storeOrderCollection.Find(filter)
                    .Project(Builders<BsonDocument>.Projection.Exclude("_id"))
                    .ToList();
                foreach (var storeOrder in storeOrderDocumentResults)
                {

                    var order = new OrderModel();
                    order.OrderId = storeOrder["orderId"].AsString;
                    order.StoreId = storeOrder["storeId"].AsString;
                    order.AppRegisteredId = storeOrder["appRegisteredId"].AsString;
                    order.CreatedBy = storeOrder["createdBy"].AsString;
                    order.CreatedDate = storeOrder["createdDate"].AsString;
                    var products = storeOrder["products"].AsBsonDocument;
                    foreach (var product in products["productDetails"].AsBsonArray)
                    {
                        ProductModel prod = new ProductModel();
                        prod.ProductId = product["productId"].AsString;
                        prod.ProductName = product["productName"].AsString;
                        prod.ProductPrice = product["productPrice"].AsInt32;
                        productList.Add(prod);
                    }
                    order.Products = productList;
                    orderResult.Add(order);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return orderResult;
        }
    }
}
