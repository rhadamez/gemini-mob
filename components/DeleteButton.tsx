import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  icon: any
}

export function DeleteButton({ icon:Icon, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Icon />
    </TouchableOpacity>
  );
}

