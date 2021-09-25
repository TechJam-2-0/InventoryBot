using inventoryguidboat.RepositoryInterface;
using inventoryguidboat_repository.Models;
using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Bson.Serialization;

namespace inventoryguidboat_repository.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly MongoConfig mongoConfig;
        private readonly MongoClient MongoClientConfig;
        protected IMongoCollection<StoreProduct> collectionProduct;
        public ProductRepository()
        {
            mongoConfig = new MongoConfig();
            MongoClientConfig = mongoConfig.GetMongoClient();
           
        }

        public StoreProduct GetAllProductsByStoreId(string storeId)
        {
            StoreProduct productResult=null;
            //BsonDocument storeProductDocumentResults = null;
            List<ProductModel> productList = new List<ProductModel>();
            try
            {
                var mongoDatabaseBase = MongoClientConfig.GetDatabase("inventory");
                var storeProductCollection = mongoDatabaseBase.GetCollection<BsonDocument>("products");
                var filter = Builders<BsonDocument>.Filter.Eq("storeId", storeId);
                var storeProductDocumentResults = storeProductCollection.Find(filter)
                    .Project(Builders<BsonDocument>.Projection.Exclude("_id"))
                    .ToList();
                foreach (var storeProduct in storeProductDocumentResults)
                {
                    
                    productResult = new StoreProduct();
                    productResult.StoreId = storeProduct["storeId"].AsString;
                    var products = storeProduct["products"].AsBsonDocument;
                    foreach (var product in products["productDetails"].AsBsonArray)
                    {
                        ProductModel prod = new ProductModel();
                        prod.ProductId = product["productId"].AsString;
                        prod.ProductName = product["productName"].AsString;
                        prod.ProductPrice = product["productPrice"].AsInt32;
                        productList.Add(prod);
                    }
                    productResult.StoreProducts = productList;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return productResult;
        }
    }
}
