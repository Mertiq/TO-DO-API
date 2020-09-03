using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class kullanici_yetkiController : ControllerBase
    {
        private readonly TodoContext _context;

        public kullanici_yetkiController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/kullanici_yetki
        [HttpGet]
        public async Task<ActionResult<IEnumerable<kullanici_yetki>>> Getkullanici_ytk()
        {
            return await _context.kullanici_ytk.ToListAsync();
        }

        // GET: api/kullanici_yetki/5
        [HttpGet("{id}")]
        public async Task<ActionResult<kullanici_yetki>> Getkullanici_yetki(long id)
        {
            var kullanici_yetki = await _context.kullanici_ytk.FindAsync(id);

            if (kullanici_yetki == null)
            {
                return NotFound();
            }

            return kullanici_yetki;
        }

        // PUT: api/kullanici_yetki/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putkullanici_yetki(long id, kullanici_yetki kullanici_yetki)
        {
            if (id != kullanici_yetki.kayit_id)
            {
                return BadRequest();
            }

            _context.Entry(kullanici_yetki).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!kullanici_yetkiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/kullanici_yetki
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<kullanici_yetki>> Postkullanici_yetki(kullanici_yetki kullanici_yetki)
        {
            _context.kullanici_ytk.Add(kullanici_yetki);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getkullanici_yetki", new { id = kullanici_yetki.kayit_id }, kullanici_yetki);
        }

        // DELETE: api/kullanici_yetki/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<kullanici_yetki>> Deletekullanici_yetki(long id)
        {
            var kullanici_yetki = await _context.kullanici_ytk.FindAsync(id);
            if (kullanici_yetki == null)
            {
                return NotFound();
            }

            _context.kullanici_ytk.Remove(kullanici_yetki);
            await _context.SaveChangesAsync();

            return kullanici_yetki;
        }

        private bool kullanici_yetkiExists(long id)
        {
            return _context.kullanici_ytk.Any(e => e.kayit_id == id);
        }
    }
}
