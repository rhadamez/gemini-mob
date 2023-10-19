import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'
import { darken } from 'polished'

type Props = IButtonProps & {
  text: string
}

export function Button({ text,...rest }: Props) {
  return (
    <NativeBaseButton
      borderRadius={30}
      bgColor={'#f6b312'}
      _pressed={{
        bgColor: darken(0.2, '#f6b312')
      }}
      {...rest}>
        <Text color='#000' fontSize='md' bold>{text}</Text>
    </NativeBaseButton>
  );
}

