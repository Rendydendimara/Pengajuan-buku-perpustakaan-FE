import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  CloseButton,
  createStandaloneToast,
  Drawer,
  DrawerContent,
  Flex,
  FlexProps,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  VStack,
  Image as ChakraImage,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { ReactNode, ReactText, useEffect, useState } from 'react';
import { IconType } from 'react-icons';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillBug, AiFillCloseCircle } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { FaTelegramPlane } from 'react-icons/fa';
import { getLocal, setLocal } from '@/lib/LocalStorage/localStorage';
import { LOCAL_USER_TYPE } from '@/constant';
import { IRouteItem, ROUTING_PAGES } from '@/constant/route';
import { shimmer, toBase64 } from '@/lib/ImageOptimization';

interface IProps {
  children: ReactNode;
}
// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const AppTemplate: React.FC<IProps> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH='100vh'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box overflowX='scroll' minH='100vh' ml={{ base: 0, md: 60 }} p='2'>
        {props.children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const userType = 'admin'; //getLocal(LOCAL_USER_TYPE);

  return (
    <Box
      overflowY='scroll'
      transition='3s ease'
      bg='gray.200'
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      px='2'
      py='4'
      h='full'
      {...rest}
    >
      <Flex
        h='10'
        display={{ base: 'flex', md: 'none' }}
        alignItems='center'
        mx='8'
        justifyContent='space-between'
      >
        <CloseButton onClick={onClose} />
      </Flex>
      <Box>
        <ChakraImage src='/images/logo.png' style={{ borderRadius: '100%' }} />
      </Box>
      {ROUTING_PAGES[userType].map((route: IRouteItem, index: number) => (
        <Box my='3' key={index}>
          {index + 1 === ROUTING_PAGES[userType].length ? (
            <Flex justifyContent='flex-start' w='full' mt='30' key={index}>
              <Box w='full' ml={route.type === 'child' ? '20px' : '0'}>
                <NavItem icon={route.icon} href={route.href}>
                  {route.label}
                </NavItem>
              </Box>
            </Flex>
          ) : (
            <Flex justifyContent='flex-start' w='full' key={index}>
              <Box w='full' ml={route.type === 'child' ? '20px' : '0'}>
                <NavItem icon={route.icon} href={route.href}>
                  {route.label}
                </NavItem>
              </Box>
            </Flex>
          )}
        </Box>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  const [activeRoute, setActiveRoute] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router) {
      const pathname = router.pathname.split('/')[2];
      setActiveRoute(pathname);
    }
  }, [router]);

  return (
    <Link
      href={href}
      // style={{ textDecoration: 'none' }}
      // _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='2'
        w='full'
        mx='2'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        // bgColor={
        //   activeRoute === href.split('/')[2] ? 'green.400' : 'transparent'
        // }
        // color={activeRoute === href.split('/')[2] ? 'white' : 'initial'}
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='22'
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const userType = getLocal(LOCAL_USER_TYPE);
  const dispatch = useDispatch();
  const toast = createStandaloneToast();

  const handleLogout = async () => {
    setLocal(LOCAL_USER_TYPE, '');
    Router.replace('/login');
    // if (user?.userType === 'penjual') {
    //   const res = await ApiPenjualLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // } else if (user?.userType === 'adminProdi') {
    //   const res = await ApiAdminProdiLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // } else if (user?.userType === 'adminUmum') {
    //   const res = await ApiAdminUmumLogout();
    //   if (res.status === 200) {
    //     dispatch(actionResetUser());
    //     localCookieClearToken();
    //     setLocal(LOCAL_USER_TYPE, '');
    //     Router.replace('/access-type');
    //   } else {
    //     toast.toast({
    //       status: 'error',
    //       duration: 5000,
    //       title: 'Error',
    //       description: res.data.message,
    //       position: 'bottom-right',
    //     });
    //   }
    // }
  };

  // useEffect(() => {
  //   const userType = getLocal(LOCAL_USER_TYPE);
  //   // const userConver = convertUser()
  //   setUser(userType);
  // }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      display='none'
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Text
        display={{ base: 'none', md: 'flex' }}
        fontSize='xl'
        textAlign='left'
        fontFamily='monospace'
        fontWeight='bold'
      >
        {userType}
      </Text>

      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize='2xl'
        fontFamily='monospace'
        fontWeight='bold'
      >
        Logo
      </Text> */}

      {/* <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Image
                  src={'/images/user.png'}
                  width='40'
                  height='40'
                  placeholder='blur'
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 700)
                  )}`}
                  objectFit='contain'
                  objectPosition='center'
                  priority
                  alt='user image'
                  style={{ borderRadius: '100%' }}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>FULLNAME</Text>
                  <Text
                    fontSize='xs'
                    color='gray.600'
                    textTransform='capitalize'
                  >
                    {userType}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack> */}
    </Flex>
  );
};

export default AppTemplate;
