import {createBrowserRouter} from "react-router-dom";
import {Suspense, lazy} from "react";
import todoRouter from "./todoRouter.jsx";

const Loading = <div>Loading....</div>
const Main = lazy(() => import('../pages/MainPage.jsx'))
const About = lazy(() => import('../pages/AboutPage.jsx'))
const TodoIndex = lazy(() => import('../pages/todo/IndexPage.jsx'))
const TodoList = lazy(() => import('../pages/todo/ListPage.jsx'))

// lazy는 MainPage를 메모리에 올리지 않고 지연로딩
// Suspense 로딩UI를 보여줌
const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main></Main></Suspense>,
    },
    {
        path: "about",
        element: <Suspense fallback={Loading}><About></About></Suspense>,
    },
    {
        path: "todo",
        element: <Suspense fallback={Loading}><TodoIndex></TodoIndex></Suspense>,
        children: todoRouter()
    }
])

export default root;