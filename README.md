# cs490-team10

Crush It will be a full-stack software application with:

- Daily task management like Frankly Covey
- Prioritization of Free to Focus
- Focus time like Pomordoro

It will be a user based application, where once a user signs in they will be able to see all tasks and appointments for one specific day. The tasks list will be divided into three seperate groups (Top priority, Important, Other). Each task also has an icon indicating the current status of the task, to show its progression. Users are able to change the specific day view they would like to see according to Month, Day, Year. To add the Pomodoro timer into Crush It, a pop-up Focus Time can be triggered and personalized with times/breaks.

The Figma Design we will be attempting to recreate is located [here](https://www.figma.com/file/qcilVxQXgiimzI7yzNVFl7/NJIT-Tasks-App-SOURCE?type=design&node-id=0%3A1&mode=design&t=Ufi6tR3JFBLCa57K-1)

Our Repository Structure should resemble the following File Tree (subject to change):

```
app/
|-- api/
|   |-- dist/
|   |-- logs/
|   |-- node_modules/
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- ...
|   |   |-- models/
|   |   |   |-- ...
|   |   |-- routes/
|   |   |   |-- ...
|   |   |   |-- app.ts
|   |   |   |-- server.ts
|   |-- tests/
|   |-- .dockerignore
|   |-- .eslintignore
|   |-- .eslintrc.js
|   |-- .prettierignore
|   |-- .prettierrc
|   |-- Dockerfile
|   |-- jest.config.ts
|   |-- package-lock.json
|   |-- package.json
|   |-- README.md
|   |-- tsconfig.json
|   |-- yarn.lock
|   |-- ...

|-- web/
|   |-- node_modules/
|   |-- public/
|   |   |-- index.html
|   |   |-- ...
|   |-- src/
|   |   |-- components/
|   |   |   |-- ...
|   |   |-- pages/
|   |   |   |-- ...
|   |   |-- App.tsx
|   |   |-- index.tsx
|   |   |-- setupTests.ts
|   |-- .dockerignore
|   |-- .eslintignore
|   |-- .eslintrc.js
|   |-- .prettierignore
|   |-- .prettierrc
|   |-- Dockerfile
|   |-- package-lock.json
|   |-- package.json
|   |-- postcss.config.js
|   |-- README.md
|   |-- tailwind.config.js
|   |-- tsconfig.json
|   |-- yarn.lock
|   |-- ...

|-- .gitignore
|-- README.md
|-- ...
```

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:rubykap30/cs490-team10.git
   cd cs490-team10/
   ```
2. **Install Dependencies in `app/api:`**
   ```bash
   yarn install
   ```
3. **Install Dependencies in `app/web:`**
   ```bash
   yarn install
   ```
4. **Set Up Environment Variables:**
   Set up the following files in `app/`
   ```bash
   .env.local
   .env.development
   ```
5. **Start up the Application in `app/`:**

   ```bash
   docker-compose up
   ```

6. **Access the Application:**
   Open your web browser and go to http://localhost:3000

_Note: For isolated web and api development, please see the read me located in their respective directories._
