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
    public class gorevController : ControllerBase
    {
        private readonly TodoContext _context;

        public gorevController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/gorev
        [HttpGet]
        public async Task<ActionResult<IEnumerable<gorev>>> Getgorevler()
        {
            return await _context.gorevler.ToListAsync();
        }

        // GET: api/gorev/5
        [HttpGet("{id}")]
        public async Task<ActionResult<gorev>> Getgorev(long id)
        {
            var gorev = await _context.gorevler.FindAsync(id);

            if (gorev == null)
            {
                return NotFound();
            }

            return gorev;
        }

        // PUT: api/gorev/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> Putgorev(long id, gorev gorev)
        {
            if (id != gorev.gorev_id)
            {
                return BadRequest();
            }

            _context.Entry(gorev).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!gorevExists(id))
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

        // POST: api/gorev
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<gorev>> Postgorev(gorev gorev)
        {
            _context.gorevler.Add(gorev);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getgorev", new { id = gorev.gorev_id }, gorev);
        }

        // DELETE: api/gorev/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<gorev>> Deletegorev(long id)
        {
            var gorev = await _context.gorevler.FindAsync(id);
            if (gorev == null)
            {
                return NotFound();
            }

            _context.gorevler.Remove(gorev);
            await _context.SaveChangesAsync();

            return gorev;
        }

        private bool gorevExists(long id)
        {
            return _context.gorevler.Any(e => e.gorev_id == id);
        }
    }
}
