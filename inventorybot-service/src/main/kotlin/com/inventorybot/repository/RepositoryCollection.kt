package com.inventorybot.repository

import com.mongodb.client.MongoCollection
import com.mongodb.client.model.*
import com.osmose.osmolytics.logger
import com.inventorybot.config.MongoClientConfig
import org.bson.Document
import javax.inject.Singleton


interface RepositoryCollection {
    fun getDbCollection(collectionName:String,indexFields:MutableList<String>?,mongoClient: MongoClientConfig): MongoCollection<Document>?

}
@Singleton
class RepositoryCollectionImpl : RepositoryCollection {
    companion object {
        private val LOGGER = logger(this)
    }

    override fun getDbCollection(collectionName: String, indexFields: MutableList<String>?, mongoClient: MongoClientConfig): MongoCollection<Document>? {
        var repoCollection = mongoClient.datastore()?.getCollection(collectionName)
        indexFields?.forEach { it -> repoCollection?.createIndex(Indexes.ascending(it)) }
        return repoCollection
    }
}
