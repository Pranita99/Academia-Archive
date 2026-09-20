package com.dockerators.bookapp.Service;

import com.dockerators.bookapp.dao.BookRepository;
import com.dockerators.bookapp.entity.Book;
import com.dockerators.bookapp.exception.BookAlreadyExistsException;
import com.dockerators.bookapp.exception.BookNotFoundException;
import com.dockerators.bookapp.service.BookService;
import com.dockerators.bookapp.service.BookServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class BookServiceImplTest {
    @Mock
    private BookRepository bookRepository;

    private BookService bookService;

    @BeforeEach
    public void setup() {
        bookService = new BookServiceImpl(bookRepository);
    }

    @Test
    public void testFindAll() {
        // Arrange
        List<Book> bookList = new ArrayList<>();
        bookList.add(new Book("Book 1", "Author 1","Desc 1", "123"));
        bookList.add(new Book("Book 2", "Author 2","Desc 2", "1234"));

        // Mocking the book repository to return the above two books for the findAll() repository function
        Mockito.when(bookRepository.findAll()).thenReturn(bookList);

        // Calling the findAll() service function
        List<Book> result = bookService.findAll();

        // Asserting that the correct books were returned
        Assertions.assertEquals(2, result.size());
        Assertions.assertEquals("123", result.get(0).getCode());
        Assertions.assertEquals("Book 1", result.get(0).getTitle());
        Assertions.assertEquals("1234", result.get(1).getCode());
        Assertions.assertEquals("Book 2", result.get(1).getTitle());

        // Verifying that the repository findAll() function was called 1 time
        Mockito.verify(bookRepository, Mockito.times(1)).findAll();
    }

    @Test
    public void testFindByCode_BookCodeFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return the above book for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.of(book));

        // Calling the findByCode service function
        Book result = bookService.findByCode(code);

        // Asserting that the correct book was returned
        Assertions.assertEquals(code, result.getCode());
        Assertions.assertEquals("Book 1", result.getTitle());

        // Verifying that the findByCode repo function was called 1 time in the service function
        Mockito.verify(bookRepository, Mockito.times(1)).findByCode(code);
    }

    @Test
    public void testFindByCode_BookCodeNotFound() {
        // Arrange
        String code = "123";

        // Mocking the book repository to return nothing for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.empty());

        // Assertions and checking if BookNotFoundException is thrown after calling the findByCode service function
        Assertions.assertThrows(BookNotFoundException.class, () -> {
            bookService.findByCode(code);
        });

        // Verifying that the findByCode repo function was called 1 time in the service function
        Mockito.verify(bookRepository, Mockito.times(1)).findByCode(code);
    }

    @Test
    public void testUpdateBook_BookCodeFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return the above book for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.of(book));
        // Mocking the book repository to return the above book for the save() function for the code 123
        Mockito.when(bookRepository.save(book)).thenReturn(book);

        // Calling the updateBook service function
        Book result = bookService.updateBook(book);

        // Asserting that the correct book was returned
        Assertions.assertEquals(code, result.getCode());
        Assertions.assertEquals("Book 1", result.getTitle());

        // Verifying that the save repo function was called 1 time in the service function
        Mockito.verify(bookRepository, Mockito.times(1)).save(book);
    }

    @Test
    public void testUpdateBook_BookCodeNotFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return nothing for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.empty());

        // Asserting that the BookNotFoundException is thrown when the update service function is called
        Assertions.assertThrows(BookNotFoundException.class, () -> {
            bookService.updateBook(book);
        });

        // Verifying that the save repo function was called 0 times in the service function as a book with that code does not exist
        Mockito.verify(bookRepository, Mockito.never()).save(book);
    }

    @Test
    public void saveBookSuccess_CodeNotFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return nothing for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.empty());
        // Mocking the book repository to return the above book for the save() function for the code 123
        Mockito.when(bookRepository.save(book)).thenReturn(book);

        // Calling the service save function
        Book result = bookService.save(book);

        // Asserting that the correct book is returned after saving
        Assertions.assertEquals(code, result.getCode());
        Assertions.assertEquals("Book 1", result.getTitle());

        // Verifying that the save repo function was called once as it was a success
        Mockito.verify(bookRepository, Mockito.times(1)).save(book);
    }

    @Test
    public void saveBookFailure_CodeFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return the above book for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.of(book));

        // Asserting that the BookAlreadyExistsException is thrown the service save function
        Assertions.assertThrows(BookAlreadyExistsException.class, () -> {
            bookService.save(book);
        });

        // Verifying that the save repo function was called 0 times in the service function as a book with that code already exists
        Mockito.verify(bookRepository, Mockito.never()).save(book);
    }

    @Test
    public void deleteBookSuccess_CodeFound() {
        // Arrange
        String code = "123";
        Book book = new Book("Book 1", "Author 1","Desc 1", "123");

        // Mocking the book repository to return the above book for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.of(book));

        // Calling the service deleteByCode function
        Book result = bookService.deleteByCode(code);

        // Asserting that the correct book is deleted
        Assertions.assertEquals(code, result.getCode());
        Assertions.assertEquals("Book 1", result.getTitle());

        // Verifying that the findByCode and deleteByCode repo functions were called 1 time
        Mockito.verify(bookRepository, Mockito.times(1)).findByCode(code);
        Mockito.verify(bookRepository, Mockito.times(1)).deleteByCode(code);
    }

    @Test
    public void deleteBookFailure_CodeNotFound() {
        // Arrange
        String code = "123";

        // Mocking the book repository to return nothing for the findByCode() function for the code 123
        Mockito.when(bookRepository.findByCode(code)).thenReturn(Optional.empty());

        // Asserting that the BookNotFoundException is thrown after calling the service deleteByCode function
        Assertions.assertThrows(BookNotFoundException.class, () -> {
            bookService.deleteByCode(code);
        });

        // Verifying that the findByCode repo function was called once
        Mockito.verify(bookRepository, Mockito.times(1)).findByCode(code);
        // Verifying that the deleteByCode repo function was not called as a book with that code doesn't exist.
        Mockito.verify(bookRepository, Mockito.never()).deleteByCode(code);
    }

}

