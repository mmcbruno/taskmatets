import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '../lib/withapollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';
import TaskList from '../components/taskList';
import CreateTaskForm from '../components/createTaskForm';

interface InitialProps {   
}

interface Props extends InitialProps{
}

const IndexPage : NextPage<Props, InitialProps> = props => {
    const {loading, error, data, refetch} = useTasksQuery({
        variables:{status: TaskStatus.Active}
    })
    if(loading){
        return <p>Loading</p>
    }
    else if(error){
        return <p>An error occured</p>
    }
    const tasks = data?.tasks;
        return(
            <>
            <CreateTaskForm onTaskCreated={refetch}/>
            {tasks ? (<TaskList tasks={tasks}></TaskList>) : (<p>There are no tasks</p>)}
            </>
        )
      

      
}

 

const IndexPageWithApolool = withApollo(IndexPage)

export default IndexPageWithApolool