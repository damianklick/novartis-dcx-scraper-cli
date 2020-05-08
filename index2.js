//Modules
const inquirer = require("inquirer");
const path = require("path");
const sites = require("./config.json");
const scraper = require("./functions");

//object for scrape function
const scrapeObj = {
    kinetiqUrl: "kinetiqurl.com",
    newDate: (new Date()).toString(),
    configObj: sites,
    root: path.join(__dirname + "/"),
    ssmDir: "./screenshotmap",
    ssmOrigin: "",
    ssmDest: "./screenshotmap.csv",
    selectedBrand: "",
    selectedIndex: "",
    selectedName: "",
    selectedType: "",
    selectedUrl: "",
    brandDir: "",
    typeDir: "",
    replacementRules: {
        rule1: "<input*.*__RequestVerificationToken*.*>",
        rule2: "<script*.*adobetrackingdb*.*/script>",
        rule3: "<script*.*assets\.adobe*.*/script>",
        rule4: "<script*.*window\.NREUM*.*/script>",
        rule5: "<script*.*_satellite*.*/script>"
    }
};

//first question
inquirer
    .prompt([
        {
            type: "list",
            name: "brand",
            message: "Please select a brand:",
            choices: scraper.brandsArrBuilder(scrapeObj.configObj["products"]),
        },
    ])
    .then(answers => {
        console.log(`Your choice: ${answers.brand}`);
        scrapeObj.selectedBrand = answers.brand;

        //second question
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "site",
                    message: "Please select a site:",
                    choices: scraper.sitesArrBuilder(scrapeObj.configObj["products"], scrapeObj.selectedBrand),
                }
            ])
            .then(answers => {
                console.log(`Your choice: ${answers.site}`);
                scrapeObj.selectedIndex = parseInt(answers.site.split("---")[0].split("ID: ")[1]);
                scrapeObj.selectedType = scrapeObj.configObj["products"][scrapeObj.selectedIndex]["type"];
                scrapeObj.selectedName = scrapeObj.configObj["products"][scrapeObj.selectedIndex]["name"];
                scrapeObj.selectedUrl = scrapeObj.configObj["products"][scrapeObj.selectedIndex]["url"];

                //third question
                inquirer
                    .prompt([
                        {
                            type: "list",
                            name: "currentUrl",
                            message: `The last scraped URL for this site is: ${scrapeObj.selectedUrl}, do you want to use the same one?`,
                            choices: ["Yes, use the same URL", "No, provide a new URL"]
                        }
                    ])
                    .then(answers => {

                        scrapeObj.ssmOrigin = `${scrapeObj.ssmDir}/${scrapeObj.selectedBrand}-${scrapeObj.selectedName}-${scrapeObj.selectedType}.csv`
                        scrapeObj.brandDir = `_sites/${scrapeObj.selectedBrand}`;
                        scrapeObj.typeDir = `${scrapeObj.brandDir}/${scrapeObj.selectedType}`;

                        if (answers.currentUrl === "Yes, use the same URL") {
                            scraper.startScrapeProcess(scrapeObj); //Scraping process starts

                        }
                        else {

                            //fourth question (optional)
                            inquirer
                                .prompt([
                                    {
                                        type: "input",
                                        name: "newUrl",
                                        message: "Enter the new URL to be scraped (don't include http://, https://, or trailing slash (/)"
                                    }
                                ])
                                .then(answers => {
                                    scrapeObj.selectedUrl = answers.newUrl;
                                    scraper.startScrapeProcess(scrapeObj); //Scraping process starts
                                })
                        };
                    });
            });
    });