import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import * as loginPage from "../pages/login";

const authSessionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

// read and parse JSON file
const loпinDataFile = path.resolve(__dirname, "../../playwright/.auth/loginData.json");
const loginData = JSON.parse(fs.readFileSync(loпinDataFile, "utf-8")) as {
    email: string,
    pass: string
}

test('Authenticat', async ({page}) => {
    await page.goto('/login');

    await loginPage.login(page, 
        loginData.email, 
        loginData.pass);

    await loginPage.verifySuccessfulLogin(page);
    await page.context().storageState({ 
        path: authSessionFile
    });
})