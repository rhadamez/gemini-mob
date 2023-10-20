import { ScrollView, VStack } from 'native-base'
import { useState } from 'react'
import { Task } from '../components/Task'
import { Header } from '../components/Header'
import { AddButton } from '../components/AddButton'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useTasks } from '../context/TasksContext'

export default function Home() {
  const router = useRouter()
  const { tasks } = useTasks()

  const [isModalVisible, setIsModalVisible] = useState(false)

  function toggleModal() {
    setIsModalVisible(!isModalVisible)
  }

  function createTask() {
    router.push('/create-task')
  }

  return (
    <VStack bg='#011323' flex={1}>
      <Header />
      <ScrollView mt={5} showsVerticalScrollIndicator={false}>
        <VStack space={5} mx={4} pt={10} pb={20}>
          {tasks.map(item => (
            <Task key={item.id} data={item} />
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

