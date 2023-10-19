import { Button } from 'native-base'
import { darken } from 'polished'

interface Props {
  icon: any
  color: string
  handleAction: () => void
}

export function ActionButton({ icon:Icon, color, handleAction }: Props) {
  return (
    <Button
      onPress={handleAction}
      bgColor={color}
      size={10}
      borderRadius={'full'}
      _pressed={{
        bgColor: darken(0.1, color)
      }}>
      <Icon />
    </Button>
  );
}

