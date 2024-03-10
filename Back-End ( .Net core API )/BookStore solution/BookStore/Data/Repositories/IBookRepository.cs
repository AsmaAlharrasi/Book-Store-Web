using BookStore.Models;

namespace BookStore.Data.Repositories
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetAll();
        Book Get(int id);
        int Create(Book item);
        int Update(Book item);
        int Delete(Book item);
        
    }
}
