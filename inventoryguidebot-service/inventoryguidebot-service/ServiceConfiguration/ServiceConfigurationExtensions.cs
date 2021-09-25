
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventoryguidebot.api.ServiceConfiguration
{
    public static class ServiceConfigurationExtensions
    {
        /// <summary>
        /// ServiceConfigurationExtensions class
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void ServiceConfigurationAssembly(this IServiceCollection services, IConfiguration configuration)
        {
            var jobConfigurations = typeof(Startup).Assembly.ExportedTypes.Where(x =>
             typeof(IServiceConfiguration).IsAssignableFrom(x) && !x.IsAbstract && !x.IsInterface).Select(Activator.CreateInstance).Cast<IServiceConfiguration>().ToList();
            jobConfigurations.ForEach(pc => pc.ProductConfigurationServices(services, configuration));
        }
    }
}
