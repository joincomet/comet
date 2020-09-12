using Amazon;
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
            services.AddImageflowS3Service (new S3ServiceOptions ("AKIAJ5NGB6X44CQAWZ7A", "macRMiFw2966NqLaNM4de+QiFuyG4V/xYFXYnyho")
                .MapPrefix ("/i/", RegionEndpoint.USEast1, "i.cometx.io"));
        }
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseImageflow (new ImageflowMiddlewareOptions ()
                .SetMapWebRoot (true)
                .SetDefaultCacheControlString("public, max-age=2592000")
            );

            app.UseRouting ();

            app.UseEndpoints (endpoints => {
                endpoints.MapGet ("/", context => {
                    context.Response.Redirect("https://www.cometx.io");
                    return Task.FromResult(0);
                });
            });
        }
    }
}
