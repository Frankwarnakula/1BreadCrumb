using System.Collections.Generic;

namespace readmore.Server.Repositories
{
    public interface IBookRepository
    {
        IEnumerable<Book> GetAll();
        // Add more methods as needed (Add, Update, Delete, etc.)
    }
}
