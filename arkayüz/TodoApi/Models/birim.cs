using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace TodoApi.Models
{
    public class birim
    {
        [Key]
        public long birim_id { get; set; }
        public string ad { get; set; }

    }
}