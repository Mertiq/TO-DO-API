using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class kullanici_gorev
    {
        [Key]
        public long kayit_id { get; set; }
        public long kullanici_id { get; set; }
        public long gorev_id { get; set; }

        [DataType(DataType.Date)]
        public DateTime islem_trh { get; set; }
        public int atanan_birim { get; set; }
        public string durum { get; set; }

    }
}