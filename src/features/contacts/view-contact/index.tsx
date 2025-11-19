import { useParams } from '@tanstack/react-router'
import { contacts } from '../data/contacts'
import { TwoColumnLayout } from '@/components/layout/two-column-layout'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { MoreVertical, Pencil } from 'lucide-react'
import { useState } from 'react'
import { MultiSelect } from '@/components/ui/multi-select'

export function ViewContact() {
  const { contactId } = useParams({ from: '/_authenticated/contacts/$contactId' })
  const contact = contacts.find((c) => c.id === contactId)
  const [contactState, setContactState] = useState(contact)
  const [isEditingTags, setIsEditingTags] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>(
    contactState?.tags || []
  )

  if (!contactState) {
    return <div>Contact not found</div>
  }

  const sidebarNavItems = [
    {
      title: 'Recent Tasks',
      href: `/contacts/${contactId}/tasks`,
      icon: <></>,
    },
    {
      title: 'Recent Estimates',
      href: `/contacts/${contactId}/estimates`,
      icon: <></>,
    },
    { title: 'Rewards', href: `/contacts/${contactId}/rewards`, icon: <></> },
    {
      title: 'Statement',
      href: `/contacts/${contactId}/statement`,
      icon: <></>,
    },
    { title: 'Log', href: `/contacts/${contactId}/log`, icon: <></> },
  ]

  const handleSaveTags = () => {
    // In a real app, you would save the tags to the server here.
    setContactState({ ...contactState, tags: selectedTags })
    setIsEditingTags(false)
  }

  const handleCancelEditTags = () => {
    setSelectedTags(contactState.tags)
    setIsEditingTags(false)
  }

  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='mx-10' fluid>
        <TwoColumnLayout
          title={`Contact / ${contactState.name}`}
          description=''
          sidebarNavItems={sidebarNavItems}
        >
          <Card className='mb-4'>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4'>
                  <div>
                    <CardTitle className='mb-2'>Status</CardTitle>
                    <Badge>Active</Badge>
                  </div>
                  <div>
                    <CardTitle className='mb-2'>#ctid</CardTitle>
                    <p>{contactState.id}</p>
                  </div>
                  <div>
                    <CardTitle className='mb-2'>E-mail</CardTitle>
                    <p>{contactState.email}</p>
                  </div>
                  <div>
                    <CardTitle className='mb-2'>Mobile</CardTitle>
                    <p>{contactState.mobile}</p>
                  </div>
                  <div className={isEditingTags ? 'col-span-2' : ''}>
                    <div className='flex items-center gap-2 mb-2'>
                      <CardTitle>Tags</CardTitle>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => setIsEditingTags(true)}
                      >
                        <Pencil className='h-4 w-4' />
                      </Button>
                    </div>
                    {isEditingTags ? (
                      <div className='flex flex-col gap-2'>
                        <MultiSelect
                          options={[
                            { label: 'Work', value: 'work' },
                            { label: 'Friend', value: 'friend' },
                            { label: 'Family', value: 'family' },
                            { label: 'Client', value: 'client' },
                          ]}
                          selected={selectedTags}
                          onChange={(selected) => setSelectedTags(selected)}
                          placeholder='Select tags'
                          className='w-full'
                        />
                        <div className='flex gap-2'>
                          <Button onClick={handleSaveTags}>Save</Button>
                          <Button
                            variant='outline'
                            onClick={handleCancelEditTags}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className='flex flex-wrap gap-1'>
                        {contactState.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='icon'>
                      <MoreVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>New Task</DropdownMenuItem>
                    <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                    <DropdownMenuItem>Delete Contact</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>
        </TwoColumnLayout>
      </Main>
    </>
  )
}
