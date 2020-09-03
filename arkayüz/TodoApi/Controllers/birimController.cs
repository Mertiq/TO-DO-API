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

    public class birimController : ControllerBase
    {
        private readonly TodoContext _context;

        public birimController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/birim
        [HttpGet]
        public async Task<ActionResult<IEnumerable<birim>>> Getbirimler()
        {
            return await _context.birimler.ToListAsync();
        }

        // GET: api/birim/5
        [HttpGet("{id}")]
        public async Task<ActionResult<birim>> Getbirim(long id)
        {
            var birim = await _context.birimler.FindAsync(id);

            if (birim == null)
            {
                return NotFound();
            }

            return birim;
        }

        // PUT: api/birim/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putbirim(long id, birim birim)
        {
            if (id != birim.birim_id)
            {
                return BadRequest();
            }

            _context.Entry(birim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!birimExists(id))
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

        // POST: api/birim
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<birim>> Postbirim(birim birim)
        {
            _context.birimler.Add(birim);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getbirim", new { id = birim.birim_id }, birim);
        }

        // DELETE: api/birim/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<birim>> Deletebirim(long id)
        {
            var birim = await _context.birimler.FindAsync(id);
            if (birim == null)
            {
                return NotFound();
            }

            _context.birimler.Remove(birim);
            await _context.SaveChangesAsync();

            return birim;
        }

        private bool birimExists(long id)
        {
            return _context.birimler.Any(e => e.birim_id == id);
        }
    }
}
