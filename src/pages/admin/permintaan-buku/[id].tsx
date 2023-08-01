import AppTemplate from '@/components/templates/AppTemplate';
import Layout from '@/components/templates/Layout';
import { APP_NAME } from '@/constant';
import { Button, IconButton } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Search2Icon,
} from '@chakra-ui/icons';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Flex, Text } from '@chakra-ui/layout';
import {
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
  Textarea,
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
import { usePagination, useTable, useSortBy } from 'react-table';
import { BiArrowBack } from 'react-icons/bi';
import moment from 'moment';
import { getColorStatus } from '@/utils/colors';

interface IDataRow {
  id: string;
  no: number;
  judulBuku: string;
  ajukanPada: string;
  prodi: string;
  jumlah: number;
  aksi: string;
  status: string;
}

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const AdminDetailPermintaanBuku: NextPage = () => {
  const router = useRouter();

  const [dataPengguna, setDataPengguna] = useState<IDataRow[]>([
    {
      id: new Date().getTime().toString(),
      no: 1,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'diproses',
    },
    {
      id: new Date().getTime().toString(),
      no: 2,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'ditolak',
    },
    {
      id: new Date().getTime().toString(),
      no: 3,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'gagal',
    },
    {
      id: new Date().getTime().toString(),
      no: 4,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'diterima',
    },
    {
      id: new Date().getTime().toString(),
      no: 5,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'selesai',
    },
    {
      id: new Date().getTime().toString(),
      no: 6,
      judulBuku: 'Erlinda kosong sembilan',
      ajukanPada: moment().format('LLLL'),
      prodi: 'TIF',
      jumlah: 10,
      aksi: new Date().getTime().toString(),
      status: 'selesai',
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
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Ajukan Pada',
        accessor: 'ajukanPada',
      },
      {
        Header: 'Prodi',
        accessor: 'prodi',
      },
      {
        Header: 'Judul Buku',
        accessor: 'judulBuku',
      },
      {
        Header: 'Jumlah',
        accessor: 'jumlah',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Aksi',
        accessor: 'aksi',
      },
    ],
    []
  );

  const getListPengguna = async () => {
    // const res = await ApiGetListPenjualAdminProdi({
    //   prodiId: user?.prodi ?? '',
    // });
    // if (res.status === 200) {
    //   let temp: IDataRow[] = [];
    //   for (const data of res.data.data) {
    //     const lapak = await ApiGetLapakByProdiId(data.prodi._id);
    //     temp.push({
    //       id: data._id,
    //       nama: data.fullname,
    //       email: data.email,
    //       prodi: data.prodi.name,
    //       statusAkun: data.isSuspend ?? false,
    //       lapak: lapak?.data?.data?.namaLapak ?? '-',
    //     });
    //   }
    //   setDataPengguna(temp);
    // } else {
    //   showToast({
    //     title: 'Error',
    //     message: res.data.message,
    //     type: 'error',
    //   });
    // }
  };

  const back = () => {
    router.back();
  };

  useEffect(() => {
    getListPengguna();
  }, []);

  return (
    <Layout>
      <Head>
        <title>{APP_NAME} | Admin | Permintaan Buku</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AppTemplate>
        <Box p='4'>
          <Button
            colorScheme='green'
            onClick={back}
            my='5'
            leftIcon={<BiArrowBack />}
            size='md'
          >
            Kembali
          </Button>
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Detail Permintaan Buku Teknik Informatika
          </Text>
          <Box my='4'>
            <Flex w='full' justifyContent='flex-end'>
              <Box>
                <FormLabel>Filter Status</FormLabel>
                <Select
                // name='programStudi'
                // value={form.programStudi}
                // onChange={onChangeProdi}
                >
                  <option value='Ditolak'>Ditolak</option>
                  <option value='Diterima'>Diterima</option>
                  <option value='Diproses'>Diproses</option>
                  <option value='Selesai'>Selesai</option>
                </Select>
              </Box>
            </Flex>

            <Box my='3'>
              <CustomTable
                columns={columns}
                data={dataPengguna}
                getListPengguna={getListPengguna}
              />
              <Flex justifyContent='flex-end' w='full'>
                <Button colorScheme='blue' my='4'>
                  Tambah Ke Rekapan
                </Button>
              </Flex>
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

// export default privateRouteAdminProdi(AdminDetailPermintaanBuku);
export default AdminDetailPermintaanBuku;

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
    useSortBy,
    usePagination
  );

  const gotoDetail = (id: string) => {
    Router.push(`/admin/permintaan-buku/detail/${id}`);
  };

  const editPage = (id: string) => {
    Router.push(`/admin/manajemen-pengguna/tambah?id=${id}&action=edit`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState<'reject' | 'accept' | ''>('');

  // Render the UI for your table
  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  onClick={() => column.toggleSortBy(!column.isSortedDesc)}
                >
                  <Flex alignItems='center' gap='2'>
                    <Text fontWeight='700' color='black'>
                      {column.render('Header')}
                    </Text>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </Flex>
                </Th>
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
                            onClick={() => {
                              setModalType('reject');
                              onOpen();
                            }}
                            colorScheme='red'
                            size='sm'
                          >
                            Tolak
                          </Button>
                          <Button
                            onClick={() => {
                              setModalType('accept');
                              onOpen();
                            }}
                            colorScheme='green'
                            size='sm'
                          >
                            Terima
                          </Button>
                          <Button
                            onClick={() => gotoDetail(row.original.id)}
                            colorScheme='blue'
                            size='sm'
                          >
                            Detail
                          </Button>
                        </Flex>
                      </Td>
                    );
                  } else if (cell.column.Header === 'Status') {
                    return (
                      <Td key={y} {...cell.getCellProps()}>
                        <Center
                          padding='1'
                          borderRadius='10px'
                          alignItems='center'
                          bgColor={getColorStatus(row.original.status)}
                          justifyContent='center'
                        >
                          <Text color='white' fontWeight='700'>
                            {row.original.status}
                          </Text>
                        </Center>
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
          <ModalHeader>
            {modalType === 'reject' ? 'Tolak' : 'Terima'} Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Apakah kamu yakin untuk{' '}
              {modalType === 'reject' ? 'menolak' : 'menerima'} pengajuan ?
            </Text>
            <FormControl my='5' id='email' isRequired>
              <FormLabel>Informasi tambahan</FormLabel>
              <Textarea rows={5} />
            </FormControl>
          </ModalBody>
          <ModalFooter gap='2'>
            <Button onClick={onClose} colorScheme='green'>
              Ya, Lanjut
            </Button>
            <Button colorScheme='red' onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
