using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



namespace TodoApi.Models
{
    public class proje
    {
        [Key]
        public long proje_id { get; set; }
        public string ad { get; set; }
        public string aciklama { get; set; }
        public int birim_id { get; set; }

        [DataType(DataType.Date)]
        public DateTime baslangic_tarihi { get; set; }

        [DataType(DataType.Date)]
        public DateTime bitis_tarihi { get; set; }
        public bool bittimi { get; set; }


    }
}