import { VStack } from 'native-base'
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function CreateTask() {
  return (
    <VStack bg='#011323' flex={1} justifyContent={'center'}>
      <Header />
      <VStack m={5}>
        <Input placeholder='description' />
        <Button text='Add task'/>
      </VStack>
    </VStack>
  );
}

