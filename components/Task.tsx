import { Box, Text, HStack, VStack, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { DeleteButton } from './DeleteButton'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { useTasks } from '../context/TasksContext'

export interface TaskProps {
  id: number
  description: string
  done: boolean
  createdAt: Date
  updatedAt: Date
}

export interface TaskFormattedProps extends TaskProps {
  formattedDate: {
    created: string
    updated: string
  }
}

interface Props {
  data: TaskFormattedProps
}

export function Task({ data }: Props) {
  const router = useRouter()
  const { deleteTask } = useTasks()

  async function handleDeleteTask() {
    await deleteTask(data.id)
  }

  function updateItem() {
    router.push({ pathname: '/create-task', params: data } as any)
  }

  return (
    <HStack
      bgColor='gray.800'
      borderColor='gray.800'
      borderWidth={1}
      borderRadius={10}
      alignItems='center'
      p={3}
      >
      <Box justifyContent={'center'} p={1}>
        <Icon as={AntDesign} name='checkcircle' color={data.done ? 'green.500' : 'gray.500'} size={25}/>
      </Box>
      <TouchableOpacity onPress={updateItem} style={{flex: 1}}>
        <VStack justifyContent={'center'} p={2}>
          <Text color='#fff' fontSize={'md'} bold>{data.description}</Text>
          <Text color='gray.400'>{data.formattedDate.created}</Text>
        </VStack>
      </TouchableOpacity>
        <DeleteButton
          icon={() => (
            <Icon
              as={AntDesign}
              name='delete'
              color='red.500'
              size={25} />)
            }
          onPress={handleDeleteTask} />
    </HStack>
  );
}

