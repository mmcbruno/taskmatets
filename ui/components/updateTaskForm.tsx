import React, { useState, useEffect } from 'react';
import { useUpdateTaskMutation } from '../generated/graphql';
import {useRouter} from 'next/router'

interface Values{
  id : number
  title : string
}
interface Props{
    initialValues: Values
}

const UpdateTaskForm: React.FC<Props> = ({initialValues}) => {
  const [values, setValues] = useState<Values>(initialValues);
//   const [createTask, {loading, error}] = useCreateTaskMutation({
//       onCompleted : () =>{
//           onTaskCreated();
//           setTitle('');
//       }
//   });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
    setValues(values => ({
        ...values,
        [name] : value
    }));
  };
  const [updateTask, {loading, error, data }] = useUpdateTaskMutation();


  const handleSubmit=  (event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      updateTask({
        variables : {
          input : values
        }
      })
    
  }
  const router = useRouter();
useEffect(() => {
  if (data && data.updateTask) {
    router.push('/');
  }
});

  return (
    <form className='field-label' onSubmit={handleSubmit}>
        {error && <p className='alert-error'>an error occured</p>}
        <p>
        <input
        type='text'
        name='title'
        className='text-input'
        value={values.title}
        onChange={handleChange}
        ></input>
        </p>
    <p><button disabled={loading} type='submit' className='button'>
      {loading ? 'Loading...' : 'Save'}
      </button></p>
    </form>
  );
};

export default UpdateTaskForm;
