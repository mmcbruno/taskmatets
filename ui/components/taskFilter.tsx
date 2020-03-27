import React, {useContext} from 'react'
 
import Link from 'next/link';
import { TaskStatus } from '../generated/graphql';
import  {TaskFilterContext} from '../pages/[status]';
// interface Props{
//     status? : TaskStatus
// }

const TaskFilter: React.FC = () =>{
    const {status} = useContext(TaskFilterContext);
    return (
      <ul className='task-filter'>
       <li>
        <Link href='/'><a className={!status ? 'task-filter-active' : ''} >All</a></Link>
        </li>
        <li>
        <Link href='/[status]' as={`/${TaskStatus.Active}`}><a className={status===TaskStatus.Active ? 'task-filter-active' : ''} >Active</a></Link>
        </li> <li>
        <Link href='/[status]' as={`/${TaskStatus.Completed}`}><a>Completed</a></Link>
        </li>
    </ul> 
    )}

export default TaskFilter