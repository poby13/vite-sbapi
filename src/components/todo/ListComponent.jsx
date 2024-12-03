import useCustomMove from "../../hooks/useCustomMove.jsx";
import {getList} from "../../api/todoApi.jsx";
import {useEffect, useState} from "react";
import PageComponent from "../menus/PageComponent.jsx";

const initState = {
    dtoList: [],
    pageNumList: [], // 현재 페이지네이션에 표시될 페이지 목록
    pageRequestDTO: null, // 페이지 번호, 페이지 크기, 정렬 순서
    prev: false, // 이전페이지 여부
    next: false, // 다음페이지 여부
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0,
};

const ListComponent = () => {
    const {page, size, moveToList, moveToRead} = useCustomMove();

    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({page, size}).then((data) => {
            console.log(data);
            const {
                pageNumList,
                prev,
                next,
                prevPage,
                nextPage,
            } = calculatePagination(data);
            // 응답 결과 맵핑처리
            setServerData(serverData => ({
                ...serverData,
                dtoList: data.content,
                pageNumList: pageNumList,
                pageRequestDTO: {page: data.page, size: 10, sort: "DESC"},
                prev: prev,
                next: next,
                totalCount: data.totalElements,
                prevPage: prevPage,
                nextPage: nextPage,
                totalPage: data.totalPages,
                current: data.currentPage
            }));
        });
    }, [page, size]);

    // 페이지네이션 계산 함수
    const calculatePagination = (pageResponse) => {
        const {totalPages, currentPage} = pageResponse;
        const pageNumList = [];

        // 현재 페이지 주변으로 페이지네이션 번호를 표시하기 위한 범위 설정
        const range = 5; // 기본적으로 5개의 페이지 표시 (예: 1, 2, 3, 4, 5)
        const start = Math.max(1, currentPage - Math.floor(range / 2));
        const end = Math.min(totalPages, start + range - 1);

        // 페이지 번호 목록 생성
        for (let i = start; i <= end; i++) {
            pageNumList.push(i);
        }

        const prev = currentPage > 1;
        const next = currentPage < totalPages;
        const prevPage = prev ? currentPage - 1 : 0;
        const nextPage = next ? currentPage + 1 : totalPages;

        return {
            pageNumList,
            prev,
            next,
            prevPage,
            nextPage,
        };
    };

    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map((todo) => (
                    <div
                        key={todo.tno}
                        className="w-full min-w- p-2 m-2 rounded shadow-md"
                        onClick={() => moveToRead(todo.tno)}
                    >
                        <div className="flex">
                            <div className="font-extrabold text-2xl p-2 w-1/12">
                                {todo.tno}
                            </div>
                            <div className="text-1xl m-1 p-2 w-8/12 font-extrabold">
                                {todo.title}
                            </div>
                            <div className="text-1xl m-1 p-2 2w-2/10 font-medium">
                                {todo.dueDate}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <PageComponent
                serverData={serverData}
                movePage={moveToList}
            ></PageComponent>
        </div>
    );
};

export default ListComponent;
