import { createBrowserRouter, RouterProvider } from "react-router-dom"
import User from "./components/getUser/User"
import Add from "./components/addUser/Add"

import './App.css'
import Edit from "./components/updateUser/Edit"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <User/>,
    },
    {
      path: "/add",
      element: <Add/>,
    },
    {
      path: "/edit/:id",
      element: <Edit/>,
    },
    {
      path: "/update",
      element: "update page",
    },
    {
      path: "/delete",
      element: "delete page",
    },
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
