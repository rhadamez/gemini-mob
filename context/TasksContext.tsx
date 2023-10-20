import { createContext, useContext, useEffect, useState } from "react";
import { DateTime } from 'luxon'
import { TaskFormattedProps, TaskProps } from "../components/Task";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TASKS } from "../graphql/queries";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../graphql/mutations";

interface TasksContextProps {
  tasks: TaskFormattedProps[]
  addTask: (description: string) => Promise<void>
  updateTask: (task: TaskFormattedProps) => Promise<void>
  deleteTask: (id: number) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextProps)

export const TasksProvider = ({ children }: any) => {
  const { data, loading } = useQuery(GET_TASKS)
  const [createTask] = useMutation(CREATE_TASK)
  const [updateTaske] = useMutation(UPDATE_TASK)
  const [deleteTaskById] = useMutation(DELETE_TASK)
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

  async function updateTask(task: TaskFormattedProps) {
    try {
      await updateTaske({
        variables: {
            id: Number(task.id),
            description: task.description,
            done: Boolean(task.done)
        },
      })
    } catch(err) {
      console.log(JSON.stringify(err))
    }

    const taskFormatted: TaskFormattedProps = {
      ...task,
      formattedDate: formattedDate(task.createdAt, task.updatedAt)}
    const taskIndex = tasks.findIndex(item => item.id === task.id)
    const oldTasks = [...tasks]
    oldTasks[taskIndex] = taskFormatted
    setTasks(oldTasks)
  }

  async function deleteTask(id: number) {
    const taskId = Number(id)
    try {
      await deleteTaskById({
        variables: {
          id: taskId
        },
      })
    } catch(err) {
      console.log(JSON.stringify(err))
    }


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