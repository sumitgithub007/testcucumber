import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class RegisterPage {

    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        fName: "input[formcontrolname='firstname']",
        lname: "input[formcontrolname='lastname']",
        userName: "input[formcontrolname='username']",
        password: "input[formcontrolname='password']",
        confirmPassword: "input[formcontrolname='confirmPassword']",
        maleInput: "input[value='Male']",
        femaleInput: "input[value='Female']",
        maleRadioBtn: "//input[contains(@value,'Male')]",
        femaleRadioBtn: "//span[contains(text(),'Female')]",
        regBtn: "button[color='primary']"
    }

    async navigateToRegisterPage() {
        await this.base.goto("https://bookcart.azurewebsites.net/register")
    }


    async registerUser(firstname: string, lastname: string, userName: string,
        password: string, confirmPassword: string,
        gender: string) {
        await this.page.fill(this.Elements.fName, firstname);
        await this.page.fill(this.Elements.lname, lastname);
        // this must be unique always
        await this.enterUsername(userName);
        await this.page.fill(this.Elements.password, password);
        await this.page.fill(this.Elements.confirmPassword, confirmPassword);
        if (gender == "m") {
            await this.page.click(this.Elements.maleRadioBtn);
            await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
        } else {
            await this.page.click(this.Elements.femaleRadioBtn);
            await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
        }
        const regBtn = this.page.locator(this.Elements.regBtn);
        await regBtn.last().click();
    //    await  this.page.waitForLoadState("networkidle");
    //    await  this.page.waitForTimeout(3000);


    }

    async enterUsername(userName: string) {
        await this.page.fill(this.Elements.userName, userName);
        const [response] = await Promise.all([
            this.page.waitForResponse(res => {
                return res.status() == 200
                    &&
                    res.url() == `https://bookcart.azurewebsites.net/api/user/validateUserName/${userName}`
            })
        ]);
        await response.finished();
    }
}
