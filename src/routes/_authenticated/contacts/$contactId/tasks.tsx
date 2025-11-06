import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/contacts/$contactId/tasks')({
  component: Tasks,
})

function Tasks() {
  return (
    <div>
      Hello "/_authenticated/contacts/$contactId/tasks"!
    </div>
  )
}
