import React, { useState } from 'react'
import axios from 'axios';
import { GrUpdate } from 'react-icons/gr';
import { MdDeleteForever } from 'react-icons/md';
import moment from "moment";


const TaksList = ({tasks,setUpdate,update}) => {

  const [updateRow, setUpdateRow] = useState(0);
  const [updatePriority, setUPdatePriority] = useState(4);
  const [updateInputValue, setUpdateInputValue] = useState(' ');

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


    const getBg = (priority) => {
        let bgColor = "bg-red-400";
     
        switch (priority) {
          case "1":
            bgColor = "bg-[#FF6969]";
            break;
          case "2":
            bgColor = "bg-[#FFD93D]";
            break;
          case "3":
            bgColor = "bg-[#82CD47]";
            break;
     
          default:
            bgColor = "bg-[#82CD47]";
            break;
        }
     
        return bgColor;
      };

      console.log(`task`,tasks);
  return (
    <>
    {tasks.map((task) => (
          <div key={task.id}>
            <li
              className={`${getBg(
                task.priority
              )} rounded-lg p-4 mb-2 flex items-center justify-between`}
             
            >
              {task.name}{" "}
              <span>
                <span className='mr-[10px] w-[300px] text-left'>{moment(task.created_at).startOf('minutes').fromNow()}</span>
              <button
                className="text-green-500 font-bold hover:text-green-700 transition-all duration-200 mr-[10px]"
                onClick={() => setUpdateRow(task.id == updateRow ? 0 : task.id)}
              >
                <GrUpdate/>
              </button>

              <button
                className="text-red-500 font-bold hover:text-red-700 transition-all duration-200"
                onClick={() => handleDeleteTask(task.id)}
              >
                <MdDeleteForever/>
              </button>
              </span>
             
            </li>
            
            {task.id == updateRow && <div className="flex items-center mb-4 justify-center">
              <input
                className="rounded-l-lg py-2 px-4 border-t mr-0 border-b  text-gray-800 border-gray-200 bg-white focus:border-blue border-2 border-solid"
                type="text"
                placeholder="Update this task"
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
          </div>
        ))}
    
    
    </>
  )
}

export default TaksList