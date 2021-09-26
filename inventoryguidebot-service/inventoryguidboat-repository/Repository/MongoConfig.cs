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
            var client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
            return client;
        }
    }
}
