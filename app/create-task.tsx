import { VStack } from 'native-base'
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useTasks } from '../context/TasksContext';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateTask() {
  const { addTask } = useTasks()

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
    console.log(data)
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

