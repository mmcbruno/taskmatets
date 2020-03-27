import React, {createContext} from 'react';
import { NextPage } from 'next';
import { withApollo } from '../lib/withapollo';
import { useTasksQuery, TaskStatus } from '../generated/graphql';
import TaskList from '../components/taskList';
import CreateTaskForm from '../components/createTaskForm';
import { useRouter } from 'next/router';
import TaskFilter from '../components/taskFilter';

interface InitialProps { }

interface Props extends InitialProps { }
interface TaskFilterContextValues {
    status?: TaskStatus;
}
export const TaskFilterContext = createContext<TaskFilterContextValues>({});

const IndexPage: NextPage<Props, InitialProps> = props => {
    const router = useRouter();
    const status =
        typeof router.query.status === 'string'
            ? (router.query.status as TaskStatus)
            : undefined;

    const { loading, error, data, refetch } = useTasksQuery({
        variables: { status },
        fetchPolicy: 'cache-and-network'
    });
    const tasks = data?.tasks;
    if (loading && !tasks) {
        return <p>Loading</p>;
    } else if (error) {
        return <p>An error occured</p>;
    }
    const taskFilter ={status}

    return (
        <TaskFilterContext.Provider value={taskFilter} >
            <CreateTaskForm onTaskCreated={refetch} />
            {tasks ? (
                <>
                    <TaskList tasks={tasks}></TaskList>
                    <TaskFilter />
                </>
            ) : (
                    <p>There are no tasks</p>
                )}
        </TaskFilterContext.Provider>
    );
};

const IndexPageWithApolool = withApollo(IndexPage);

export default IndexPageWithApolool;
