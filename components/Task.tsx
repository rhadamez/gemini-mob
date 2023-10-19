import { Box, Text, HStack, VStack, Icon } from 'native-base'
import { DateTime } from 'luxon'
import { AntDesign } from '@expo/vector-icons'
import { DeleteButton } from './DeleteButton'

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
  deleteTask: (id: number) => void
}

export function Task({ data, deleteTask }: Props) {
  const date = DateTime.fromISO(data.createdAt.toISOString());
  const timeAgo = date.toRelative({ base: DateTime.local() })

  function handleDeleteTask() {
    deleteTask(data.id)
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
      <VStack justifyContent={'center'} p={2} flex={1}>
        <Text color='#fff' fontSize={'md'} bold>{data.description}</Text>
        <Text color='gray.400'>{data.formattedDate.created}</Text>
      </VStack>
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

