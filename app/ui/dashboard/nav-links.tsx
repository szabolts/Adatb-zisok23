'use client';

import { MdHome } from "react-icons/md";
import { RiTeamFill } from "react-icons/ri";
import { TbPlayFootball } from "react-icons/tb";
import { GiWhistle } from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
type UserProps = {
    toggle: boolean;
  };


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: MdHome },
  {
    name: 'Csapatok',
    href: '/dashboard/csapatok',
    icon: RiTeamFill,
  },
  { name: 'Játékosok', href: '/dashboard/jatekosok', icon: RiUserFill },
  { name: 'Mérkőzések', href: '/dashboard/merkozesek', icon: GiWhistle },
];

export default function NavLinks( {toggle}: UserProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center gap-4 rounded-full dark:bg-zinc-900 p-2 text-sm font-medium dark:hover:bg-zinc-800 hover:text-blue-600',
              {
                'dark:bg-zinc-800 text-blue-600': pathname === link.href,
              }
            )}
          >
            {/* Ikonok mindig láthatóak */}
            <div className="flex items-center pl-1.5">
              <LinkIcon size={20} />
            </div>

            {/* Link nevek, amelyek csak akkor láthatóak, ha a sideNav ki van nyitva */}
            <div className={`flex-grow transition-opacity duration-500  ${!toggle ? 'opacity-100 delay-100' : 'opacity-0 duration-0'}`}>
              {link.name}
            </div>
          </Link>
        );
      })}
    </>
  );
}
