using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.Models
{
    public class PaymentModel
    {
        public string TransactionId { get; set; }
        public string OrderId { get; set; }
        public string AppRegisteredId { get; set; }
        public string StoreId { get; set; }
        public string StoreName { get; set; }
        public string TransactionType { get; set; }
        public string TransactionAmount { get; set; }
        public string TransactionDate { get; set; }

    }
}
