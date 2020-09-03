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
    public class yetkiController : ControllerBase
    {
        private readonly TodoContext _context;

        public yetkiController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/yetki
        [HttpGet]
        public async Task<ActionResult<IEnumerable<yetki>>> Getyetkiler()
        {
            return await _context.yetkiler.ToListAsync();
        }

        // GET: api/yetki/5
        [HttpGet("{id}")]
        public async Task<ActionResult<yetki>> Getyetki(long id)
        {
            var yetki = await _context.yetkiler.FindAsync(id);

            if (yetki == null)
            {
                return NotFound();
            }

            return yetki;
        }

        // PUT: api/yetki/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putyetki(long id, yetki yetki)
        {
            if (id != yetki.yetki_id)
            {
                return BadRequest();
            }

            _context.Entry(yetki).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!yetkiExists(id))
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

        // POST: api/yetki
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<yetki>> Postyetki(yetki yetki)
        {
            _context.yetkiler.Add(yetki);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getyetki", new { id = yetki.yetki_id }, yetki);
        }

        // DELETE: api/yetki/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<yetki>> Deleteyetki(long id)
        {
            var yetki = await _context.yetkiler.FindAsync(id);
            if (yetki == null)
            {
                return NotFound();
            }

            _context.yetkiler.Remove(yetki);
            await _context.SaveChangesAsync();

            return yetki;
        }

        private bool yetkiExists(long id)
        {
            return _context.yetkiler.Any(e => e.yetki_id == id);
        }
    }
}
