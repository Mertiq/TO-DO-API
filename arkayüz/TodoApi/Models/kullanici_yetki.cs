using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class kullanici_yetki
    {
        [Key]
        public long kayit_id { get; set; }
        public int kullanici_id { get; set; }
        public int yetki_id { get; set; }
    }
}