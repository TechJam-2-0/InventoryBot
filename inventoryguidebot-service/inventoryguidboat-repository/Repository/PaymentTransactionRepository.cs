using inventoryguidboat_repository.Models;
using inventoryguidboat_repository.RepositoryInterface;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.Repository
{
    public class PaymentTransactionRepository : IPaymentTransaction
    {
        private readonly MongoConfig mongoConfig;
        private readonly MongoClient MongoClientConfig;
        protected IMongoCollection<PaymentModel> collectionPaymentTransaction;
        public PaymentTransactionRepository()
        {
            mongoConfig = new MongoConfig();
            MongoClientConfig = mongoConfig.GetMongoClient();

        }
        public List<PaymentModel> GetAllPaymentTransactionsByAppIdStoreId(string appId, string storeId)
        {
            List<PaymentModel> paymentTransactionResult = new List<PaymentModel>();
            try
            {
                var mongoDatabaseBase = MongoClientConfig.GetDatabase("inventory");
                var payTransCollection = mongoDatabaseBase.GetCollection<BsonDocument>("paymenttransaction");
               
                var builder = Builders<BsonDocument>.Filter;
                var filter = builder.Eq("appRegisteredId", appId) & builder.Eq("storeId", storeId);
                var payTransDocumentResults = payTransCollection.Find(filter)
                    .Project(Builders<BsonDocument>.Projection.Exclude("_id"))
                    .ToList();
                foreach (var paymentTransaction in payTransDocumentResults)
                {

                    var paymentTrans = new PaymentModel();
                    paymentTrans.TransactionId= paymentTransaction["transactionId"].AsString;
                    paymentTrans.OrderId = paymentTransaction["orderId"].AsString;
                    paymentTrans.StoreId = paymentTransaction["storeId"].AsString;
                    paymentTrans.StoreName = paymentTransaction["storeName"].AsString;
                    paymentTrans.AppRegisteredId = paymentTransaction["appRegisteredId"].AsString;
                    paymentTrans.TransactionType = paymentTransaction["transactionType"].AsString;
                    paymentTrans.TransactionAmount = paymentTransaction["transactionAmount"].AsString;
                    paymentTrans.TransactionDate = paymentTransaction["transactionDate"].AsString;                   

                    paymentTransactionResult.Add(paymentTrans);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return paymentTransactionResult;
        }
    }
}
