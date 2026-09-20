package com.dockerators.bookapp.Repository;

import com.dockerators.bookapp.dao.BookRepository;
import com.dockerators.bookapp.entity.Book;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@AutoConfigureTestDatabase
public class BookRepoTest {

    @Autowired
    private BookRepository bookRepository;

    // Test to save a book
    @Test
    @Order(1)
    @Rollback(value = false)
    public void saveBookTest(){
        // Creating a book object
        Book book = new Book("Study in Scarlet","Conan Doyle","Mystery Book","123456789");
        bookRepository.save(book);
        // Verifying if the book object has been assigned an ID
        Assertions.assertSame("123456789", book.getCode());
    }

    // Test to retrieve a book by code
    @Test
    @Order(2)
    @AutoConfigureTestDatabase
    public void getBookByCodeTest(){
        // Retrieving a book with ID 1
        Book search_book = bookRepository.findByCode("123456789").get();
        // Verifying if the retrieved book has the expected ID
        Assertions.assertEquals("123456789", search_book.getCode());
    }

    // Test to check if a non-existent book is not present
    @Test
    @Order(3)
    @AutoConfigureTestDatabase
    public void getNonPresentBookTest(){
        // Checking if a book with ID 2 is present
        boolean isPresent = bookRepository.findByCode("1234567").isPresent();
        // Verifying that the book with ID 2 is not present
        Assertions.assertFalse(isPresent);
    }

    // Test to retrieve a list of books
    @Test
    @Order(4)
    @AutoConfigureTestDatabase
    public void getListOfBooksTest(){
        // Retrieving all books
        List<Book> books = bookRepository.findAll();
        // Verifying if the list of books is not empty
        Assertions.assertTrue(books.size() > 0);
    }

    // Test to update a book's title
    @Test
    @Order(5)
    @Rollback(value = false)
    @AutoConfigureTestDatabase
    public void updateBookTest(){
        // Retrieving a book with ID 1
        Book book = bookRepository.findByCode("123456789").get();
        // Updating the book's title
        book.setTitle("Hounds of Baskervilles");
        bookRepository.save(book);
        // Verifying if the book's title has been updated
        Assertions.assertTrue(bookRepository.findByCode("123456789").get().getTitle().equals("Hounds of Baskervilles"));
    }

    // Test to delete a book
    @Test
    @Order(6)
    @AutoConfigureTestDatabase
    public void deleteBookByCodeTest(){
        // Retrieving a book with Code 123456789
        Book book = bookRepository.findByCode("123456789").get();
        // Deleting the book
        bookRepository.delete(book);
        // Verifying if the book has been deleted
        Book deletedBook = null;
        Optional<Book> optionalBook = bookRepository.findByTitle("Hounds of Baskervilles");
        if(optionalBook.isPresent()){
            deletedBook = optionalBook.get();
        }
        Assertions.assertNull(deletedBook);
    }
}
