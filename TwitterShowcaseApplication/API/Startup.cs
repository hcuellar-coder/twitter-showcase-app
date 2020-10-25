using System;
using API.Services;
using System.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _hostingEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment hostingEnvironment)
        {
            _configuration = configuration;
            _hostingEnvironment = hostingEnvironment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var BEARERKEY = "";
            if (_hostingEnvironment.IsDevelopment())
            {
                BEARERKEY = ConfigurationManager.AppSettings["BEARER"];
            }
            else
            {
                BEARERKEY = Environment.GetEnvironmentVariable("BEARER");
            }

            services.AddHttpClient("twitter", c =>
            {
                c.BaseAddress = new Uri("https://api.twitter.com/1.1/");
                c.DefaultRequestHeaders.Add("Authorization", "Bearer " + BEARERKEY);
            });
            services.AddControllers();
            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "client/build";
            });
            services.AddScoped<ITwitterSearchService, TwitterSearchService>();
            services.AddScoped<ITwitterTimelineService, TwitterTimelineService>();
            services.AddScoped<ITwitterUserQueryService, TwitterUserQueryService>();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSpaStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "client";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
