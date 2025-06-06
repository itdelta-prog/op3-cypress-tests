const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const makeEmailAccount = require('./cypress/support/email-account new');
const emailApi = require('./cypress/support/emailApi')
require('dotenv').config();

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    lessonSuccess: "Lesson successfully completed!",
    registrationEmail: "QAtest+" + Math.random() * 100 + "@lc.com",
    email:  process.env.EMAIL,
    password: process.env.PASSWORD,
    authEmail: process.env.QA_TEST_LOGIN,
    authPassword: process.env.QA_TEST_PASSWORD,
    leadSecretKey: process.env.BITRIX24_SECRET_KEY,
    leadUrl: process.env.BITRIX24_URL,
    leadUserId: process.env.BITRIX24_USER_ID,
    courseGroupName: "QA Test Course Group",
    curriculumName: "QA Test Curriculum",
    teemName: "Qa Test Team",
    courseName: "QA Test Course",
    lessonCheckboxRadio: "QA Test lesson (checkbox + radio)",
    lessonText: "QA Test lesson (text)",
    lessonTimer: "QA Test lesson (timer)",
    courseUser: 'QA Test',
    questionRadio: "radio question",
    questionText: "text question",
    questionCheckbox: "checkbox question",
    answer1: "answer 1",
    answer2: "answer 2",
    answer3: "answer 3",
    shouldSkipEduTests: 'shouldSkipEduTests',
    categoryName: 'QA Test Category',
    articleName: 'QA Test Article',
    usersArticle: "first-name last-name",
  },
  defaultCommandTimeout: 3000,
  requestTimeout: 30000,
  viewportHeight: 800,
  viewportWidth: 800,
  e2e: {
    baseUrl: process.env.URL,
    prodUrl: 'https://qa-testing.org-online.ru/',
    registerUrl: 'https://app.org-online.ru/register',
    setupNodeEvents: async (on, config) => {
  
      const emailAccount = await makeEmailAccount();
      const account =  await emailApi();


      on('task', {
        getUserEmail() {
          return emailAccount.user;
        },
        getLastEmail(params) {
          return emailAccount.getLastEmail(params);
        },
        sendEmail() {
          return emailAccount.sendEmail();
        },
        getAccount(params) {
          return emailAccount.openMessage(params);
        },
        getTestAccount() {
          return emailAccount.testAccountCreate();
        },
        getEmailAccount() {
          return account.getEmailAccount();
        },
        getEmailData() {
          return account.getEmailData()
        }
      });

      allureWriter(on, config);
      return config;
    },
  },
});
