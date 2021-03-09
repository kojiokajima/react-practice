import React, { useEffect, useState } from 'react'
import './App.css'
import Todo from './pages/Todo/index'
import styled from 'styled-components'
import {db} from './firebase/index'

const App = () => {
    const [input, setInput] = useState("")
    const [todoList, setTodoList] = useState([])
    const [finishedList, setFinishedList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isChangedTodo, setIsChangedTodo] = useState(false)
    const [isChangedFinished, setIsChengedFinished] = useState(false)

    useEffect(() => {
        (async () => {
            const resTodo = await db.collection("todoList").doc("todo").get()
            setTodoList(resTodo.data().tasks)
            const resFinishedTodo = await db.collection("todoList").doc("finishedTodo").get()
            setFinishedList(resFinishedTodo.data().tasks)
            setIsLoading(false)
        })()
    }, [db])

    useEffect(() => {
        if(isChangedTodo) {
            (async () => {
                setIsLoading(true)
                const docRef = await db.collection('todoList').doc('todo')
                docRef.update({tasks: todoList})
                setIsLoading(false)
            })()
        }
    }, [todoList, isChangedTodo, db])

    useEffect(() => {
        if (isChangedFinished) {
            (async () => {
                setIsLoading(true)
                const docRef = await db.collection('todoList').doc('finishedTodo')
                docRef.update({tasks: finishedList})
                setIsLoading(false)
            })()
        }
        setIsChangedTodo(false)
    }, [db, finishedList, isChangedFinished])


    const addTodo = async () => {
        if (!!input) {
            setIsChangedTodo(true)
            setTodoList([...todoList, input])
            setInput('')
        }
    }

    const deleteTodo = (index) => {
        setIsChangedTodo(true)
        setTodoList(todoList.filter((val, idx) => idx !== index))
    }

    const deleteFinishTodo = (index) => {
        setIsChengedFinished(true)
        setFinishedList(finishedList.filter((val, idx) => idx !== index))
    }

    const finishTodo = (index) => {
        setIsChangedTodo(true)
        setIsChengedFinished(true)
        deleteTodo(index)
        setFinishedList([...finishedList, todoList.find((val, idx) => idx === index)])
    }
    
    const reopenTodo = (index) => {
        setIsChangedTodo(true)
        setIsChengedFinished(true)
        deleteFinishTodo(index)
        setTodoList([...todoList, finishedList.find((val, idx) => idx === index)])
    }

    return (
        <div className="App">
            <Title>My first todo list</Title>

            <input onChange={(e) => setInput(e.target.value)} value={input} />

            <button onClick={() => addTodo()}>Add Todo</button>

            <TodoContainer>
                <SubContainer>
                    <SubTitle>In Progress</SubTitle>
                    <Todo todoList={todoList} deleteTodo={deleteTodo} changeTodoStatus={finishTodo} type="todo" />
                </SubContainer>
                <SubContainer>
                    <SubTitle>Completed</SubTitle>
                    <Todo todoList={finishedList} deleteTodo={deleteFinishTodo} changeTodoStatus={reopenTodo} type="done" />
                </SubContainer>
            </TodoContainer>
        </div>
    )
}

export default App

const Title = styled.p`
    font-size: 26px;
    color: #0097a7;
    letter-spacing: 2.8px;
    font-weight: 200
`;

const SubTitle = styled.p`
    fint-size: 22px;
    color: #5c5c5c;
`

const SubContainer = styled.div`
    width: 400px;
`

const TodoContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80%;
    margin: 0 auto;
    justify-content: space-between;
`