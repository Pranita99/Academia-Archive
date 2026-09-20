package com.dockerators.bookapp.dao;

import com.dockerators.bookapp.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository <Book, Integer> {
    // JPA Repository Function to find all books by the property 'title'
    Optional<Book> findByTitle(String title);
    // JPA Repository Function to find the book with a given 'code'.
    Optional<Book> findByCode(String code);
    // JPA Repository Function to delete the book with a given 'code'.
    void deleteByCode(String code);
}
