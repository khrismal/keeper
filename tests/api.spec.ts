/*
api.spec.ts

API tests, part of Keeper test project
*/

import { test, expect } from "@playwright/test";
import { postData } from "./helpers.ts";

const baseURL = "https://magento.softwaretestingboard.com/rest/default/V1";
const API_TOKEN = "cdxf96vcah8pbivc3zzrshd8t15ikua5";

test("Generate New User", async ({ request }) => {
  const response = await request.post(`${baseURL}/customers`, {
    data: postData,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log("Response data:", data);
  console.log(
    "Expecting " + data.email + " to be the same as " + postData.customer.email
  );
  expect(data.email === postData.customer.email);
});
