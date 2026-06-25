import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Admin from "./admin";
import User from "./user";
import Home from "./home";
import NewLogin from "./SignFolder/NewLogin";
import SignIn from "./SignFolder/SignIn";

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
