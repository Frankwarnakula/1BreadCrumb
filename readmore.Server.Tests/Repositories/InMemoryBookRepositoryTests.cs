using System.Linq;
using readmore.Server;
using readmore.Server.Repositories;
using Xunit;

namespace readmore.Server.Tests.Repositories
{
    public class InMemoryBookRepositoryTests
    {
        [Fact]
        public void GetAll_Returns100Books()
        {
            // Arrange
            var repo = new InMemoryBookRepository();

            // Act
            var books = repo.GetAll();

            // Assert
            Assert.Equal(100, books.Count());
        }

        [Fact]
        public void GetAll_BooksHaveBookNameOwnerAndAvailability()
        {
            var repo = new InMemoryBookRepository();
            var book = repo.GetAll().First();
            Assert.False(string.IsNullOrWhiteSpace(book.BookName));
            Assert.False(string.IsNullOrWhiteSpace(book.Owner));
            Assert.IsType<bool>(book.Availability);
        }
    }
}
