
using BookStore.Data;
using BookStore.Data.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BookStore
{
    public class Program
    {
       
      
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);


           

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigin",
                   builder =>
                   {
                       builder.WithOrigins("http://localhost:4200")
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                   });
            });

            builder.Services.AddDbContext<BookStoreContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("connection")));

            builder.Services.AddScoped<IBookRepository, BookRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAllOrigin"); 

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();

         


        }
    }
}
