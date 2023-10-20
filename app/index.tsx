import { ScrollView, VStack } from 'native-base'
import { useCallback, useState } from 'react'
import { Task, TaskFormattedProps  } from '../components/Task'
import { DateTime } from 'luxon'
import { Header } from '../components/Header'
import { AddButton } from '../components/AddButton'
import { AntDesign } from '@expo/vector-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useTasks } from '../context/TasksContext'
import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../graphql/queries'

export default function Home() {
  const router = useRouter()
  const { tasks, deleteTask } = useTasks()

  const [isModalVisible, setIsModalVisible] = useState(false)

  const { data } = useQuery(GET_TASKS)

  console.log(data)

  function convertDate(date: Date): string {
    const dateTime = DateTime.fromISO(date.toISOString());
    const timeAgo = dateTime.toRelative({ base: DateTime.local() })

    return timeAgo!
  }

  function toggleModal() {
    setIsModalVisible(!isModalVisible)
  }

  const handleDeleteTask = useCallback((id: number) => {
    deleteTask(id)
  }, [])

  function createTask() {
    router.push('/create-task')
  }

  return (
    <VStack bg='#011323' flex={1}>
      <Header />
      <ScrollView mt={5} showsVerticalScrollIndicator={false}>
        <VStack space={5} mx={4} pt={10} pb={20}>
          {tasks.map(item => (
            <Task key={item.id} data={item} deleteTask={handleDeleteTask} />
          ))}
        </VStack>
      </ScrollView>
      <AddButton
        position='absolute'
        bottom={5}
        alignSelf={'center'}
        onPress={createTask}
        icon={() => <AntDesign name='plus' size={25} color='#011323' />}
        />
    </VStack>
  );
}

