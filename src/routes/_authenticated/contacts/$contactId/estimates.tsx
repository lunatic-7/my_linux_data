import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/contacts/$contactId/estimates',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/contacts/$contactId/estimates"!</div>
}
