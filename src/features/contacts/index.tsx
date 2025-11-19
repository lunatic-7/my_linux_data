
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ContactsTable } from './components/contacts-table'
import { ContactsDialogs } from './components/contacts-dialogs'
import { ContactsPrimaryButtons } from './components/contacts-primary-buttons'
import { ContactsProvider } from './components/contacts-provider'
import { useState } from 'react'
import { type Contact } from './data/schema'
import { contacts } from './data/contacts'
import { ContactDetailsSidebar } from './components/contact-details-sidebar'

export function Contacts() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  function handleSelectContact(contact: Contact | null) {
    setSelectedContact(contact)
  }

  return (
    <ContactsProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6 mx-10' fluid>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Contacts</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your contacts.
            </p>
          </div>
          <ContactsPrimaryButtons />
        </div>
        <div className='flex flex-1 gap-6'>
          <div
            className={`flex-1 transition-all duration-300 ${
              selectedContact ? 'max-w-[calc(100%-384px)]' : 'max-w-full'
            }`}
          >
            <ContactsTable
              data={{
                data: contacts,
                pageCount: Math.ceil(contacts.length / 10),
              }}
              isLoading={false}
              onSelectContact={handleSelectContact}
              selectedContact={selectedContact}
            />
          </div>
          <ContactDetailsSidebar
            contact={selectedContact}
            onClose={() => handleSelectContact(null)}
          />
        </div>
        <ContactsDialogs />
      </Main>
    </ContactsProvider>
  )
}
