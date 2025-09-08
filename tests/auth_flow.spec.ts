import { test } from '@playwright/test';
import { EmailUtils } from './utils/emailUtils';
import 'dotenv/config';
import { SignUpPage, signUpData } from './pages/signUp';
import { LoginPage } from './pages/login';
import { join, resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync, write } from 'fs';

const testSignUp = process.env.SIGN_UP_FLOW;

test('Sign up', async ({page}) => {
    console.log(testSignUp);
    test.skip(testSignUp !== 'true', 'Skipping sign up test');

    const emailUtils = new EmailUtils();
    const inbox = await emailUtils.createInbox();

    await page.goto('/signup');

    const signUpPage = new SignUpPage(page);
    await signUpPage.signUp(inbox.emailAddress);
        await signUpPage.completeSignUp();

    const email = await emailUtils.waitForLatesEmail(inbox.id);
    console.log(email);

    //get verification code from email body
    const code = /([0-9]{6})$/.exec(email.body!)![1];
    console.log(`Verification code: ${code}`);

        await signUpPage.addConfirmationCode(code);

        const loginPage = new LoginPage(page);
        await loginPage.login(inbox.emailAddress, signUpData.pass);
        await loginPage.verifySuccessfulLogin();

    // persist login data:
        const loginData = {
            email: inbox.emailAddress,
            pass: signUpData.pass
        }
    const authDir = resolve (__dirname, '../playwright/.auth');
    if (!existsSync(authDir)) {
        mkdirSync(authDir, { recursive: true });
    }
    writeFileSync(
        join(authDir, 'loginData.json'), 
        JSON.stringify(loginData, null, 2) 
    );

})