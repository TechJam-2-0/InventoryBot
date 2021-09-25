
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Inventoryguidebot.api.ServiceConfiguration
{
    public class MVConfiguration : IServiceConfiguration
    {
        /// <summary>
        /// Adds MVC and Swagger services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public void ProductConfigurationServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddMvc(option =>
            {
                option.EnableEndpointRouting = false;
            });
            
            //Add swagger service
            //services.AddSwaggerGen(sg =>
            // {
            //     sg.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Maersk API", Version = "v1" });
            //     sg.AddSecurityDefinition("Bearer", new APIScheme
            //     {
            //         Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            //         Name = "Authorization",
            //         In = "header",
            //         Type = "APIKey"
            //     });
            // }); 
        }

    }
}
