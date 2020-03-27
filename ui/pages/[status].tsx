import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '../lib/withapollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';
import TaskList from '../components/taskList';
import CreateTaskForm from '../components/createTaskForm';
import {useRouter} from 'next/router'
import TaskFilter from '../components/taskFilter';

interface InitialProps {   
}

interface Props extends InitialProps{
}

const IndexPage : NextPage<Props, InitialProps> = props => {
    const router = useRouter();
    const status = typeof router.query.status === 'string' ? router.query.status as TaskStatus : undefined
  
    const {loading, error, data, refetch} = useTasksQuery({
        variables:{status}, 
        fetchPolicy : 'cache-and-network'
    })
    const tasks = data?.tasks;
    if(loading && !tasks){
        return <p>Loading</p>
    }
    else if(error){
        return <p>An error occured</p>
    }
   
        return(
            <>
            <CreateTaskForm onTaskCreated={refetch}/>
            {tasks ? 
            (<>
            <TaskList  status={status} tasks={tasks}></TaskList>
                <TaskFilter status={status}/></>
                ) 
            : 
            (<p>There are no tasks</p>)}
           
            </>
        )
      

      
}

 

const IndexPageWithApolool = withApollo(IndexPage)

export default IndexPageWithApolool