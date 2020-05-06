# NOVARTIS DCX SCRAPER CLI

## Introduction

This is a NodeJS CLI application that executes a script that scrapes a website and sets it up to be hosted in Kinetiq.

![alt text](/demo.gif)

## Requirements

* Node v12.10.0 and up (tested on Node v12.10.0 and Node v14.01.0)
* WGET v1.20.3 and up

## Installation

To install WGET see the following instructions:

* [MAC installation](https://formulae.brew.sh/formula/wget)
* [Windows installation](https://www.gnu.org/software/wget/)

To install node dependenccies navigate to app directory and run `npm install`.

## Usage

1. To start run `npm start`
2. Select the site brand from the list (to cancel the selection step press `ctrl+c`)
3. Select the site you want to scrape from the list (to cancel the selection step press `ctrl+c`) 
4. Enter the url you want to scrape (don't include `http://`, `https://`, or trailing slashes `/`
5. Site will be scrapped
6. `git add, commit and push` changes

## Tips and maintenance

* Make sure to use **dashes (-)** instead of spaces when naming a site
* When adding a new site, make sure to follow an alphabetical order
* Adhere to the following naming convention for screenshot maps files: **brand-name-type.csv**
