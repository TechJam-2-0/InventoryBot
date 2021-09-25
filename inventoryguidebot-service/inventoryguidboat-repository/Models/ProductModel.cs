using System;
using System.Collections.Generic;
using System.Text;

namespace inventoryguidboat_repository.Models
{
    public class StoreProduct
    {
        public string StoreId { get; set; }
        public List<ProductModel> StoreProducts { get; set; }
    }
   public class ProductModel
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductPrice { get; set; }
    }
}
