
import { ContactsActionDialog } from './contacts-action-dialog'
import { useContacts } from './contacts-provider'

export function ContactsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useContacts()
  return (
    <>
      <ContactsActionDialog
        key={'contact-add'}
        open={open === 'add'}
        onOpenChange={() => setOpen(null)}
      />

      {currentRow && (
        <>
          <ContactsActionDialog
            key={`contact-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
