using System;
using System.IO;
using System.Threading.Tasks;
using Amazon;
using Amazon.S3;
using Imageflow.Server.Storage.S3;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Imageflow.Server.ExampleDocker {
    public class Startup {
        public void ConfigureServices (IServiceCollection services) {
            services.AddImageflowS3Service (new S3ServiceOptions (Environment.GetEnvironmentVariable ("AWS_ACCESS_KEY_ID"), Environment.GetEnvironmentVariable ("AWS_SECRET_ACCESS_KEY"))
                .MapPrefix ("/i/", new AmazonS3Config () { ServiceURL = "https://" + Environment.GetEnvironmentVariable ("AWS_ENDPOINT") }, Environment.GetEnvironmentVariable ("AWS_S3_BUCKET"), "", false, false));
        }
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            }

            app.UseImageflow (new ImageflowMiddlewareOptions ()
                .SetDefaultCacheControlString ("public, max-age=2592000")
                .AddCommandDefault ("format", "webp")
                .AddCommandDefault ("webp.quality", "80")
                .AddPreset (new PresetOptions ("thumbnail", PresetPriority.DefaultValues)
                    .SetCommand ("width", "150")
                    .SetCommand ("height", "150")
                    .SetCommand ("format", "webp")
                    .SetCommand ("webp.quality", "80"))
                .AddPreset (new PresetOptions ("avatar", PresetPriority.DefaultValues)
                    .SetCommand ("width", "32")
                    .SetCommand ("height", "32")
                    .SetCommand ("format", "webp")
                    .SetCommand ("webp.quality", "80"))
            );

            app.UseRouting ();
        }
    }
}
