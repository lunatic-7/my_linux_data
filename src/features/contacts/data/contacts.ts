
import { faker } from '@faker-js/faker'

export const contacts = Array.from({ length: 100 }, (_, i) => ({
  id: `contact-${i + 1}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.streetAddress(),
  mobile: faker.phone.number(),
  type: faker.helpers.arrayElement(['individual', 'business']),
  tags: faker.helpers.arrayElements(['work', 'friend', 'family', 'client'], { min: 1, max: 3 }),
}))
