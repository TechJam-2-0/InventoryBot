using inventoryguidboat_repository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat.RepositoryInterface
{
    public interface IInvetnoryRepository
    {
        List<OrderModel> GetAllOrdersByAppIdStoreId(string appId,string storeId);
        OrderModel CreateOrder(OrderModel order);
    }
}
