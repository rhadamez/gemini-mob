import { Button, FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { Task, TaskProps, TaskFormattedProps } from '../../components/Task'
import { DateTime } from 'luxon'
import { Header } from '../../components/Header'

export default function Home() {
  const [tasks, setTasks] = useState<TaskFormattedProps[]>([])

  function convertDate(date: Date): string {
    const dateTime = DateTime.fromISO(date.toISOString());
    const timeAgo = dateTime.toRelative({ base: DateTime.local() })

    return timeAgo!
  }

  useEffect(() => {
    loadTasks()
    async function loadTasks() {
      const response: TaskProps[] = [
        {
          id: 1,
          description: 'Test first task',
          done: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
      const formattedTasks = response.map(item => {
        return {
          ...item,
          formattedDate: {
            created: convertDate(item.createdAt),
            updated: convertDate(item.updatedAt)
          }}
      })

      setTasks(formattedTasks)
    }
  }, [])

  const deleteTask = useCallback((id: number) => {
      setTasks(oldData => [...oldData.filter(item => item.id !== id)])
  }, [])

  return (
    <VStack bg='#011323' flex={1}>
      <Header />
      <VStack mt={5} mx={10}>
        <Button w={20} mb={5}>Add task</Button>
        {tasks.map(item => <Task key={item.id} data={item} deleteTask={deleteTask} />)}
      </VStack>
    </VStack>
  );
}

