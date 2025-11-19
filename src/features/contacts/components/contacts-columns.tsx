import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { type Contact } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { IconChevronRight } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

export const columns: ColumnDef<Contact>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Avatar className='h-8 w-8'>
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${row.original.name}`}
            alt={row.original.name}
          />
          <AvatarFallback>{row.original.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <Link to='/contacts/$contactId' params={{ contactId: row.original.id }}>
          <span>{row.getValue('name')}</span>
        </Link>
      </div>
    ),
  },
  {
    id: 'details',
    cell: ({ row, table }) => {
      const { onSelectContact, selectedContact } = table.options.meta as {
        onSelectContact: (contact: Contact | null) => void
        selectedContact: Contact | null
      }
      const isSelected = selectedContact?.id === row.original.id
      console.log(isSelected);
      

      return (
        <Button
          variant='ghost'
          size='icon'
          onClick={() =>
            onSelectContact(isSelected ? null : row.original)
          }
        >
          <IconChevronRight
            className={cn('h-5 w-5 transform transition-transform', {
              'rotate-180': isSelected,
            })}
          />
        </Button>
      )
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
  },
  {
    accessorKey: 'mobile',
    header: 'Mobile',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type: string = row.getValue('type')
      return (
        <Badge variant='secondary'>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      )
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tags' />
    ),
    cell: ({ row }) => {
      const tags: string[] = row.getValue('tags')
      const contactTagStyles =
        'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'
      return (
        <div className='flex flex-wrap gap-1'>
          {tags.map((tag) => (
            <Badge key={tag} className={contactTagStyles}>
              {tag}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowValue: string[] = row.getValue(id)
      const filterValue: string[] = value
      return filterValue.some((val) => rowValue.includes(val))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
