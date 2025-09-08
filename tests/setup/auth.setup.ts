import path from "path";
import fs from "fs";
import { test } from "@playwright/test";
import { LoginPage} from "../pages/login";

const authSessionFile = path.resolve(__dirname, '../../playwright/.auth/user.json');

// read and parse JSON file
const loпinDataFile = path.resolve(__dirname, "../../playwright/.auth/loginData.json");
const loginData = JSON.parse(fs.readFileSync(loпinDataFile, "utf-8")) as {
    email: string,
    pass: string
}

test('Authenticate', async ({page}) => {
    await page.goto('/login');

    const loginPage = new LoginPage(page);
    await loginPage.login(
        loginData.email,
        loginData.pass
    );

    await loginPage.verifySuccessfulLogin();
    await page.context().storageState({
        path: authSessionFile
    });
})