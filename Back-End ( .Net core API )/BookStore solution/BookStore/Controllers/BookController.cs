using BookStore.Data.Repositories;
using BookStore.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.Controllers
{
    [EnableCors("AllowAllOrigin")]
    [Route("api/[controller]")]
    [ApiController]

    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepo;
        public BookController(IBookRepository bookRepo)
        {
            _bookRepo = bookRepo;
        }

        [HttpGet("id:int")]
        
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]

        public ActionResult Get(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var book = _bookRepo.Get(id);
            if (book is null)
            {
                return NotFound("Book is not found");
            }
            return Ok(book);
        }

        [HttpGet]
        
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]

        public ActionResult GetAll()
        {
            var book = _bookRepo.GetAll();
            if (book.Any())
            {
                return Ok(book);
            }
            return NotFound();
        }

        [HttpPost]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult Create(Book item)
        {
            if (ModelState.IsValid)
            {
                _bookRepo.Create(item);
                return Ok(item);
            }
            return BadRequest();
        }


        [HttpDelete("id:int")]
        public ActionResult Delete(int id)
        {
            if (id == 0)
            {
                return BadRequest();
            }

            var book = _bookRepo.Get(id);
            _bookRepo.Delete(book);
            if (book is null)
            {
                return NotFound("Book is not found");
            }
            return Ok(book);
        }


        [HttpPut("id:int")]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 404)]
        public ActionResult Update(int id , Book item)
        {
            if (id == 0 || item == null)
            {
                return BadRequest();
            }

             var book = _bookRepo.Get(id); 

            if(book != null && ModelState.IsValid)
            {
                book.Name= item.Name;
                book.Description= item.Description;
                book.Author= item.Author;
                book.IsActive = item.IsActive;

               _bookRepo.Update(book); 
                return Ok(book);
            }
            return BadRequest();
        }

    }
}
