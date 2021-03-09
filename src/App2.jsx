import './App.css';
import { useCallback, useEffect, useState } from 'react';
import {db} from './firebase/index'

function App() {
  const [word, setWord] = useState("")
  const [todoList, setTodoList] = useState([])

  const inputWord = useCallback((e) => {
    console.log(e.target.value)
    setWord(e.target.value)
  }, [setWord])

  const addTodo = async () => {
    const todoArr = todoList
    const inputStr = ""
    todoArr.push(word)

    setTodoList([...todoArr])

    const docRef = await db.collection('todoList').doc('todo');
    docRef.update({ tasks: todoList })
    setWord(inputStr)
    console.log(word)

    db.collection("todoList").add("completedTodo")

  }

  useEffect(() => {
    (async () => {
      const tasksArray = []

      const resTodo = await db.collection('todoList').doc('todo').get() //謎のやつ

      resTodo.data().tasks.forEach(doc => {
        tasksArray.push(doc)
      })
      console.log(tasksArray)

      setTodoList(tasksArray)

      // console.log("resTodo:")
      // console.log(resTodo)  //謎のやつ
      // console.log(resTodo.data()) //Arrayが入ったObject
      // console.log(resTodo.data().tasks) //tasksが入ったArray
      // console.log("todoList state")
      // console.log(todoList)
      // console.log(todoList)

      // console.log(typeof(doc))
      // console.log(doc)
      //

    })()
  }, [])

  // task.set({task: word})

  return (
    <div className="App">
      <label htmlFor="">Add item</label>
      <input type="text" onChange={inputWord} />

      <button onClick={addTodo}>Send</button>
    </div>
  );
}

export default App;
