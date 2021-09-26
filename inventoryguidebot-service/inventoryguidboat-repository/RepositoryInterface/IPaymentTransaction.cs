using inventoryguidboat_repository.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.RepositoryInterface
{
   public interface IPaymentTransaction
    {
        List<PaymentModel> GetAllPaymentTransactionsByAppIdStoreId(string appId, string storeId);
    }
}
