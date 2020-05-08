//Modules
const { exec } = require("child_process");
const fs = require("fs");
const ora = require("ora");

const scrapeFunctions = {

    //Builds and array with all the brands from config file
    brandsArrBuilder: (configObj) => {
        let allBrandsArr = [];
        configObj.forEach(site => {
            if (!allBrandsArr.includes(site.brand)) {
                allBrandsArr.push(site.brand);
            };
        });
        return allBrandsArr;
    },

    //Builds an array with all the sites corresponding to the selected brand
    sitesArrBuilder: (configObj, selectedBrand) => {
        let allSitesArr = [];
        configObj.forEach((site, index) => {
            if (site.brand === selectedBrand) {
                allSitesArr.push(`ID: ${index} --- SITE: ${site.name} --- TYPE: ${site.type} --- LAST MODIFIED: ${site.date}`)
            };
        });
        return allSitesArr;
    },

    //Updates the screenshot map replacing the url in the file
    ssmUpdate: (originFile, destFile, replacementData) => {
        if(fs.existsSync(originFile)) {
            console.log("✅ Updating screenshot map...\n ");
            if(fs.existsSync(destFile)) {
                fs.unlinkSync(destFile);
            };
            let ssmData = fs.readFileSync(originFile).toString();
            ssmData = ssmData.replace(/placeholderurl/g, replacementData);
            fs.writeFileSync(destFile, ssmData);
        }
        else {
            console.log("❌ Screenshot map doesn't exist. Please update and try again\n ")
            return null;
        };
    },

    //Creates the directories structure if needed. Deletes last scraped site
    dirStucture: (brandDir, typeDir) => {
        console.log("✅ Setting up directories...\n ");
        if(!fs.existsSync(brandDir)) {
            fs.mkdirSync(brandDir);
        };
        if(!fs.existsSync(typeDir)) {
            fs.mkdirSync(typeDir);
        }
        else {
            console.log("✅ Removing current content...\n ");
            fs.rmdirSync(typeDir, {recursive: true});
        };
    },

    //Creates an sh file to clean the output html files
    fileCleaner: (rootDir , targetDir, rulesObj) => {
         console.log("✅ Updating replace.sh...\n ")
        fs.writeFileSync("./replace.sh", `find ${rootDir}${targetDir} -name '*.html' -exec sed -i '' -e 's|${rulesObj["rule1"]}||g' -e 's|${rulesObj["rule2"]}||g' -e 's|${rulesObj["rule3"]}||g' -e 's|${rulesObj["rule4"]}||g' -e 's|${rulesObj["rule5"]}||g' -e 's|   ||g' {} \\;`);
    },

    //Updates the date and url in the config file for the targeted site
    configUpdater: (configObj, index, newDate, newUrl) => {
        console.log("✅ Updating config file date and url...\n ");
        configObj["products"][index]["date"] = newDate;
        configObj["products"][index]["url"] = newUrl;
        fs.writeFileSync("./config.json", JSON.stringify(configObj, null, "\t"));
    },

    //Scrapes selected url using WGET, cleans html files using sh file
    siteScraper: (url, rootDir, outputDir, kinetiqUrl) => {
        const spinner = ora(`Scraping ${url}...`).start();
        exec(`/usr/local/bin/wget -e robots=off --user-agent=\"Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.3) Gecko/2008092416 Firefox/3.0.3\" --mirror --convert-links --adjust-extension --page-requisites --reject=\"pdf,mp4\" --no-parent ${url} -P ${outputDir} > /dev/null 2>&1`, () => {
            spinner.stop();
            console.log("✅ Cleaning files...\n ");
            exec(`bash replace.sh`, () => {
                console.log("✅ SITE SCRAPED!!! \n");
                console.log(`💻 To view the scraped site locally go to: \n${rootDir}${outputDir}/${url}/index.html\n `);
                console.log(`🌐 After deploying your changes to Kinetiq you can go to:\n${kinetiqUrl}/${outputDir}/${url}/index.html\n `);
            })
        })
    },

    //Initiates the scraping process (all previous steps)
    startScrapeProcess: (paramsObj) => {
        scrapeFunctions.ssmUpdate(paramsObj["ssmOrigin"], paramsObj["ssmDest"], paramsObj["selectedUrl"])
        scrapeFunctions.dirStucture(paramsObj["brandDir"], paramsObj["typeDir"]);
        scrapeFunctions.fileCleaner(paramsObj["root"], paramsObj["typeDir"], paramsObj["replacementRules"]);
        scrapeFunctions.configUpdater(paramsObj["configObj"], paramsObj["selectedIndex"], paramsObj["newDate"], paramsObj["selectedUrl"]);
        scrapeFunctions.siteScraper(paramsObj["selectedUrl"], paramsObj["root"], paramsObj["typeDir"], paramsObj["kinetiqUrl"]);
    }
}

module.exports = scrapeFunctions;