import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const Todo = (props) => {
    const todoList = props.todoList
    const deleteTodo = props.deleteTodo
    const changeTodoStatus = props.changeTodoStatus
    const type = props.type

    return (
        <div>
            {todoList.map((todo, index) => (
                <Container key={index}>
                    {todo}
                    <IconButton aria-label="delete">
                        <DeleteIcon font-size="small" onClick={() => deleteTodo(index)} />
                    </IconButton>
                    <Button
                        variant="outlined"
                        color={type === "todo" ? "prinmary" : "secondary"}
                        onClick={() => changeTodoStatus(index)}
                    >  
                        {type === "todo" ? "Complete" : "Uncomplete"}
                    </Button>
                </Container>
            ))}
        </div>
    )
}

export default Todo

const Container = styled.div`
    color: #5c5c5c;
    letter-spacing: 1.8px;
`