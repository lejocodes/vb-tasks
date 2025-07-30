using VBTasks.API.Middleware;
using VBTasks.Business.Interfaces;
using VBTasks.Infrastructure.Repositories;
using VBTasks.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "VBTasks API",
        Version = "v1",
        Description = "Task Management System API",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "VBTasks Team",
            Email = "support@vbtasks.com"
        }
    });
    
    // Enable annotations
    c.EnableAnnotations();
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder
            .WithOrigins("http://localhost:4200", "http://localhost:4201")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

// Register services
builder.Services.AddSingleton<JsonFileService>();

// Register repositories
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IGroupRepository, GroupRepository>();

// Register business services
builder.Services.AddScoped<VBTasks.Business.Interfaces.ITaskService, VBTasks.Business.Services.TaskService>();
builder.Services.AddScoped<VBTasks.Business.Interfaces.IUserService, VBTasks.Business.Services.UserService>();
builder.Services.AddScoped<VBTasks.Business.Interfaces.IGroupService, VBTasks.Business.Services.GroupService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "VBTasks API V1");
        c.RoutePrefix = "swagger"; // Move Swagger to /swagger path
    });
}

app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();

// Serve static files (Angular build)
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

// Fallback to index.html for SPA routing
app.MapFallbackToFile("index.html");

app.Run();

public partial class Program { }