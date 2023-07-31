import { IconType } from 'react-icons';
import { AiOutlineBarChart, AiOutlineMedicineBox } from 'react-icons/ai';
import { BiBox, BiGitPullRequest } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';
import { CgProfile, CgUserList } from 'react-icons/cg';
import { FiHome, FiUsers } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { RiDashboardLine } from 'react-icons/ri';
import { ImUsers } from 'react-icons/im';

export interface IRouteItem {
  label: string;
  // subLabel?: string;
  // children?: Array<IRouteItem>;
  href: string;
  icon: IconType;
  type: 'child' | 'parent';
}

export const ROUTING_PAGES: any = {
  admin: [
    {
      label: 'Home',
      href: '/admin/beranda',
      icon: FiHome,
      type: 'parent',
    },
    {
      label: 'Manejemen Pengguna',
      href: '/admin/manajemen-pengguna',
      icon: ImUsers,
      type: 'parent',
    },
    {
      label: 'Manejemen Katalog',
      href: '/admin/manajemen-katalog',
      icon: RiDashboardLine,
      type: 'parent',
    },
    {
      label: 'Permintaan Buku',
      href: '/admin/permintaan-buku',
      icon: BiGitPullRequest,
      type: 'parent',
    },
    {
      label: 'Profile',
      href: '/admin/profile',
      icon: CgProfile,
      type: 'parent',
    },
  ],
  prodi: [],
};
