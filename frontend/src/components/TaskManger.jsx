import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import TaksList from './TaksList';


function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState(1);
  const [update, setUpdate] = useState(true);

  const handleAddTask =  async () => {
    // console.log(`${process.env.REACT_APP_API_URL}/store`);
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/store`, {
          task:inputValue,
          priority,
        });
        setUpdate(!update);
        setInputValue('');
      } catch (error) {
        console.error(error);
      }
  };

 

  



  const getRecord = async () => {
    // console.log(`${process.env.REACT_APP_API_URL}/store`);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/task/show`);
      setTasks(response.data.date);
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    getRecord();
  }, [update]);
 

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <div className="flex items-center mb-4">
        <input
          className="rounded-l-lg py-2 px-4 border-t mr-0 border-b  text-gray-800 border-gray-200 bg-white focus:border-blue border-2 border-solid"
          type="text"
          placeholder="Enter a task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <select
          className="py-2 px-4 border-t mr-0 border-b border-r text-gray-800 border-gray-200 bg-white h-[42px]"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
        <button
          className="px-4 rounded-r-lg bg-green-500 text-white font-bold py-2 hover:bg-green-600 transition-all duration-200 h-[42px]"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      <ul className="w-full max-w-lg">
        <TaksList tasks={tasks} setUpdate={setUpdate} update={update}/>
      </ul>
    </div>
  );
}

export default TaskManager;
