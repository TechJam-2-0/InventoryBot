
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventoryguidebot.api.ServiceConfiguration
{
    /// <summary>
    /// ServiceConfiguration interface class
    /// </summary>
    public interface IServiceConfiguration
    {
        void ProductConfigurationServices(IServiceCollection services, IConfiguration configuration);
    }
}
