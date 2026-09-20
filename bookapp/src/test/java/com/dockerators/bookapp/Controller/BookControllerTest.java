package com.dockerators.bookapp.Controller;

import com.dockerators.bookapp.entity.Book;
import com.dockerators.bookapp.rest.BookRestController;
import com.dockerators.bookapp.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@WebMvcTest(BookRestController.class)
public class BookControllerTest {
    // ObjectMapper to convert objects to JSON and vice versa
    ObjectMapper om = new ObjectMapper();

    @MockBean
    private BookService bookService;

    @InjectMocks
    private BookRestController bookRestController;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllBooks() throws Exception {
        // Mock data
        Book book1 = new Book("A Study in Scarlet","Conan Doyle", "Murder Story","987654321");
        Book book2 = new Book("And Then There Were None","Agatha Christie", "Murder Story","123456789");
        List<Book> books = Arrays.asList(book1,book2);

        // Mock the service method call
        when(bookService.findAll()).thenReturn(books);

        // Perform GET request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].title").value("A Study in Scarlet"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[1].title").value("And Then There Were None"));
    }

    @Test
    public void testGetBookFromCode() throws Exception {
        // Mock data
        Book book = new Book("A Study in Scarlet","Conan Doyle", "Murder Story","987654321");

        // Mock the service method call
        when(bookService.findByCode(book.getCode())).thenReturn(book);

        // Perform GET request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.get("/api/books/code/987654321")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("A Study in Scarlet"));
    }

    @Test
    public void testAddBook() throws Exception {
        // Create a new book
        Book book = new Book("A Study in Scarlet","Conan Doyle", "Murder Story","987654321");

        // Mock the service method call
        when(bookService.save(book)).thenReturn(book);

        // Perform POST request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.post("/api/books")
                        .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(book)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("A Study in Scarlet"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value("Conan Doyle"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value("987654321"));
    }

    @Test
    public void testUpdateBook() throws Exception {
        // Create a book for updating
        Book book = new Book("A Study in Scarlet","Conan Doyle", "Murder Story","987654321");

        // Mock the service method call
        when(bookService.updateBook(book)).thenReturn(book);

        // Perform PUT request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.put("/api/books")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(om.writeValueAsString(book)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("A Study in Scarlet"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value("Conan Doyle"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value("987654321"));

        // Verify the service method call
        Mockito.verify(bookService).updateBook(book);
    }

    @Test
    public void testDeleteBookByCode() throws Exception {
        // Create a book for deletion
        String bookCode = "987654321";
        Book book = new Book("A Study in Scarlet","Conan Doyle", "Murder Story",bookCode);

        // Mock the service method calls
        when(bookService.deleteByCode(bookCode)).thenReturn(book);

        // Perform DELETE request and validate the response
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/books/code/{book_code}", bookCode)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("A Study in Scarlet"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.author").value("Conan Doyle"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.code").value("987654321"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("Murder Story"));

        // Verify the service method calls
        Mockito.verify(bookService).deleteByCode(bookCode);
    }
}
