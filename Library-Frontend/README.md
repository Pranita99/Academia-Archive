# Frontend for Book Lending Application

### Overview

- Solution to "College Library Project" : Problem Statement 3 (Book Lending Application)
- Submission by team Dockerators (Kalyan Ram, Vidhish T, Vikas K)
- This repository contains the code to the frontend of our book lending application.
- The frontend of the book lending application is written in vite-react. It uses several extenrnal javascript libraries such as:
    - Axios : Making REST API calls to our backend
    - TailwindCSS : Writing stronger and more effective inline CSS
    - Flowbite-react : Using premade UI Components
- Link to Detailed Documentation : https://drive.google.com/drive/folders/1U6eiVa2SyMhqG_Kcy2lp0TuEF5pkZr9e?usp=drive_link 

### Frontend Flow

- When the application's base URL is opened, the login page opens
- A user can login as an admin or a librarian
- If the user logs in as an admin, they have the functionality to add, remove and view the librarians.
- If the user logs in as a librarian:
    - They can go to the books page or the students page.
        - In the books page, they can view, add, update and delete books. On pressing on a book tile, they can view the student that has issued that book (if some student has) and allow the book to be returned by that user.
        - Similarly on the students page, they can view, add, update and delete students. On pressing on a student tile, they can view the books that the student has borrowed and can return any of the books that that student has borrowed.


### Project Structure

- The following are the important folders in the react application source folder:

  | Folder | Contents |
  |--------|----------|
  |/public/images | Contains the images that are used throughout the frontend of the website. | 
  | /src/API | Contains the javascript functions which query the book lending app backend using axios calls and take state setting variables to set state variables which are passed from the frontend components. |
  | /src/Components/AdminLibrarian | Contains the jsx components to render the frontend for the admin. It allows the admins to view, add and delete librarians. |
  | /src/Components/BookStudents/ | Contains the jsx components to render the book details. It allows the librarian to add and delete (return) a student for a given book. |
  | /src/Components/BooksPage/ | Contains the jsx components to render all the books. It allows the librarian to view, add, update and delete books and search for a book by it's title. |
  | /src/Components/Common/ | Contains the jsx components to render the blue box in the login page |
  | /src/Components/Login/ | Contains the jsx components to render the form to fill details in the login page |
  | /src/Components/Signup/ | Contains the jsx components to render a sign up page. It is not used in our current implementation but could be possibly used in future extensions of our project. |
  | /src/Components/StudentBooks/ | Contains the jsx components to render the student details. It allows the librarian to add and delete (return) books for a given student and search for a book by title among the books that the given student has borrowed. |
  | /src/Components/StudentsPage/ | Contains the jsx components to render all the students. It allows the librarian to view, add, update and delete students and search for a student by their name. |

- The following are important files in the react application

  | Frontend Path | File (all files are in /src/) | Purpose |
  |---------|--------|----------|
  || App.jsx | Contains the different frontend routes (browser routes) and renders the required component based on the route. | 
  |/login| Login.jsx | Renders the page for the login screen. Calls the components in /src/Components/Login |
  |/adminlibrarian| AdminLibrarian.jsx | Renders the page for admins. Calls the components in /src/Components/AdminLibrarian | 
  |/dashboard| PagesOptions.jsx | When a librarian is logged in, it allows the librarian to go to the books page or the students page. |
  |/books| BooksPage.jsx | Renders the page for displaying the books. Allows the librarian to view, add, update and delete books. Calls the components in /src/Components/BooksPage |
  |/bookdetails/:id| BookDetailsPage.jsx | Renders the page for the details of a book. (id <=> book code) is called from the browser, it queries the backend using the book code and gets the details of the book and gets the student that has borrowed this book. The librarian can make the student return the given book. Calls the components in /src/Components/BookStudents |
  |/students| StudentsPage.jsx | Renders the page for displaying the students. Allows the librarian to view, add, update and delete students. Calls the components in /src/Components/StudentsPage |
  |/studentdetails/:id| StudentDetailsPage.jsx | Renders the page for the details of a student. (id <=> student rollNo) is called from the browser, it queries the backend using the student roll number and gets the details of the student and gets the books that have been borrowed by this student. The librarian can return any of the books borrowed by the givens student. Calls the components in /src/Components/StudentBooks | 


### Deployment 

- We used various AWS services to deploy the application. Firstly, we created an AWS Frontend cluster that contained a EC2 instances to run the docker image. A repository was created for this repo to store the images that are built by the CI/CD process using the ECR service. Then a task-definition was made which had information to run the image. In the cluster, we created a service which would make use of the task definition built and run the container on one of the EC2 instances.
- We used the CI/CD infrasture that github provides to create a workflow file which contained instructions to deploy the application on aws.
- Added the task-definition.json file that we got in the previous step to the root of the repo.
- Configured the aws.yml file with cluster name, service name, region ,repository and the location of the task-definition file.
- A Dockerfile was added ot the root of the repo. The Dockerfile contains commands to setup , test and build the image that will be run on the EC2 instance. The instance will run only if the command running tests passes.
- Once deployed, the ip address of the app is visible on the task that is running the app.
Push all the changes to github using git. Once pushed, github will take care of deploying to aws.
  


