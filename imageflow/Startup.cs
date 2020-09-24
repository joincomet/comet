using Amazon;
using Amazon.S3;
using System.IO;
using System;
using Imageflow.Server.Storage.S3;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;

namespace Imageflow.Server.ExampleDocker {
    public class Startup {
        public void ConfigureServices (IServiceCollection services) {
            // Make S3 bucket available at /
            // If you use credentials, do not check them into your repository
            // You can call AddImageflowS3Service multiple times for each unique access key
            services.AddImageflowS3Service (new S3ServiceOptions (Environment.GetEnvironmentVariable("AWS_ACCESS_KEY_ID"), Environment.GetEnvironmentVariable("AWS_SECRET_ACCESS_KEY"))
                .MapPrefix ("/i/", new AmazonS3Config() {ServiceURL = "https://nyc3.digitaloceanspaces.com"}, Environment.GetEnvironmentVariable("AWS_S3_BUCKET"), "", false, false));
        }
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseImageflow (new ImageflowMiddlewareOptions ()
                .SetDefaultCacheControlString("public, max-age=2592000"));

            app.UseRouting ();

            /* app.UseEndpoints (endpoints => {
                endpoints.MapGet ("/", context => {
                    context.Response.Redirect("https://www.cometx.io");
                    return Task.FromResult(0);
                });
            }); */
        }
    }
}
