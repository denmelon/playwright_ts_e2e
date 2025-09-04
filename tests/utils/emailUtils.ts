import { MailSlurp } from 'mailslurp-client';

export class EmailUtils {

    private mailSlurp: MailSlurp;

    constructor() {
        this.mailSlurp = new MailSlurp({apiKey: process.env.MAIL_SLURP_API_KEY!});
    }

    public async createInbox() {
        const inbox = await this.mailSlurp.inboxController.createInboxWithDefaults();
        return inbox;
    }

    public async waitForLatesEmail(inboxId: string) {
        const inbox = await this.mailSlurp.waitForLatestEmail(inboxId, 30000);
        return inbox;
    }
}