import { Routes, Route, Navigate } from "react-router-dom"
import AdminLibrarian from "./Components/AdminLibrarian";
import { AdLibDetails } from "./Components/AdminLibrarian/AdLibDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import StudentPage from "./Components/StudentsPage";
import StudentDetailsPage from "./Components/StudentDetailsPage";
import { AddStudent } from "./Components/StudentsPage/AddStudent";
import BookDetailsPage from "./Components/BookDetailsPage";
import PagesOptions from "./Components/PagesOptions";
import BooksPage from "./Components/BooksPage";
import { AddBook } from "./Components/BooksPage/AddBook";
import { useEffect,useState } from "react";

function App() {

  
  return (
      <div className="App">
        <Routes>
        
          <Route path="*" element={<Navigate to={`/login`}/>} />
          <Route path="/login" element={<Login/>} />
          

          {/* <Route path="/signup" element={<Signup/>} /> */}

          <Route path="/adminlibrarian" element={<AdminLibrarian/>} />
          <Route path="/addlibrarian" element={<AdLibDetails/>} />

          <Route path="/students" element={<StudentPage/>}/>
          <Route path="/addstudent" element={<AddStudent/>}/>
          
          <Route path="/studentdetails/:id" element={<StudentDetailsPage/>}/>

          <Route path="/books" element={<BooksPage/>}/>
          <Route path="/bookdetails/:id" element={<BookDetailsPage/>}/>
          <Route path="/addbook" element={<AddBook/>}/>


          <Route path="/dashboard" element={<PagesOptions/>}/>
          
        </Routes>
      </div>
  );
}

export default App;
