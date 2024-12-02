import { useEffect } from "react"
import { useState } from "react"
import { getOne } from "../../api/todoApi"
import useCustomMove from "../../hooks/useCustomMove.jsx";

const initState = {
    tno: 0,
    title: '',
    writer: '',
    dueDate: null,
    complete: false
}

const makeDiv = (title, value) => 
    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">
                {title}
            </div>
            <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                {value}
            </div>
        </div>
    </div>
    

const ReadComponent = ({tno}) => {

    const [todo, setTodo] = useState(initState)

    const {moveToList, moveToModify} = useCustomMove()

    useEffect(() => {
        getOne(tno).then(data => {
            console.log(data)
            setTodo(data)
        })
    }, [tno])

    return (
        <div>
            {makeDiv('Tno', todo.tno)}
            {makeDiv('Writer', todo.writer)}
            {makeDiv('Title', todo.title)}
            {makeDiv('Due Date', todo.dueDate)}
            {makeDiv('Complete', todo.complete ? 'Completed' : 'Not Yet')}

            <div className="flex justify-end p-4">
                <button className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" type="button"
                        onClick={() => moveToList()}>
                    List
                </button>
                <button className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" type="button"
                        onClick={() => moveToModify(tno)}>
                    Modify
                </button>
            </div>
        </div>
    )
}

export default ReadComponent