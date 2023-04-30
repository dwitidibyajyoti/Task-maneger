import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [updateInputValue, setUpdateInputValue] = useState(' ');

  const [priority, setPriority] = useState(1);
  const [updatePriority, setUPdatePriority] = useState(4);

  const [update, setUpdate] = useState(true);
  const [updateRow, setUpdateRow] = useState(0);




  const handleAddTask = () => {
    createRecord();
  };

  const handleUpdateTask = async(id) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/task/update/${id}`, {
          task:updateInputValue,
          priority:updatePriority,
        });
        setUpdate(!update);
        setUpdateInputValue(' ')
        setUPdatePriority(4)
        setUpdateRow(0);
      } catch (error) {
        console.error(error);
      }
  };

  const handleDeleteTask = async(index) => {
    // setTasks(newTasks);

    try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/task/delete/${index}`);

        console.log(`response`, response);
        setUpdate(!update);
      } catch (error) {
        console.error(error);
      }
  };

 
  const createRecord = async () => {
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

 const getBg = (priority) => {
   let bgColor = "bg-red-400";

   switch (priority) {
     case "1":
       bgColor = "bg-red-400";
       break;
     case "2":
       bgColor = "bg-amber-300";
       break;
     case "3":
       bgColor = "bg-lime-300";
       break;

     default:
       bgColor = "bg-lime-300";
       break;
   }

   return bgColor;
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
        {tasks.map((task) => (
          <>
            <li
              className={`${getBg(
                task.priority
              )} rounded-lg p-4 mb-2 flex items-center justify-between`}
              key={task.id}
            >
              {task.name}{" "}
              <span>
              <button
                className="text-green-500 font-bold hover:text-green-700 transition-all duration-200 mr-[10px]"
                onClick={() => setUpdateRow(task.id == updateRow ? 0 : task.id)}
              >
                update
              </button>

              <button
                className="text-red-500 font-bold hover:text-red-700 transition-all duration-200"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
              </span>
             
            </li>
            {task.id == updateRow && <div className="flex items-center mb-4 justify-center">
              <input
                className="rounded-l-lg py-2 px-4 border-t mr-0 border-b  text-gray-800 border-gray-200 bg-white focus:border-blue border-2 border-solid"
                type="text"
                placeholder="Enter a task"
                value={updateInputValue == ' ' ? task.name : updateInputValue}
                onChange={(e) => setUpdateInputValue(e.target.value)}
              />
              <select
                className="py-2 px-4 border-t mr-0 border-b border-r text-gray-800 border-gray-200 bg-white h-[42px]"
                value={updatePriority == 4 ? task.priority : updatePriority}
                onChange={(e) => setUPdatePriority(e.target.value)}
              >
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </select>
              <button
                className="px-4 rounded-r-lg bg-green-500 text-white font-bold py-2 hover:bg-green-600 transition-all duration-200 h-[42px]"
                onClick={()=>handleUpdateTask(task.id)}
              >
                update
              </button>
            </div>}
          </>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
