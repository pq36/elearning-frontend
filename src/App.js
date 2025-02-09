import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./components/addInstructor/Add"
import User from "./components/GetInstructor/getInstructor";
import SearchUser from "./components/GetInstructor/searchInstructor";
import Login from "./login";
import Home from "./home";
import ProfilePage from "./profile";
import { AuthProvider } from "./AuthContext";
import EditInstructor from "./editInstructor";
import CreateCourse from "./createcourse";
import SeeMyCourses from "./mycourse";
import SearchCoursesPage from "./seachcourse";
import ViewCoursePage from "./viewCourse";

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/Register",
      element:<Add/> },
      {
        path:"/instructors",
        element:<User/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/searchInstructor",
        element:<SearchUser/>
      },
      {
        path:"/profile",
        element:<ProfilePage/>
      },
      {
        path:"/editInstructor",
        element:<EditInstructor/>
      },
      {
        path:"/createcourse",
        element:<CreateCourse/>
      },
      {
        path:"/mycourse",
        element:<SeeMyCourses/>
      },
      {
        path:"/searchcourse",
        element:<SearchCoursesPage/>
      },
      {
        path:"/viewcourse/:courseId",
        element:<ViewCoursePage/>
      }
  ])
  return (
    <AuthProvider>
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
    </AuthProvider>
  )
}

export default App;