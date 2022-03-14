<!-- <img src="https://images.unsplash.com/photo-1501776192086-602832fae6e6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"> -->

# <img src="https://cdn.freebiesupply.com/logos/large/2x/the-university-of-melbourne-logo-svg-vector.svg" width=15% align=left> COMP30022 Group Project Team 4399
This repository is created for [University of Melbourne](https://www.unimelb.edu.au) [COMP30022 Semester 2 2021](https://handbook.unimelb.edu.au/search) 

The original repo link is https://github.com/Harrison-Huang666/COMP30022-49, and front-end branch is isolated from the prev repo, which is available at this link: https://github.com/chuangyu-hscy/furry-parakeet

**Personal Customer Relation Management (PCRM)** project development.

---

## Deployment Access Link and Working Branches
| Server | Working Branch | Deployment |
| ---- | ---- | ---- |
| Back-End | https://bit.ly/3urzPG9 | https://crm4399.herokuapp.com/ |
| Front-End | https://bit.ly/3imk1zI | http://www.4399crm.com |

**Please view front end with screen size 375 x 875px (iPhoneX screen size)**

---

<img src="https://icons-for-free.com/iconfiles/png/512/notion-1324440204874385945.png" width=2.3% align="left"> For progress tracking & view notes, please accesss via [notion](https://www.notion.so/huangsunchuangyu/COMP30022-IT-Project-e0687c4d6a7b4ee18d164b25c9bc93d8).


📩 Contacts of tutor: t.bowes@unimelb.edu.au

📧 Contacts of client: aponiatowski@student.unimelb.edu.au

---


## Table of Content
<!-- [<img src="https://cdn.freebiesupply.com/logos/large/2x/the-university-of-melbourne-logo-svg-vector.svg" width=20% align=left> -->
  - [COMP30022 Group Project Team 4399](#-comp30022-group-project-team-4399)
  - [Team members](#team-members)
  - [Javascript Documentation](#javascript-api-documentation)
  - [Software Dependencies](#software-dependencies)
  - [Built with](#built-with)
  - [Directories](#directories)
  - [Quick Start Guide](#quick-start-guide)
  - [License](#license)

---

## Team members
| Name | Role | Contact | 
| :---- | :---- | :---- | 
| Bin Liang| Back End Leader | blliang@student.unimelb.edu.au | 
| Hongji Huang | Communication Leader | hohuang@student.unimelb.edu.au |
| Sunchuangyu Huang | Scrum Master | sunchuangyuh@student.unimelb.edu |
| Wei Zhao | Front End Leader | weizhao1@student.unimelb.edu.au |
| Yixiao Tian | Communication leader | yixiaot@student.unimelb.edu.au |

## Javascript API Documentation
- [Contact Controller](https://crm4399.herokuapp.com/api/contactController)
- [Profile Controller](https://crm4399.herokuapp.com/api/profileController)
- [Record Controller](https://crm4399.herokuapp.com/api/recordController)
- [User Controller](https://crm4399.herokuapp.com/api/userController)
- [Authentication Controller](https://crm4399.herokuapp.com/api/emailAuth)

## Software Dependencies

For more information, please check `package.json`.

For quick installation:
```bash
npm install # install all dependencies or
npm install --dependencies # install required dependencies only
```

## Built With
Our project was built with the following technologies:
- Node.js
- React.js
- Express.js
- CSS
- HTML
- MongoDB

## Directories
- `__test__`: store jest API backend testing functions
- `config`: store application session authentication functions
- `controller`: store controllers for each accessible routes
- `models`: store database connection script and database schemas
- `public`: store html fragments
- `routes`: store server accessible routes
- `views`: handlebar views (none-use)
- `out`: store javascript doc

## Quick Start Guide
Before start development or testing, please make sure all required dependencies have been installed.

For convenience purpose, please use `nodemon` instead of `node`.
```bash
nodemon app.js
```

**TESTING**

For backend function testing, using POSTMAN to test the backend routes and relevant API functions.

Check POSTMAN testing instruction [here](https://docs.google.com/document/d/1scp54-mT29K6mYz5KajW095xjlhTU-73p0TnbOa5hmU/edit#)

[Download](https://drive.google.com/file/d/1MN0yOcuoQaosnn4B1lC_HAvFVgCMHaV8/view?usp=sharing) POSTMAN testing JSON

For built-in JEST function testing, use `npm test`.



## License

See more information, click [here](https://github.com/Harrison-Huang666/COMP30022-49/blob/main/LICENSE).
