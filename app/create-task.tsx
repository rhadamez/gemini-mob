import { VStack } from 'native-base'
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useTasks } from '../context/TasksContext';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router';

export default function CreateTask() {
  const { addTask, tasks } = useTasks()
  const router = useRouter()

  const schema = yup
  .object({
    description: yup.string().required('Must be required').min(3, 'Must have at least 3 chars')
  })
  .required()

  const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
    mode: 'all'
	})

  function handleAddTask(data: any) {
    addTask({
        id: tasks.length+1,
        description: data.description,
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    router.back()
  }

  return (
    <VStack bg='#011323' flex={1} justifyContent={'center'}>
      <Header />
      <VStack m={5}>
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value }}) => (
            <Input
              placeholder='description'
              onChangeText={onChange}
              value={value}
              error={errors.description?.message}
              />
          )}
        />
        <Button text='Add task' onPress={handleSubmit(handleAddTask)} />
      </VStack>
    </VStack>
  );
}

