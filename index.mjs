#!/bin/sh
":"; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import { getFromApi } from "./src/functions/getFromApi.mjs";
import { createPage } from "./src/functions/createPage.mjs";
import { writeTokens } from "./src/functions/writeTokens.mjs";

import dotenv from "dotenv";
dotenv.config();

(async () => {
  const data = await getFromApi("13528-17423561-8349-40ad-b46c-736547602871", "SKkSxha8LQG7lPvIJ2PWHf");
  const tokens = createPage(data.document.children);

  writeTokens(tokens.children, 'json');
  writeTokens(tokens.children, 'js');
  writeTokens(tokens.children, 'd.ts');
})();
