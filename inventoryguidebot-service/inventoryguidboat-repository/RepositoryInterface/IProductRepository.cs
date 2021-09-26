
using inventoryguidboat_repository.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat.RepositoryInterface
{
    public interface IProductRepository
    {
        StoreProduct GetAllProductsByStoreId(string storeId);      

    }
}
