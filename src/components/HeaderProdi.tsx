import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect, useState } from 'react';
import { Image as ChakraImage } from '@chakra-ui/react';
import { BiSearchAlt2, BiSolidBookBookmark } from 'react-icons/bi';
import Image from 'next/image';
import { shimmer, toBase64 } from '@/lib/ImageOptimization';
import { BsFillCartFill } from 'react-icons/bs';
import Link from 'next/link';
import Router from 'next/router';
import { setLocal } from '@/lib/LocalStorage/localStorage';
import { LOCAL_CART_PRODI, LOCAL_USER_TYPE } from '@/constant';
import { FiChevronDown, FiMenu } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { ICombinedState } from '@/provider/redux/store';

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

interface IProps {
  showOnlyInfoUser?: boolean;
}
interface IReduxStateWorkspace {
  user: any;
  cart: any;
}

const HeaderProdi: React.FC<IProps> = (props) => {
  const { user, cart } = useSelector<ICombinedState, IReduxStateWorkspace>(
    (state) => {
      return {
        user: state.user.user,
        cart: state.cart.cart,
      };
    }
  );
  const [countCart, setCountCart] = useState(0);

  const handleLogout = async () => {
    setLocal(LOCAL_USER_TYPE, '');
    Router.replace('/login');
  };

  const getCountCart = () => {
    if (typeof window !== 'undefined') {
      let cartBuku: any = localStorage.getItem(LOCAL_CART_PRODI);
      if (cartBuku) {
        cartBuku = JSON.parse(cartBuku);
        return cartBuku.length;
      }
      return 0;
    }
    return 0;
  };

  useEffect(() => {
    setCountCart(cart ? cart.length : 0);
  }, [cart]);

  return (
    <Flex p='4' alignItems='center' justifyContent='space-between'>
      <Flex
        gap='10px'
        alignItems='center'
        // display={props.showOnlyInfoUser ? 'none' : 'flex'}
      >
        <Link href='/prodi/dashboard'>
          <Flex gap='10px' alignItems='center'>
            <ChakraImage
              w='100px'
              h='100px'
              src='/images/logo.png'
              style={{ borderRadius: '100%' }}
            />
            <Box>
              <Text fontWeight='bold'>Perpustakaan</Text>
              <Text fontWeight='bold'>Unkriswina</Text>
            </Box>
          </Flex>
        </Link>
      </Flex>
      <Flex gap='20px' alignItems='center' justifyContent='space-between'>
        <Box position='relative'>
          <Link href='/prodi/pengajuan'>
            <BsFillCartFill size={24} />
          </Link>
          <Flex
            position='absolute'
            top='-26px'
            left='10px'
            justifyContent='center'
            alignItems='center'
            padding='2'
            h='30px'
            w='30px'
            bgColor='pink'
            borderRadius='100%'
          >
            <Text color='black'>{countCart}</Text>
          </Flex>
        </Box>
        <Box>
          <Link href='/prodi/manajemen-pengajuan'>
            <BiSolidBookBookmark size={24} />
          </Link>
        </Box>

        <Flex gap='10px' alignItems='center'>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <Box
                display={{ base: 'none', md: 'flex' }}
                alignItems='center'
                gap='10px'
              >
                <Text>{user?.namaLengkap}</Text>
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
              </Box>
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
      </Flex>
    </Flex>
  );
};

export default HeaderProdi;
