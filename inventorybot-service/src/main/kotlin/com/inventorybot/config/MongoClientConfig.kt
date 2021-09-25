package com.inventorybot.config


import io.micronaut.context.annotation.Value
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoDatabase
import javax.inject.Named
import javax.inject.Singleton

/**
 * MongoClientConfig - It provides a single Mongodb connection using connection property from YAML file.
  */
@Singleton
class MongoClientConfig(@Named("osmolytics") val mongoClient: MongoClient){
    @Value("\${mongodb.servers.osmolytics.uri}")
    lateinit var uri: String
    @Value("\${mongodb.servers.osmolytics.dbname}")
    lateinit var dbname: String
    fun datastore(): MongoDatabase? {
          return mongoClient.getDatabase(dbname)
    }

}
