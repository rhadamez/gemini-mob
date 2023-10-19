import { VStack, Image } from 'native-base'

import image from '../assets/images/logo.png'

export function Header() {
  return (
    <VStack pt={10} alignItems={'center'}>
      <Image source={image} alt='logo' />
    </VStack>
  );
}

