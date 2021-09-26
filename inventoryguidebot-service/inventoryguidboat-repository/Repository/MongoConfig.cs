using System;
using System.Collections.Generic;
using System.Text;
using MongoDB.Bson;
using MongoDB.Driver;


namespace inventoryguidboat_repository.Repository
{
   public class MongoConfig
    {
        public MongoClient GetMongoClient()
        {
            //mongodb + srv://admin:admin@cluster0.receh.mongodb.net/test?authSource=admin&replicaSet=atlas-g7tu3n-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
            //var client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
            var client = new MongoClient("mongodb+srv://admin:admin@cluster0.receh.mongodb.net/inventory?retryWrites=true&w=majority");
            return client;
        }
    }
}
