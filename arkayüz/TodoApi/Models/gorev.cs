using Microsoft.VisualBasic.CompilerServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class gorev
    {
        [Key]
        public long gorev_id { get; set; }
        public string aciklama { get; set; }
        public string ad { get; set; }
        public long proje_id { get; set; }
        public long aktif_kullanici_id { get; set; }

        [DataType(DataType.Date)]
        public DateTime baslangic_trh { get; set; }

        [DataType(DataType.Date)]
        public DateTime bitis_trh { get; set; }

        public bool bitimi { get; set; }

    }
}