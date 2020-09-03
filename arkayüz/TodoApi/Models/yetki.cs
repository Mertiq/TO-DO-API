using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class yetki
    {
        [Key]
        public long yetki_id { get; set; }
        public string yetki_adi { get; set; }
    }
}