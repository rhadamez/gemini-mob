import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({...rest}: IInputProps) {
	return(
		<NativeBaseInput
			bg='#fff'
			h={10}
			px={4}
			borderWidth={0}
			fontSize='md'
			color='#000'
			fontFamily='body'
			mb={4}
			placeholderTextColor='gray.500'
			_focus={{
				bg:'#fff',
				borderWidth: 1,
			}}
			{...rest}
		/>
	)
}
