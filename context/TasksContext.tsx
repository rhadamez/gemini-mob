import { createContext, useContext, useEffect, useState } from "react";
import { DateTime } from 'luxon'
import { TaskFormattedProps, TaskProps } from "../components/Task";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";
import { CREATE_TASK } from "../graphql/mutations";

interface TasksContextProps {
  tasks: TaskFormattedProps[]
  addTask: (description: string) => Promise<void>
  updateTask: (task: TaskFormattedProps) => void
  deleteTask: (id: number) => void
}

export const TasksContext = createContext({} as TasksContextProps)

export const TasksProvider = ({ children }: any) => {
  const { data, loading } = useQuery(GET_TASKS)
  const [createTask, { data:createTaskData }] = useMutation(CREATE_TASK)
  const [tasks, setTasks] = useState<TaskFormattedProps[]>([])

  useEffect(() => {
    if(data) {
      const formattedTasks = data.list.map((item:TaskProps) => {
        return {
          ...item,
          formattedDate: formattedDate(item.createdAt, item.updatedAt)
        }
      })
      setTasks(formattedTasks)
    }
  }, [data, loading])

  async function addTask(description: string) {

    const { data } = await createTask({
      variables: {
          description
      },
    })

    const createdTask = data.create

    const taskFormatted: TaskFormattedProps = {
      ...createdTask,
      formattedDate: formattedDate(createdTask.createdAt, createdTask.updatedAt)}
    setTasks(oldData => [...oldData, taskFormatted])
  }

  function updateTask(task: TaskFormattedProps) {
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
    //const dateTime = DateTime.fromISO(date.toString());
    //const timeAgo = dateTime.toRelative({ base: DateTime.local() })

    return 'timeAgo'!
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