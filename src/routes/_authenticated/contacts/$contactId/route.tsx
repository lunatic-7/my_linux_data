import { createFileRoute } from '@tanstack/react-router'
import { ViewContact } from '@/features/contacts/view-contact'

export const Route = createFileRoute('/_authenticated/contacts/$contactId')({
  component: ViewContact,
})
