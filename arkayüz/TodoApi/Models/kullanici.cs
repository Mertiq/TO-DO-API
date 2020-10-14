using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class kullanici
    {
      
        [Key]
        public long kullanici_id { get; set; }
        public string ad { get; set; }
        public string soyadi { get; set; }
        public string mail { get; set; }
        public string sifre { get; set; }
        public long birim_id { get; set; }
        public int yetki_id { get; set; }
        public bool aktif { get; set; }
    }
}