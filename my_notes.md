Observations

1. Authentication is not implemented, and there is no authentication, token or any checks there, There is just simple sign in, sign up and sign out page, which takes any credentials and works.

Works

1. Contact page layout DONE
2. Pagination DONE
2. Add contact Dialog DONE
3. Columns names from company website DONE
4. Add Contact, Tags to make it multi select DONE
5. Adding Filters in contact page DONE
6. Edit Contact DONE
7. Delete Contact DONE
8. Authentication DONE
9. Contact section or any section should also expand when we contract the sidebar DONE
10. Remove that JSON popup on form submission, can retain it for development DONE
11. ViewContact section DONE
12. Filters, pgination all will be server side
13. Add 5 options for filter (static will also work) then a More+ button







Updates

10-11-2025

✦ The getContacts function in src/features/contacts/data/api.ts constructs the API request with the following query parameters:

   * `page`: The current page number, derived from pagination.pageIndex + 1.
   * `pageSize`: The number of items to display per page, derived from pagination.pageSize.
   * `filter`: (Optional) A global search string, used for filtering across multiple fields (name, email, address).
   * `type`: (Optional) An array of contact types (e.g., ['individual', 'business']). Each type is appended as a separate type query parameter (e.g.,
     ?type=individual&type=business).
   * `tags`: (Optional) An array of tags (e.g., ['work', 'friend']). Each tag is appended as a separate tags query parameter (e.g., ?tags=work&tags=friend).

  For example, a request might look like this:
  http://localhost:8000/api/contacts?page=1&pageSize=10&filter=john&type=individual&tags=work


