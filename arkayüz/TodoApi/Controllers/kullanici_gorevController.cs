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
    public class kullanici_gorevController : ControllerBase
    {
        private readonly TodoContext _context;

        public kullanici_gorevController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/kullanici_gorev
        [HttpGet]
        public async Task<ActionResult<IEnumerable<kullanici_gorev>>> Getkullanici_grv()
        {
            return await _context.kullanici_grv.ToListAsync();
        }

        // GET: api/kullanici_gorev/5
        [HttpGet("{id}")]
        public async Task<ActionResult<kullanici_gorev>> Getkullanici_gorev(long id)
        {
            var kullanici_gorev = await _context.kullanici_grv.FindAsync(id);

            if (kullanici_gorev == null)
            {
                return NotFound();
            }

            return kullanici_gorev;
        }

        // PUT: api/kullanici_gorev/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putkullanici_gorev(long id, kullanici_gorev kullanici_gorev)
        {
            if (id != kullanici_gorev.kullanici_id)
            {
                return BadRequest();
            }

            _context.Entry(kullanici_gorev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!kullanici_gorevExists(id))
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

        // POST: api/kullanici_gorev
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<kullanici_gorev>> Postkullanici_gorev(kullanici_gorev kullanici_gorev)
        {
            _context.kullanici_grv.Add(kullanici_gorev);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getkullanici_gorev", new { id = kullanici_gorev.kullanici_id }, kullanici_gorev);
        }

        // DELETE: api/kullanici_gorev/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<kullanici_gorev>> Deletekullanici_gorev(long id)
        {
            var kullanici_gorev = await _context.kullanici_grv.FindAsync(id);
            if (kullanici_gorev == null)
            {
                return NotFound();
            }

            _context.kullanici_grv.Remove(kullanici_gorev);
            await _context.SaveChangesAsync();

            return kullanici_gorev;
        }

        private bool kullanici_gorevExists(long id)
        {
            return _context.kullanici_grv.Any(e => e.kullanici_id == id);
        }
    }
}
