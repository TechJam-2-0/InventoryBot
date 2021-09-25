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
            // Replace the uri string with your MongoDB deployment's connection string.
            var client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
            return client;
        }
    }
}
