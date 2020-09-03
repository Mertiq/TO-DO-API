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
    public class kullaniciController : ControllerBase
    {
        private readonly TodoContext _context;

        public kullaniciController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/kullanici
        [HttpGet]
        public async Task<ActionResult<IEnumerable<kullanici>>> Getkullanicilar()
        {
            return await _context.kullanicilar.ToListAsync();
        }

        // GET: api/kullanici/5
        [HttpGet("{id}")]
        public async Task<ActionResult<kullanici>> Getkullanici(long id)
        {
            var kullanici = await _context.kullanicilar.FindAsync(id);

            if (kullanici == null)
            {
                return NotFound();
            }

            return kullanici;
        }

        // PUT: api/kullanici/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putkullanici(long id, kullanici kullanici)
        {
            if (id != kullanici.kullanici_id)
            {
                return BadRequest();
            }

            _context.Entry(kullanici).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!kullaniciExists(id))
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

        // POST: api/kullanici
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<kullanici>> Postkullanici(kullanici kullanici)
        {
            _context.kullanicilar.Add(kullanici);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getkullanici", new { id = kullanici.kullanici_id }, kullanici);
        }

        // DELETE: api/kullanici/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<kullanici>> Deletekullanici(long id)
        {
            var kullanici = await _context.kullanicilar.FindAsync(id);
            if (kullanici == null)
            {
                return NotFound();
            }

            _context.kullanicilar.Remove(kullanici);
            await _context.SaveChangesAsync();

            return kullanici;
        }

        private bool kullaniciExists(long id)
        {
            return _context.kullanicilar.Any(e => e.kullanici_id == id);
        }
    }
}
