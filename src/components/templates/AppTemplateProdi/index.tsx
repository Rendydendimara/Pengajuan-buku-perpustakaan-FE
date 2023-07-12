import { Box, useDisclosure } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}
// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const AppTemplateProdi: React.FC<IProps> = (props) => {
  return <Box p='10'>{props.children}</Box>;
};

export default AppTemplateProdi;
