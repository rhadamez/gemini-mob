import { VStack } from 'native-base'
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useTasks } from '../context/TasksContext';
import { Controller, useForm } from 'react-hook-form';

export default function CreateTask() {
  const { addTask } = useTasks()

  const { control, handleSubmit, reset, clearErrors, setFocus, formState: { errors } } = useForm({
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
            <Input placeholder='description' onChangeText={onChange} value={value} />
          )}
        />
        <Button text='Add task' onPress={handleSubmit(handleAddTask)} />
      </VStack>
    </VStack>
  );
}

