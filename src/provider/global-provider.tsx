import { Box, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

export interface IGlobalContextProps {
  loading: boolean;
  showToast: ({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error' | undefined;
  }) => void;
  children: React.ReactNode;
}

export const GlobalContext = React.createContext<IGlobalContextProps>(
  {} as IGlobalContextProps
);

export const useGlobalContext = () => React.useContext(GlobalContext);

const blackBox = {
  initial: {
    height: '100%',
    bottom: 0,
  },
  animate: {
    height: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

const textContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
};

const text = {
  initial: {
    y: 40,
  },
  animate: {
    y: 80,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
};

export const GlobalProvider = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  const toast = useToast();
  const showToast = ({
    title,
    message,
    type,
  }: {
    title: string;
    message: string;
    type: 'info' | 'warning' | 'success' | 'error' | undefined;
  }) => {
    toast({
      title,
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
    });
  };

  const InitialTransition = () => {
    // Scroll user to top to avoid showing the footer
    // React.useState(() => {
    typeof window !== 'undefined' && window.scrollTo(0, 0);
    // }, []);

    return (
      <Box
        as={motion.div}
        bgColor='green.700'
        className='absolute z-50 flex items-center justify-center w-full'
        initial='initial'
        animate='animate'
        variants={blackBox}
        onAnimationStart={() => document.body.classList.add('overflow-hidden')}
        onAnimationComplete={() =>
          document.body.classList.remove('overflow-hidden')
        }
      >
        <motion.svg
          variants={textContainer}
          className='absolute z-50 flex  w-full'
        >
          <pattern
            id='pattern'
            patternUnits='userSpaceOnUse'
            width={750}
            height={800}
            className='text-white'
          >
            <rect className='w-full h-full fill-current' />
            <motion.rect
              variants={text}
              className='w-full h-full text-gray-600 fill-current'
            />
          </pattern>
          <text
            className='text-4xl font-bold'
            textAnchor='middle'
            x='50%'
            y='50%'
            style={{ fill: 'url(#pattern)' }}
          >
            PENGAJUAN BUKU PERPUSTAKAAN
          </text>
        </motion.svg>
      </Box>
    );
  };

  useEffect(() => {
    if (loading === false) {
      document.body.classList.remove('overflow-hidden');
    }
  }, [loading]);

  return (
    <GlobalContext.Provider value={{ loading, showToast, children }}>
      <motion.section>
        {loading ? (
          <Box h={'100vh'} w={'100%'} display='flex' justifyContent={'center'}>
            <InitialTransition />
          </Box>
        ) : (
          children
        )}
      </motion.section>
    </GlobalContext.Provider>
  );
};
