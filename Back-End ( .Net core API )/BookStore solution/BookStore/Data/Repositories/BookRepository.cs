using BookStore.Models;

namespace BookStore.Data.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookStoreContext _context;
        public BookRepository(BookStoreContext context)
        {
            _context = context;
        }


        public IEnumerable<Book> GetAll()
        {
            return _context.books.ToList();
        }

        public Book Get(int id)
        {
            return _context.books.Find(id);

        }
        public int Create(Book item)
        {
            _context.books.Add(item);
            return _context.SaveChanges();
        }

        public int Update(Book item)
        {
            _context.books.Update(item);
            return _context.SaveChanges();
        }

        public int Delete(Book item)
        {
            _context.books.Remove(item);
            return _context.SaveChanges();
        }

    }
}
