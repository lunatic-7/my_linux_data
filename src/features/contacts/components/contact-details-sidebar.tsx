
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Contact } from '../data/schema'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import {
  IconMail,
  IconPhone,
  IconX,
  IconMapPin,
} from '@tabler/icons-react'

interface ContactDetailsSidebarProps {
  contact: Contact | null
  onClose: () => void
}

export function ContactDetailsSidebar({
  contact,
  onClose,
}: ContactDetailsSidebarProps) {
  if (!contact) return null

  return (
    <div
      className={`transform transition-all duration-300 ${
        contact ? 'w-96' : 'w-0'
      } overflow-hidden`}
    >
      <Card className='h-full'>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Contact Details</CardTitle>
          <Button variant='ghost' size='icon' onClick={onClose}>
            <IconX className='h-5 w-5' />
          </Button>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <div className='flex flex-col items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${contact.name}`}
                alt={contact.name}
              />
              <AvatarFallback>
                {contact.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className='text-center'>
              <h3 className='text-xl font-bold'>{contact.name}</h3>
            </div>
          </div>

          <Separator />

          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <IconMail className='h-5 w-5 text-muted-foreground' />
              <a
                href={`mailto:${contact.email}`}
                className='text-sm hover:underline'
              >
                {contact.email}
              </a>
            </div>
            <div className='flex items-center gap-3'>
              <IconPhone className='h-5 w-5 text-muted-foreground' />
              <span className='text-sm'>{contact.mobile}</span>
            </div>
            <div className='flex items-center gap-3'>
              <IconMapPin className='h-5 w-5 text-muted-foreground' />
              <span className='text-sm'>{contact.address}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className='mb-2 text-sm font-medium'>Tags</h4>
            <div className='flex flex-wrap gap-2'>
              {contact.tags.map((tag) => (
                <Badge key={tag} variant='secondary'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* <div className='flex justify-center gap-4'>
            <Button variant='outline' size='icon' asChild>
              <a
                href={`https://wa.me/${contact.mobile.replace(/\D/g, '')}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                <IconWhatsapp />
              </a>
            </Button>
          </div> */}

          <Separator />

          <Button asChild className='w-full'>
            <Link to='/contacts/$contactId' params={{ contactId: contact.id }}>
              View Full Profile
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
