import { Box, Text, VStack } from 'native-base'
import { DateTime } from 'luxon'
import { ActionButton } from './ActionButton'
import { AntDesign } from '@expo/vector-icons'

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
    <VStack borderColor={'#f6b312'} borderWidth={1}>
      <Box bg='#f6b312' justifyContent={'center'} p={1}>
        <Text color='#011323' fontSize={'md'} bold>{data.formattedDate.created}</Text>
      </Box>
      <Box justifyContent={'center'} p={2}>
        <Text color='#fff'>{data.description}</Text>
      </Box>
      <Box p={1}>
        <ActionButton
          color='#810000'
          icon={() => <AntDesign color={'#fff'} name='delete' size={22} />}
          handleAction={handleDeleteTask} />
      </Box>
    </VStack>
  );
}

