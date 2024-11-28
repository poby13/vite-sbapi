import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const TodoList = lazy(() => import("../pages/todo/ListPage.jsx"));
const TodoRead = lazy(() => import("../pages/todo/ReadPage.jsx"));

const todoRouter = () => {
    return [
        {
            path: "list",
            element: (
                <Suspense fallback={Loading}>
                    <TodoList></TodoList>
                </Suspense>
            ),
        },
        {
            /* `/todo/` 이하의 경로가 지정되지 않았을 경우 동작 <= 리다이렉션 처리 */
            path: "",
            element: <Navigate replace to="list"></Navigate>,
        },
        {
            path: "read/:tno",
            element: (
                <Suspense fallback={Loading}>
                    <TodoRead></TodoRead>
                </Suspense>
            ),
        },
    ];
};

export default todoRouter;
