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
        public long kullanici_id { get; set; }
        public int gorev_id { get; set; }
        public string islem_turu { get; set; }

        [DataType(DataType.Date)]
        public DateTime islem_trh { get; set; }
        public string atanan_birim { get; set; }
        public string atanan_kisi { get; set; }
        public string durum { get; set; }

    }
}