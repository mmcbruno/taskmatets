import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import {
  Task,
  useDeleteTaskMutation,
  TasksQuery,
  TasksQueryVariables,
  TasksDocument,
  TaskStatus,
  useChangeStatusMutation
} from '../generated/graphql';
import  {TaskFilterContext} from '../pages/[status]';

interface Props {
  task: Task; 
}

const ListItem: React.FC<Props> = ({ task}) => {
  const {status} = useContext(TaskFilterContext);
  const [deleteTask, { loading, error }] = useDeleteTaskMutation({
    update: (cache, result) => {
      const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
        query: TasksDocument,
        variables: { status }
      });
      if (data){
         cache.writeQuery<TasksQuery, TasksQueryVariables>({
            query: TasksDocument,
            variables: { status },
            data : {
                tasks:data.tasks.filter(({ id }) => id !== result.data?.deleteTask.id)
            }
            
          })
      }
    }
  });
  const handleDeleteClick = () => {
    deleteTask({ variables: { id: task.id } });
  };
const [changeStatus, {loading: changingStatus, error : changeStatusError }] = useChangeStatusMutation();

const handleChangeStatus =  (event: React.ChangeEvent<HTMLInputElement>) =>{
 const newStatus = task.status=== TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active
 changeStatus({variables: {id: task.id, status: newStatus} })
}
  useEffect(() => {
    if (error) {
      alert('An error occured.');
    }
    if(changeStatusError){
      alert('Culd not change status');
    }
  }, [error, changeStatusError]);

  return (
    <li className='task-list-item' key={task.id}>
       <label className='checkbox'>
           <input type='checkbox' onChange={handleChangeStatus} 
           checked={task.status === TaskStatus.Completed}/>
           <span  className='checkbox-mark'>&#10003;</span>
           </label>
      <Link href='/update/[id]' as={`/update/${task.id}`}>
        <a>{task.title}</a>
      </Link>
      &nbsp;
      <button
        disabled={changingStatus}
        onClick={handleDeleteClick}
        className='delete-task-list-button'>
        Delete
      </button>
    </li>
  );
};

export default ListItem;
