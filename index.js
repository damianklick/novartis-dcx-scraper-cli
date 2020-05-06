const inquirer = require ("inquirer");
const {exec} = require ("child_process");
const fs = require ("fs");
const path = require("path");
const ora = require("ora");
const sites = require("./config.json");
const date = new Date();

const root = path.join(__dirname + "/");
const rawBrands = sites.products;
const allBrands = [];
const allSites= [];

rawBrands.forEach(site => {
    if(!allBrands.includes(site.brand)){
        allBrands.push(site.brand);
    }
});

//first question
inquirer
.prompt([
    {
        type: "list",
        name: "brand",
        message: "Please select a brand:",
        choices: allBrands,
    },
])
.then(answers => {
    let selectedBrand = answers.brand;
    console.log(`Your choice: ${selectedBrand}`);
    rawBrands.forEach((site, index) => {
        if(site.brand === selectedBrand) {
            allSites.push(`ID: ${index} --- SITE: ${site.name} --- TYPE: ${site.type} --- LAST MODIFIED: ${site.date}`);
        };
    });
    //second question
    inquirer
    .prompt([
        {
            type: "list",
            name: "site",
            message: "Please select a site:",
            choices: allSites,
        }
    ])
    .then(answers => {
        console.log(`Your choice: ${answers.site}`);
        let selectedIndex = parseInt(answers.site.split("---")[0].split("ID: ")[1]);
        let selectedType = rawBrands[selectedIndex]["type"];
        let selectedName = rawBrands[selectedIndex]["name"];
        //third question
        inquirer
        .prompt([
            {
                type: "input",
                name: "url",
                message: "Please enter url to be scraped (don't include http ot https)"
            }
        ])
        .then(answers => {
            let selectedUrl = answers.url;
            console.log(`Your input: ${selectedUrl}`);

            //Updating screenshot map
            console.log("Updating screenshot map...");
            let ssmDir = "./screenshotmap";
            let ssmOriginFile = `${selectedBrand}-${selectedName}-${selectedType}.csv`;
            let ssmDestFile = "./screenshotmap.csv";

            if(fs.existsSync(`${ssmDir}/${ssmOriginFile}`)) {
                if(fs.existsSync(ssmDestFile)) {
                    fs.unlinkSync(ssmDestFile);
                };
                let ssmData = fs.readFileSync(`${ssmDir}/${ssmOriginFile}`).toString();
                ssmData = ssmData.replace(/placeholderurl/g, selectedUrl);
                fs.writeFileSync(ssmDestFile, ssmData);
            }
            else {
                console.log("Screenshot map doesn't exist. Please update and try again.")
                return null;
            }

            //Creating directory structure
            let brandDir = `_sites/${selectedBrand}`;
            let typeDir = `${brandDir}/${selectedType}`;
            let nameDir = `${typeDir}/${selectedName}`;
            console.log("Setting up directories...");
            if(!fs.existsSync(brandDir)) {
                fs.mkdirSync(brandDir);
            };
            if(!fs.existsSync(typeDir)) {
                fs.mkdirSync(typeDir);
            }
            else {
                console.log("Removing current content...");
                fs.rmdirSync(typeDir, {recursive: true});
            };

            //Creating shell script to replace script tags in html files
            fs.writeFileSync("./replace.sh", `find ${root}${typeDir} -name '*.html' -exec sed -i '' -e 's|<input*.*__RequestVerificationToken*.*>||g' -e 's|<script*.*adobetrackingdb*.*/script>||g' -e 's|<script*.*assets\.adobe*.*/script>||g' -e 's|<script*.*window\.NREUM*.*/script>||g' -e 's|<script*.*_satellite*.*/script>||g' -e 's|   ||g' {} \\;`);

            //Updating date
            console.log("Updating date...");
            sites.products[selectedIndex]["date"] = date.toString();
            fs.writeFileSync("./config.json", JSON.stringify(sites, null, "\t"));

            //Scraping site
            const spinner = ora(`Scraping: ${selectedUrl}...`).start();
            exec(`/usr/local/bin/wget -e robots=off --user-agent=\"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3\" --mirror --convert-links --adjust-extension --page-requisites --reject=\"pdf,mp4\" --no-parent ${selectedUrl} -P ${typeDir} > /dev/null 2>&1`, function() {
                console.log("Cleaning files...");
                exec("bash replace.sh", function() {
                    //Renaming scraped site dir
                    //fs.renameSync(`${typeDir}/${selectedUrl}, ${nameDir}`);
                    spinner.succeed("Site scraped!!!");
                })
            })
        })
    })
})