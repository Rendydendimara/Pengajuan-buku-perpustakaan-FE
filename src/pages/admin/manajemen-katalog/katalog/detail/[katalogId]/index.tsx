import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { Button, IconButton } from '@chakra-ui/button';
import { FormLabel } from '@chakra-ui/form-control';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import {
  createStandaloneToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Select } from '@chakra-ui/select';
import { findIndex } from 'lodash';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useState, useMemo, useEffect } from 'react';
// import { useEffect, useMemo, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';
import { BiArrowBack } from 'react-icons/bi';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';
import { ApiGetDetailKatalogBuku } from '@/api/katalogBuku';
import { ApiDeleteBuku, ApiGetListBuku } from '@/api/buku';

interface IDataRow {
  id: string;
  no: number;
  judulBuku: string;
  penulis: string;
  penerbit: string;
  tanggalUpload: string;
  tahun: string;
  aksi: string;
}

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const ListBukuKatalogAdmin: NextPage = () => {
  const router = useRouter();
  const { toast } = createStandaloneToast();
  const [dataPengguna, setDataPengguna] = useState<IDataRow[]>([
    {
      id: new Date().getTime().toString(),
      no: 1,
      judulBuku: 'Judul buku',
      penulis: 'Penulis',
      penerbit: 'Penerbit',
      tanggalUpload: moment().format('L'),
      tahun: new Date().getFullYear().toString(),
      aksi: new Date().getTime().toString(),
    },
    {
      id: new Date().getTime().toString(),
      no: 2,
      judulBuku: 'Judul buku',
      penulis: 'Penulis',
      penerbit: 'Penerbit',
      tanggalUpload: moment().format('L'),
      tahun: new Date().getFullYear().toString(),
      aksi: new Date().getTime().toString(),
    },
    {
      id: new Date().getTime().toString(),
      no: 3,
      judulBuku: 'Judul buku',
      penulis: 'Penulis',
      penerbit: 'Penerbit',
      tanggalUpload: moment().format('L'),
      tahun: new Date().getFullYear().toString(),
      aksi: new Date().getTime().toString(),
    },
    {
      id: new Date().getTime().toString(),
      no: 4,
      judulBuku: 'Judul buku',
      penulis: 'Penulis',
      penerbit: 'Penerbit',
      tanggalUpload: moment().format('L'),
      tahun: new Date().getFullYear().toString(),
      aksi: new Date().getTime().toString(),
    },
  ]);
  // const { showToast } = useGlobalContext();
  // const { user } = useSelector<ICombinedState, IReduxStateWorkspace>(
  //   (state) => {
  //     return {
  //       user: state.user.user,
  //     };
  //   }
  // );
  const columns = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'no',
      },
      // {
      //   Header: 'ID',
      //   accessor: 'id',
      // },
      {
        Header: 'Judul Buku',
        accessor: 'judulBuku',
      },
      {
        Header: 'Penulis',
        accessor: 'penulis',
      },
      {
        Header: 'Penerbit',
        accessor: 'penerbit',
      },
      {
        Header: 'Tanggal Upload',
        accessor: 'tanggalUpload',
      },
      {
        Header: 'Tahun',
        accessor: 'tahun',
      },
      {
        Header: 'Aksi',
        accessor: 'aksi',
      },
    ],
    []
  );

  const getListPengguna = async () => {
    const res = await ApiGetListBuku();
    if (res.status === 200) {
      let temp: IDataRow[] = [];
      let i = 0;
      for (const data of res.data.data) {
        i++;
        temp.push({
          no: i,
          id: data._id,
          judulBuku: data.judul,
          penulis: data.penulis,
          penerbit: data.katalog.name,
          tanggalUpload: moment(data.createdAt).format('L'),
          tahun: data.tahunTerbit,
          aksi: data._id,
        });
      }
      setDataPengguna(temp);
    } else {
      toast({
        title: 'Error',
        description: res.data.message,
        status: 'error',
      });
    }
  };

  const back = () => {
    router.back();
  };

  const [catalogData, setCatalogData] = useState<any>();

  const getCatalogName = async (id: string) => {
    const res = await ApiGetDetailKatalogBuku(id);
    if (res.status === 200) {
      setCatalogData(res.data.data);
    } else {
      console.log('back');
      Router.push(`/admin/manajemen-katalog/katalog/`);
    }
  };

  useEffect(() => {
    getListPengguna();
  }, []);

  useEffect(() => {
    const { katalogId }: any = router.query;

    if (katalogId) {
      getCatalogName(katalogId);
    }
  }, [router.query]);

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Manajemen Katalog</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box p='4'>
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Manajemen Buku Katalog | {catalogData?.name}
          </Text>
          <Box my='4'>
            <Flex w='full' justifyContent='flex-end' alignItems='center'>
              <Flex w='full' alignItems='center' gap='15px'>
                <Link
                  href={
                    '/admin/manajemen-katalog/katalog/detail/64eaf73535600cdec6ff9ae9/tambah-buku'
                  }
                >
                  <Button
                    size='sm'
                    rightIcon={<AiOutlinePlus />}
                    colorScheme='blue'
                  >
                    Buku
                  </Button>
                </Link>
                <Link href='/admin/manajemen-katalog/bulk-katalog'>
                  <Button
                    size='sm'
                    rightIcon={<AiOutlinePlus />}
                    colorScheme='purple'
                  >
                    Bulk
                  </Button>
                </Link>
              </Flex>
              <Box>
                <Flex w='full' justifyContent='flex-end'>
                  <Box>
                    <FormLabel>Cari nama</FormLabel>
                    <InputGroup w='500px' size='md'>
                      <Input placeholder='Cari nama...' />
                      <InputRightElement>
                        <IconButton
                          aria-label='cari'
                          // onClick={handleClick}
                          icon={<Search2Icon />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Box my='3'>
              <CustomTable
                columns={columns}
                data={dataPengguna}
                getListPengguna={getListPengguna}
              />
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

// export default privateRouteAdminProdi(ListBukuKatalogAdmin);
export default ListBukuKatalogAdmin;

function CustomTable({ columns, data, getListPengguna }: any) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 2 }
    },
    usePagination
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idSelected, setIdSelected] = useState('');
  const { toast } = createStandaloneToast();
  const router = useRouter();

  const hapus = (id: string) => {
    setIdSelected(id);
    onOpen();
    // Router.push(`/admin/manajemen-pengguna/${id}`);
  };

  const editPage = (id: string) => {
    const katalogId: any = router.query.katalogId;
    Router.push(
      `/admin/manajemen-katalog/katalog/detail/${katalogId}/tambah-buku?id=${id}&action=edit`
    );
  };

  const handleHapusBuku = async () => {
    const res = await ApiDeleteBuku(idSelected);
    if (res.status === 200) {
      toast({
        title: 'Berhasil',
        description: 'Berhasil hapus buku',
        status: 'success',
      });
      getListPengguna();
    } else {
      toast({
        title: 'Gagal',
        description: res.data.message,
        status: 'error',
      });
    }
    onClose();
  };

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <Tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell: any, y: number) => {
                  if (cell.column.Header === 'Aksi') {
                    return (
                      <Td key={y} {...cell.getCellProps()}>
                        <Flex alignItems='center' gap='10px'>
                          <Button
                            size='sm'
                            onClick={() => editPage(row.original.id)}
                            colorScheme='orange'
                          >
                            Ubah
                          </Button>
                          <Button
                            size='sm'
                            onClick={() => hapus(row.original.id)}
                            colorScheme='red'
                          >
                            Hapus
                          </Button>
                        </Flex>
                      </Td>
                    );
                  } else {
                    return (
                      <Td key={y} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  }
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex justifyContent='space-between' m={4} alignItems='center'>
        <Flex>
          <Tooltip label='First Page'>
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label='button'
            />
          </Tooltip>
          <Tooltip label='Previous Page'>
            <IconButton
              aria-label='button'
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems='center'>
          <Text flexShrink='0' mr={8}>
            Page{' '}
            <Text fontWeight='bold' as='span'>
              {pageIndex + 1}
            </Text>{' '}
            of{' '}
            <Text fontWeight='bold' as='span'>
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink='0'>Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value: any) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label='Next Page'>
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label='button'
            />
          </Tooltip>
          <Tooltip label='Last Page'>
            <IconButton
              aria-label='button'
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Buku</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Apakah kamu yakin untuk menghapus buku ?</Text>
              <Text>
                Setelah penghapusan, data buku tidak bisa dilihat lagi
              </Text>
            </Box>
          </ModalBody>
          <ModalFooter gap='2'>
            <Button size='sm' onClick={handleHapusBuku} colorScheme='green'>
              Ya, Lanjut
            </Button>
            <Button size='sm' colorScheme='red' onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}