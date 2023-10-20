import { createContext, useContext, useState } from "react";
import { DateTime } from 'luxon'
import { TaskFormattedProps, TaskProps } from "../components/Task";

interface TasksContextProps {
  tasks: TaskFormattedProps[]
  addTask: (task: TaskProps) => void
  updateTask: (task: TaskProps) => void
  deleteTask: (id: number) => void
}

export const TasksContext = createContext({} as TasksContextProps)

export const TasksProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<TaskFormattedProps[]>([
    {
      id: 1,
      description: 'Test first task',
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      formattedDate: {
        created: '0 times ago',
        updated: '2 times ago'
      }
    },
  ])

  
  function addTask(task: TaskProps) {
    const taskFormatted: TaskFormattedProps = {
      ...task,
      formattedDate: formattedDate(task.createdAt, task.updatedAt)}
    setTasks(oldData => [...oldData, taskFormatted])
  }

  function updateTask(task: TaskProps) {
    const taskFormatted: TaskFormattedProps = {
      ...task,
      formattedDate: formattedDate(task.createdAt, task.updatedAt)}
    const taskIndex = tasks.findIndex(item => item.id === task.id)
    const oldTasks = [...tasks]
    oldTasks[taskIndex] = taskFormatted
    setTasks(oldTasks)
  }

  function deleteTask(id: number) {
    setTasks(oldData => [...oldData.filter(item => item.id !== id)])
  }

  function formattedDate(createdAt: Date, updatedAt: Date) {
    return {
      created: convertDate(createdAt),
      updated: convertDate(updatedAt)
    }
  }

  function convertDate(date: Date): string {
    const dateTime = DateTime.fromISO(date.toISOString());
    const timeAgo = dateTime.toRelative({ base: DateTime.local() })

    return timeAgo!
  }

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TasksContext)

  return context
}