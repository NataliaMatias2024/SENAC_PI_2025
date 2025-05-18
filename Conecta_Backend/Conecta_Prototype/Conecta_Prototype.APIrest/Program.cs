using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Conecta_Prototype.Application.Interfaces;
using Conecta_Prototype.Application.Services;
using Conecta_Prototype.DBconection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<DatabaseHelper>(provider =>
{
    string dbName = "PrestadoresDeServicoDB.sqlite";
    return new DatabaseHelper(dbName);
});
builder.Services.AddScoped<IPrestadorDeServicoRepository, PrestadorDeServicoRepository>();
builder.Services.AddScoped<PrestadorDeServicoService, PrestadorDeServicoService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowMyOrigin");
app.UseHttpsRedirection();
app.UseRouting();
app.MapControllers();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "uploads")),
    RequestPath = "/uploads"
});

app.Run();