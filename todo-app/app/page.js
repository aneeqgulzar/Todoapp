"use client";

import { useState, useEffect } from "react";

import PlusIcon from "./assets/icons/PlusIcon";
import CheckCircleIcon from "./assets/icons/CheckCircleIcon";
import ListIcon from "./assets/icons/ListIcon";
import ChevronIcon from "./assets/icons/ChevronIcon";
import DotIcon from "./assets/icons/DotIcon";
//import Image from "next/image";


export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [selectedTask, setSelectedTask] = useState(null);
  const [showTodos, setShowTodos] = useState(false);

  const toggleTodos = () => {
    setShowTodos(!showTodos);
  };

  const handleDotIconClick = (taskId) => {
    setSelectedTask((prevSelectedTask) =>
      prevSelectedTask && prevSelectedTask._id === taskId
        ? null
        : tasks.find((task) => task._id === taskId)
    );
  };

  useEffect(() => {
    fetch("https://todoapp-api-kohl.vercel.app/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addToTask = async () => {
    if (!newTask) return;

    await fetch("https://todoapp-api-kohl.vercel.app/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTask }),
    });

    setNewTask("");
    updateTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`https://todoapp-api-kohl.vercel.app/api/tasks/${id}`, {
      method: "DELETE",
    });

    updateTasks();
  };

  const updateTasks = () => {
    fetch("https://todoapp-api-kohl.vercel.app/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <div>
          <img
            className="rounded-full border-4 border-gray-100 mb-4 h-24 w-24  shadow-sm"
            src="https://images.unsplash.com/photo-1636041282803-3b626a7c3166?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="user image"
          />
        </div>

        <div>
          <form className="w-96">
            <label
              htmlFor="default-add"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              add
            </label>
            <div className="relative">
              <input
                type="add"
                id="default-add"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add new task"
                required
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button
                onClick={addToTask}
                type="button"
                className="text-white absolute end-2.5 bottom-2.5 bg-stone-400 hover:bg-stone-500  font-medium rounded-lg text-sm px-1 py-1"
              >
                <PlusIcon className="w-5 h-5 inline-block mr-2" />
              </button>
            </div>
          </form>
        </div>

        <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-transparent flex items-center justify-items-start rounded border-stone-300 border-2 shadow p-4 m-4 w-96 lg:w-96 lg:max-w-lg">
            <ListIcon className="w-5 h-5 inline-block" />
            <h3 className="text-white ml-3">Your todos</h3>
            <ChevronIcon
              onClick={toggleTodos}
              className="w-5 ml-52 h-5 inline-block cursor-pointer"
            />
          </div>
        </div>

        {showTodos && (
          <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
          <div className="bg-neutral-100 rounded-md shadow m-4 max-h-64 overflow-y-auto w-96 lg:w-96 lg:max-w-lg">
              {tasks.length === 0 ? (
                <p className="text-black mt-20 text-center ">No tasks today</p>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="flex flex-col  mb-4">
                    <div className="flex items-center justify-between border-b pb-2">
                      <CheckCircleIcon className="w-14 h-5 ml-4 my-4 inline-block mr-2" />
                      <p
                        className={`w-full ${
                          task.completed
                            ? "line-through text-green"
                            : "text-grey-darkest"
                        }`}
                      >
                        {task.text}
                      </p>
                      <DotIcon
                        onClick={() => handleDotIconClick(task._id)}
                        className="w-16 h-5 text-right inline-block cursor-pointer"
                      />
                    </div>

                    {selectedTask && selectedTask._id === task._id && (
                      <div className="bg-white rounded  w-full shadow p-4 ">
                        <p
                          className={`w-full ${
                            selectedTask.completed
                              ? "line-through text-green"
                              : "text-grey-darkest"
                          }`}
                        >
                          Completed:{" "}
                          {selectedTask.completed
                            ? "Completed"
                            : "Not completed"}
                        </p>
                        <p className="w-full text-grey-darkest">
                          Created At:{" "}
                          {new Date(task.createdAt).toLocaleString()}
                        </p>
                        <button
                          onClick={() => deleteTask(selectedTask._id)}
                          className="flex-no-shrink p-2 mt-2 bg-red-200 w-full text-red-600  border-2 rounded text-red border-red hover:bg-red"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
