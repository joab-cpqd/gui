const env = require('./env.conf');

const config = {
    tests: './Scenarios/*_test.js',
    clearDb: false,
    output: './output',
    multiple: {
        parallel: {
            chunks: 1,
        },
    },
    helpers: {
        Puppeteer: {
            url: env.dojot_host,
            keepCookies: true,
            fullPageScreenshots: true,
            restart: false,
            keepBrowserState: true,
            show: true,
            waitForNavigation: ['networkidle2', 'domcontentloaded'],
            chrome: {
                args: ['--no-sandbox', '--start-maximized', '--start-fullscreen'],
                handleSIGTERM: false,
                handleSIGHUP: false,
                defaultViewport: {
                    width: 1700,
                    height: 1080,
                },
            },
        },
        REST: {
            endpoint: env.dojot_host,
        },
    },
    include: {
        I: './steps_file.js',
        Template: './PageObject/Template.js',
        Flow: './PageObject/Flow.js',
        Device: './PageObject/Device.js',
        Notification: './PageObject/Notification.js',
    },
    plugins: {
        allure: {},
        autoDelay: {
            enabled: true,
        },
        autoLogin: {
            enabled: true,
            saveToFile: false,
            inject: 'login',
            users: {
                admin: {
                    login: (I) => {
                        I.loginAdmin(I, config.clearDb);
                    },
                    check: (I) => {
                        I.amOnPage(`${env.dojot_host}/#/`);
                        I.see('admin');
                    },
                },
            },
        },
    },
    bootstrap: null,
    mocha: {},
    name: 'dojot-codecept',
};


module.exports = config;
