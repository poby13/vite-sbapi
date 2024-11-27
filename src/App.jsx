import './App.css'
import {RouterProvider} from "react-router-dom";
import root from "./router/root.jsx";

function App() {
  return (
    <RouterProvider router={root}>
    </RouterProvider>
  )
}

export default App
