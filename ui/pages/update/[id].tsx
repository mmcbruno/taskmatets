import React from 'react';
import { NextPage } from 'next';
import { withApollo } from '../../lib/withapollo'; 
import { useRouter } from 'next/router'; 

import { useTaskQuery } from '../../generated/graphql';
import UpdateTaskForm from '../../components/updateTaskForm';
// interface InitialProps {   
// }

// interface Props extends InitialProps{
// }

const UpdatePage : NextPage = props => {
    const router = useRouter();
   // const {id} = router.query;
   const id = typeof router.query.id === 'string' ? parseInt(router.query.id) : NaN 
   const {loading, error, data} = useTaskQuery({
        variables: { id }
    });
    const task = data?.task;

        return(
            <>
            {loading 
            ? (<p>Loading.....</p>)
            : error 
            ? <p>An error occured </p> 
            : task
            ? <UpdateTaskForm initialValues={{id:task.id, title:task.title}}/>: (<p>Task not found</p>)} 
            </>
        )
      

      
}

 

const UpdatePageWithApolool = withApollo(UpdatePage)

export default UpdatePageWithApolool