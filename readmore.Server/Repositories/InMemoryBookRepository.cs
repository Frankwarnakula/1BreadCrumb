using System;
using System.Collections.Generic;
using System.Linq;
using readmore.Server;

namespace readmore.Server.Repositories
{
    public class InMemoryBookRepository : IBookRepository
    {
        private static readonly List<string> SampleBookNames = new()
        {
            "Clean Code: A Handbook of Agile Software Craftsmanship",
            "The Pragmatic Programmer",
            "Design Patterns: Elements of Reusable Object-Oriented Software",
            "You Don't Know JS Yet",
            "Introduction to the Theory of Computation",
            "Refactoring: Improving the Design of Existing Code",
            "Domain-Driven Design: Tackling Complexity in the Heart of Software",
            "Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation",
            "Site Reliability Engineering: How Google Runs Production Systems",
            "The Phoenix Project: A Novel About IT, DevOps, and Helping Your Business Win",
            "The DevOps Handbook",
            "Building Microservices",
            "Kubernetes Up & Running",
            "Cloud Native Patterns",
            "Microservices Patterns",
            "Programming TypeScript",
            "Learning React",
            "Fullstack React",
            "JavaScript: The Good Parts",
            "Python Crash Course",
            "Fluent Python",
            "Effective Java",
            "Spring in Action",
            "Pro ASP.NET Core MVC",
            "C# in Depth",
            "Pro Git",
            "Linux Basics for Hackers",
            "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow",
            "Deep Learning with Python",
            "Grokking Algorithms",
            "The Art of Computer Programming",
            "Artificial Intelligence: A Modern Approach",
            "Data Science from Scratch",
            "The Data Warehouse Toolkit",
            "SQL Performance Explained",
            "Docker Deep Dive",
            "Terraform: Up & Running",
            "Programming Rust",
            "Go Programming Language",
            "Rust in Action",
            "Learning GraphQL",
            "React Native in Action",
            "Mastering Blockchain",
            "Blockchain Basics",
            "Learning SQL",
            "The Road to learn React",
            "Node.js Design Patterns",
            "Learning Python",
            "Effective TypeScript"
        };

        private static readonly List<Book> Books = GenerateBooks();

        private static List<Book> GenerateBooks()
        {
            var owners = new[] { "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy" };
            var books = new List<Book>();
            var rnd = new Random();
            for (int i = 1; i <= 100; i++)
            {
                var bookName = SampleBookNames[rnd.Next(SampleBookNames.Count)] +
                    (rnd.NextDouble() < 0.2 ? $" (2nd Edition)" : "");
                books.Add(new Book
                {
                    BookName = bookName,
                    Owner = owners[(i - 1) % owners.Length],
                    Availability = i % 2 == 0
                });
            }
            return books;
        }

        public IEnumerable<Book> GetAll()
        {
            return Books;
        }
    }
}
