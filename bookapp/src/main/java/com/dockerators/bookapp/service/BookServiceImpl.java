package com.dockerators.bookapp.service;

import com.dockerators.bookapp.dao.BookRepository;
import com.dockerators.bookapp.entity.Book;
import com.dockerators.bookapp.exception.BookAlreadyExistsException;
import com.dockerators.bookapp.exception.BookNotFoundException;
import com.dockerators.bookapp.exception.NullFieldsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {
    // Private repository to access the book database and perform SQL Queries
    private BookRepository bookRepository;
    Logger logger = LoggerFactory.getLogger(BookServiceImpl.class);

    @Autowired
    // Constructor
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    // Will return a list of all books in the database
    public List<Book> findAll() {
        logger.info("Retrieving All Books");
        return (this.bookRepository.findAll());
    }

    public Book findByCode(String code){
        Optional<Book> result = this.bookRepository.findByCode(code);
        Book book;
        if(result.isPresent()) {
            book = result.get();
            logger.info(String.format("Book with code %s was retrieved.", code));
            // Returns the book with a given code if it exists
            return(book);
        }else{
            // Will throw error if a book with that Code is not found
            logger.error(String.format("Book with code %s was not found.", code));
            throw new BookNotFoundException();
        }

    }
    @Override
    public Book updateBook(Book book) throws RuntimeException{
        try{
            Optional <Book> result = this.bookRepository.findByCode(book.getCode());
            if(result.isEmpty()){
                // Will throw error if a book with that code is not found
                throw new BookNotFoundException();
            }
            logger.info(String.format("Book with Code %s was updated.", book.getCode()));
            // Updates the book with a given code if it exists
            return this.bookRepository.save(book);
        } catch (BookNotFoundException e) {
            logger.error(String.format("Book with Code %s does not exist and hence cannot be updated.", book.getCode()));
            throw e;
        } catch (RuntimeException e){
            // Will throw error if any of the fields are empty.
            throw new NullFieldsException();
        }
    }

    @Override
    // Adds a book to the database
    public Book save(Book book) {
        try{
            Optional<Book> s = this.bookRepository.findByCode(book.getCode());
            if(s.isPresent()){
                throw new BookAlreadyExistsException();
            }else{
                logger.info(String.format("Student with Code %s was added.", book.getCode()));
                // Adds the book if another book with the same code does not exist
                return (this.bookRepository.save(book));
            }
        }catch (BookAlreadyExistsException e){
            // Will throw error if a book with that Code already exists
            logger.error(String.format("Student with Code %s already exists and hence cannot be added.", book.getCode()));
            throw e;
        }catch (RuntimeException e){
            // Will throw error if any of the fields are NULL.
            throw new NullFieldsException();
        }
    }

    @Override
    // Deletes a book that corresponds to a code
    public Book deleteByCode(String code) {
        Optional<Book> b = this.bookRepository.findByCode(code);
        if (b.isEmpty()) {
            // Will throw error if a book with that code does not exist
            logger.error(String.format("Book with code %s doesn't exist and hence can't be deleted.", code));
            throw new BookNotFoundException();
        } else {
            // Deletes the book with that code if it exists
            this.bookRepository.deleteByCode(code);
            logger.info(String.format("Book with code %s has been deleted.", code));
            return b.get();
        }
    }
}
