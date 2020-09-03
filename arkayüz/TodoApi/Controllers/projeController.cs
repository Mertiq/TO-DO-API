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
    public class projeController : ControllerBase
    {
        private readonly TodoContext _context;

        public projeController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/proje
        [HttpGet]
        public async Task<ActionResult<IEnumerable<proje>>> Getprojeler()
        {
            return await _context.projeler.ToListAsync();
        }

        // GET: api/proje/5
        [HttpGet("{id}")]
        public async Task<ActionResult<proje>> Getproje(long id)
        {
            var proje = await _context.projeler.FindAsync(id);

            if (proje == null)
            {
                return NotFound();
            }

            return proje;
        }

        // PUT: api/proje/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putproje(long id, proje proje)
        {
            if (id != proje.proje_id)
            {
                return BadRequest();
            }

            _context.Entry(proje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!projeExists(id))
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

        // POST: api/proje
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<proje>> Postproje(proje proje)
        {
            _context.projeler.Add(proje);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getproje", new { id = proje.proje_id }, proje);
        }

        // DELETE: api/proje/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<proje>> Deleteproje(long id)
        {
            var proje = await _context.projeler.FindAsync(id);
            if (proje == null)
            {
                return NotFound();
            }

            _context.projeler.Remove(proje);
            await _context.SaveChangesAsync();

            return proje;
        }

        private bool projeExists(long id)
        {
            return _context.projeler.Any(e => e.proje_id == id);
        }
    }
}
