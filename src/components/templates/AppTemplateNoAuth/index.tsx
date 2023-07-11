import { Box, HStack, Text } from '@chakra-ui/layout';
import React, { ReactNode } from 'react';
import { MdOutlineBuildCircle } from 'react-icons/md';
import { IconButton } from '@chakra-ui/button';
import { IS_SHOW_DEVELOP_INFO } from '@/constant';
interface IProps {
  children: ReactNode;
  hideNavbar?: boolean;
}

const AppTemplateNoAuth: React.FC<IProps> = (props) => {
  return (
    <div>
      {/* <Header /> */}
      {props.children}
      {/* <Footer /> */}
      {IS_SHOW_DEVELOP_INFO && (
        <HStack
          bgColor='gray.800'
          spacing='4'
          position='fixed'
          bottom={{ base: '5', md: '10' }}
          left={{ base: '5', md: '10' }}
          p={{ base: '2', md: '4' }}
          borderRadius='8px'
          w='250px'
        >
          <Text fontSize='12px' color='white'>
            Website ini masih dalam pengembangan
          </Text>
          <IconButton
            variant='outline'
            colorScheme='teal'
            aria-label='onDevelop'
            icon={<MdOutlineBuildCircle />}
            size='sm'
            borderRadius='100%'
          />
        </HStack>
      )}
    </div>
  );
};

export default AppTemplateNoAuth;
