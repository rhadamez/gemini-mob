import { Button, IButtonProps } from 'native-base'
import { darken } from 'polished'

interface Props extends IButtonProps {
  icon: any
}

export function AddButton({ icon:Icon, ...rest }: Props) {
  return (
    <Button
      size={10}
      bgColor='#f6b312'
      _pressed={{
        backgroundColor: darken(0.2, '#f6b312')
      }}
      borderRadius={'full'}
      {...rest}
      >
      <Icon />
    </Button>
  );
}

