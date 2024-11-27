import BasicMenu from "../components/menus/BasicMenu.jsx";

const BasicLayout = ({ children }) => {
    return (
        <>
            <BasicMenu></BasicMenu>
            {/* 상단 여백에 my-5 제거 */}
            <div className="bg-white w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                {/* 상단 여백에 py-40을 py-5로 변경 */}
                <main className="bg-sky-300 md:w-2/3 lg:w-3/4 px-5 py-5">{children}</main>
                {/* 상단 여백에 py-40 제거 */}
                <aside className="bg-green-300 md:w-1/3 lg:w-1/4 px-5">
                    <h1 className="text-2xl md:text-4xl">Sidebar</h1>
                </aside>
            </div>
        </>
    )
}

export default BasicLayout;