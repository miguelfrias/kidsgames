import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Random Letter', href: '/random-letter', current: false },
  { name: 'Random Color', href: '/random-color', current: false },
  { name: 'Tic Tac Toe', href: '/tic-tac-toe', current: false },
  { name: 'Draw', href: '/draw', current: false },
  { name: 'PopIt', href: '/popit', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open, close }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined} to={item.href}>{item.name}</Link>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link key={item.name} className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                )}
                onClick={() => close()}
                aria-current={item.current ? 'page' : undefined} to={item.href}>{item.name}</Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
