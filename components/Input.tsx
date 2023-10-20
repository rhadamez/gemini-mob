import { Input as NativeBaseInput, IInputProps, Text, VStack } from 'native-base'

interface Props extends IInputProps {
	error?: string
}

export function Input({error, ...rest}: Props) {
	return(
		<VStack mb={4}>
				<NativeBaseInput
			bg='#fff'
			h={10}
			px={4}
			borderWidth={0}
			fontSize='md'
			color='#000'
			fontFamily='body'
			placeholderTextColor='gray.500'
			_focus={{
				bg:'#fff',
				borderWidth: 1,
			}}
			{...rest}
		/>
		{error && <Text color='red.400'>{error}</Text>}
		</VStack>
	)
}
