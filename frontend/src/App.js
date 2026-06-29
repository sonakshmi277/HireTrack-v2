import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Admin from "./admin";
import User from "./user";
import Home from "./home";
import NewLogin from "./SignFolder/NewLogin";
import SignIn from "./SignFolder/SignIn";
import AdminHomePage from "./adminHomePage";
import ApplicantsAdmin from "./applicantsAdmin";
import JobsAdmin from "./jobsAdmin";
import JobPostedAdmin from "./jobPostedAdmin";
import UserHomePage from "./UserPages/UserHomePage";
import NewJobUser from "./UserPages/newJobUser";
import JobUser from "./UserPages/jobUser";

const router=createBrowserRouter([
  {
    path:"/",
    element:
    <div>
      <Home/>
    </div>
  },
 {
    path:"/admin",
    element:
    <div>
      <Admin/>
    </div>
  },
  {
    path:"/user",
    element:
    <div>
      <User/>
    </div>
  },
  {
    path:"/signIn",
    element:
    <div>
      <SignIn/>
    </div>
  },
  {
    path:"/newLogin",
    element:
    <div>
      <NewLogin/>
    </div>
  },
  {
    path:"/adminHomePage",
    element:
    <div>
      <AdminHomePage/>
    </div>
  },
  {
    path:"/jobsAdmin",
    element:
    <div>
      <JobsAdmin/>
    </div>
  },
  {
    path:"/applicantsAdmin",
    element:
    <div>
      <ApplicantsAdmin/>
    </div>
  },
  {
    path:"/jobPostedAdmin",
    element:
    <div>
      <JobPostedAdmin/>
    </div>
  },
  {
    path:"/UserPages/UserHomePage",
    element:
    <div>
      <UserHomePage/>
    </div>
  },
   {
    path:"/UserPages/newJobUser",
    element:
    <div>
      <NewJobUser/>
    </div>
  },
   {
    path:"/UserPages/jobUser",
    element:
    <div>
      <JobUser/>
    </div>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
