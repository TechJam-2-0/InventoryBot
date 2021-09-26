using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.Models
{
    public class OrderModel
    {
        public string OrderId { get; set; }
        public string AppRegisteredId { get; set; }
        public string StoreId { get; set; }
        public string CreatedBy { get; set; }
        public String CreatedDate { get; set; } = System.DateTime.Now.ToString();
        public List<ProductModel> Products { get; set; }
    }
}
