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
import {
  ApiChangeStatusPengajuanBuku,
  ApiGetListPengajuanBuku,
} from '@/api/pengajuanBuku';
import { getProdiName } from '@/utils';
import { getColorStatus } from '@/utils/colors';
import { includes, some } from 'lodash';

interface IDataRow {
  id: string;
  no: number;
  namaPengajuan: string;
  ajukanPada: string;
  prodi: string;
  jumlah: number;
  aksi: string;
  status: string;
}

// interface IReduxStateWorkspace {
//   user?: IUser;
// }

const PermintaanBukuAdmin: NextPage = () => {
  const router = useRouter();
  const { toast } = createStandaloneToast();
  const [dataPengguna, setDataPengguna] = useState<IDataRow[]>([]);
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
        Header: 'Nama Pengajuan',
        accessor: 'namaPengajuan',
      },
      {
        Header: 'Prodi',
        accessor: 'prodi',
      },
      {
        Header: 'Ajukan Pada',
        accessor: 'ajukanPada',
      },
      {
        Header: 'Jumlah Buku',
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
  const [searching, setSearching] = useState('');

  const onChangeSearching = (e: any) => {
    setSearching(e.target.value);
  };

  const filteredData = () => {
    let data = dataPengguna;
    if (searching) {
      data = data.filter((data) => {
        const haystack = [data.namaPengajuan.toLowerCase()];
        return some(haystack, (el) => includes(el, searching.toLowerCase()));
      });
    }

    return data;
  };

  const getListPengguna = async () => {
    const res = await ApiGetListPengajuanBuku();
    if (res.status === 200) {
      let temp: IDataRow[] = [];
      res.data.data.forEach((dt: any, i: number) => {
        temp.push({
          id: dt._id,
          no: i + 1,
          namaPengajuan: dt.dosenProdi.namaLengkap,
          ajukanPada: moment(new Date(dt.createdAt)).format('L'),
          prodi: getProdiName(dt.dosenProdi.programStudi),
          jumlah: dt.buku.length + dt.bukuLink.length,
          aksi: dt._id,
          status: dt.status,
        });
      });
      setDataPengguna(temp);
    } else {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: res.data.message,
        position: 'bottom-right',
      });
    }
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
          <Text fontWeight='700' color='gray.700' fontSize='2xl'>
            Permintaan Buku
          </Text>
          <Box my='4'>
            <Flex w='full' justifyContent='flex-end'>
              <Box>
                <FormLabel>Cari nama pengajuan</FormLabel>
                <InputGroup w='500px' size='md'>
                  <Input
                    placeholder='Cari nama pengajuan...'
                    onChange={onChangeSearching}
                    value={searching}
                  />
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
            <Box my='3'>
              <CustomTable
                columns={columns}
                data={filteredData()}
                getListPengguna={getListPengguna}
              />
              <Link href='/admin/permintaan-buku/rekapan-permintaan-buku'>
                <Button colorScheme='blue' size='sm' my='4'>
                  Lihat Semua Rekapan
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </AppTemplate>
    </Layout>
  );
};

// export default privateRouteAdminProdi(PermintaanBukuAdmin);
export default PermintaanBukuAdmin;

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
  const { toast } = createStandaloneToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] =
    useState<'reject' | 'accept' | 'selesai' | ''>('');
  const [loading, setLoading] = useState(false);
  const detailPage = (id: string) => {
    Router.push(`/admin/permintaan-buku/detail/${id}`);
  };
  const [formStatus, setFormStatus] = useState({
    status: '',
    pesan: '',
    id: '',
  });

  const onOpenChangeStatus = (id: string, status: string) => {
    setFormStatus({
      ...formStatus,
      id: id,
      status: status,
    });
    onOpen();
  };

  const editPage = (id: string) => {
    Router.push(`/admin/manajemen-pengguna/tambah?id=${id}&action=edit`);
  };

  const onChangeStatus = async () => {
    setLoading(true);
    const res = await ApiChangeStatusPengajuanBuku({
      status: formStatus.status,
      pesan: formStatus.pesan,
      id: formStatus.id,
    });
    if (res.status === 200) {
      toast({
        status: 'success',
        duration: 5000,
        title: 'Berhasil',
        description: 'Berhasil mengganti status',
        position: 'bottom-right',
      });
      getListPengguna();
      onClose();
    } else {
      toast({
        status: 'error',
        duration: 5000,
        title: 'Error',
        description: res.data.message,
        position: 'bottom-right',
      });
    }
    setLoading(false);
  };

  const changePesan = (e: any) => {
    setFormStatus({
      ...formStatus,
      pesan: e.target.value,
    });
  };

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

                          {row.original.status === 'diproses' && (
                            <>
                              <Button
                                isLoading={loading}
                                onClick={() => {
                                  setModalType('reject');
                                  onOpenChangeStatus(row.original.id, 'ditolak');
                                }}
                                colorScheme='red'
                                size='sm'
                              >
                                Tolak
                              </Button>

                              <Button
                                onClick={() => {
                                  setModalType('accept');
                                  onOpenChangeStatus(row.original.id, 'diterima');
                                }}
                                isLoading={loading}
                                colorScheme='green'
                                size='sm'
                              >
                                Terima
                              </Button>

                            </>
                          )}
                          {row.original.status === 'diterima' && (
                            <>
                              <Button
                                onClick={() => {
                                  setModalType('reject');
                                  onOpenChangeStatus(row.original.id, 'gagal');
                                }}
                                isLoading={loading}
                                colorScheme='red'
                                size='sm'
                              >
                                Gagal
                              </Button>
                              <Button
                                onClick={() => {
                                  setModalType('selesai');
                                  onOpenChangeStatus(row.original.id, 'selesai');
                                }}
                                isLoading={loading}
                                colorScheme='green'
                                size='sm'
                              >
                                Selesai
                              </Button>
                            </>

                          )}
                          <Button
                            onClick={() => detailPage(row.original.id)}
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
                          <Text color='black' fontWeight='700'>
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
            {modalType === 'reject'
              ? 'Tolak'
              : modalType === 'accept'
                ? 'Terima'
                : 'Selesai'}{' '}
            Pengajuan
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Apakah kamu yakin untuk{' '}
              {modalType === 'reject'
                ? 'menolak'
                : modalType === 'accept'
                  ? 'menerima'
                  : 'menyelesaikan'}{' '}
              pengajuan ?
            </Text>
            <FormControl my='5' id='email' isRequired>
              <FormLabel>Pesan Dari Prodi</FormLabel>
              <Textarea
                value={formStatus.pesan}
                onChange={changePesan}
                rows={5}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter gap='2'>
            <Button size='sm' onClick={onChangeStatus} colorScheme='green'>
              Ya, Lanjut
            </Button>
            <Button colorScheme='red' size='sm' onClick={onClose}>
              Batal
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
