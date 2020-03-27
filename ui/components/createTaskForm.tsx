import React, { useState } from 'react';
import { useCreateTaskMutation } from '../generated/graphql';
import { create } from 'domain';

interface Props{
    onTaskCreated :() => void
}

const CreateTaskForm: React.FC<Props> = ({onTaskCreated}) => {
  const [title, setTitle] = useState('');
  const [createTask, {loading, error}] = useCreateTaskMutation({
      onCompleted : () =>{
          onTaskCreated();
          setTitle('');
      }
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const handleSubmit=  (event: React.FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      if(!loading && title){
        createTask({
            variables:{
                input : {
                    title
                }
            }
        });
  
      }
  
  }

  return (
    <form onSubmit={handleSubmit}>
        {error && <p className='alert-error'>an error occured</p>}
        
      <input
        type='text'
        name='title'
        placeholder='What would you like to get done?'
        autoComplete='off'
        className='text-input new-tastk-text-input'
        value={title}
        onChange={handleChange}></input>
    </form>
  );
};

export default CreateTaskForm;
