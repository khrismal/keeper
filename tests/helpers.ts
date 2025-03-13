/*
helpers.ts

Helper functions and data, part of Keeper test project
*/

//Function that generates a random email
export function generateRandomEmail(domain: string = "test.com"): string {
  const randomString = Math.random().toString(36).slice(2, 10);
  return `${randomString}@${domain}`;
}

//Instance of a generated email
const randomEmail = generateRandomEmail();

//Data for the POST API request with generated email
export const postData = {
  customer: {
    email: randomEmail,
    firstname: "Jane",
    lastname: "Doe",
    addresses: [
      {
        defaultShipping: true,
        defaultBilling: true,
        firstname: "Jane",
        lastname: "Doe",
        region: {
          regionCode: "NY",
          region: "New York",
          regionId: 43,
        },
        postcode: "10755",
        street: ["123 Oak Ave"],
        city: "Purchase",
        telephone: "512-555-1111",
        countryId: "US",
      },
    ],
  },
  password: "Password1",
};
