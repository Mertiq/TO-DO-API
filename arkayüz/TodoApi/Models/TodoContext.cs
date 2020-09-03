using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        { 
        }


        public DbSet<birim> birimler { get; set; }
        public DbSet<gorev> gorevler { get; set; }
        public DbSet<kullanici> kullanicilar { get; set; }
        public DbSet<kullanici_gorev> kullanici_grv { get; set; }
        public DbSet<kullanici_yetki> kullanici_ytk { get; set; }
        public DbSet<proje> projeler { get; set; }
        public DbSet<yetki> yetkiler { get; set; }

    }
}
