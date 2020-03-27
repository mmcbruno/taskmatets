import React, {useContext} from 'react'
import { Task, TaskStatus } from '../generated/graphql' 
import ListItem from './listItem'

import  {TaskFilterContext} from '../pages/[status]';


interface Props{
    tasks : Task[]  
}

const TaskList : React.FC<Props> = ({tasks}) =>{ 

    return <ul className='task-list'>
        {tasks.map((task, index) => {
        return(
            <ListItem task={task} key={index} />
        )
    })}</ul> 
}

export default TaskList