import { VStack } from 'native-base'
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useTasks } from '../context/TasksContext';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TaskFormattedProps } from '../components/Task';
import { useEffect } from 'react';

export default function CreateTask() {
  const { addTask, updateTask, tasks } = useTasks()
  const router = useRouter()
  const params = useLocalSearchParams<any>() as TaskFormattedProps

  const schema = yup
  .object({
    description: yup.string().required('Must be required').min(3, 'Must have at least 3 chars')
  })
  .required()

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
    mode: 'all'
	})

  useEffect(() => {
    if(params) {
      setValue('description', params.description)
    }
  }, [])

  async function handleAddTask(data: any) {
    // if(params) {
    //   updateTask({...params, description: data.description})
    // } else {
      await addTask(data.description)
    //}
    //router.back()
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

