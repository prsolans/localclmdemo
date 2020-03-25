# DocuSign CLM Base Demo
## Set up and installation for local web application leveraging the DocuSign CLM API.

IMPORTANT: This framework is intended solely for local testing and demonstration purposes. This is not intended for production work.

*Prequisites*
* A text editor - I'd recommend VSCode [https://code.visualstudio.com/] or Sublime Text [https://www.sublimetext.com/3]
* Some familiarity with (or willingness to learn about) Terminal
* The ability to copy/paste

*It will help if you are familiar with*
* JavaScript
* HTML
* CSS
* Git

*You'll have no issues if you are familiar with*
* Node [https://nodejs.org/en/download/]
* Express [https://expressjs.com/]
* Pug [https://pugjs.org/api/getting-started.html]

### Step 1: Get the application

#### Using Git From Terminal ####
1. Go to Terminal
2. Go to a parent folder of your choice
3. Clone from Git: `git clone https://github.com/prsolans/localclmdemo localclmdemo`

### Step 2: Build your environment
You need some stuff to make this run. Here's how to do it.
1. Change to the proper folder: `cd localclmdemo`
2. Install the dependencies: `npm install && npm update`

NOTE: `npm` refers to Node Package Manager, and helps build our environment. If you have trouble with Step 2.2, you may need to install/update NodeJS and XCode. For more information... Google it.

### Step 3: Obtain CLM API credentials
TODO: Add instructions here


### Step 4: Configure your local application

1. Open the file at /localclmdemo/app.js in your text editor
2. Starting at Line 15, you will see a section with values you should update:
* client_id - Paste the Developer Token from step 4 here
* client_secret - The domain of your demo environment
* root_folder_id - This is the ID of the folder you want to display as a Content Explorer in the app

### Step 5: Amend your hosts file
To make Box UI Elements work in your app, you will need to add a line to your hosts file
1. Open your hosts file (assumes Mac) from terminal `open /etc/hosts`

NOTE: If you have trouble with saving this file, try the command `sudo nano /etc/hosts` to open the file. You may need to enter your computer password along the way, as this is a system file on your computer.

2. Copy/paste: `127.0.0.1 localclmdemo.com`
3. Back in the Box Developer Console, go to the Configuration page and copy the following into the box Allowed Origins box under CORS Domain: `http://localclmdemo.com:3000`

NOTE: We are using 'localclmdemo.com' for this demo, but you can replace this with whatever domain you'd like.

### Step 6: Configure your CLM account
You need to add some Admin configurations to allow certain API activity to flow into your custom domain
1. In Admin->Integrations->API Settings, add `localclmdemo.com` under *Permitted Domains*
2. In Admin->Account Management->Security Settings, add `localclmdemo.com` under *Clickjack Protection/Allowed Domains*

### Step 7: Run the application
To get this application fired up, you will need to use Terminal.
1. From Terminal, navigate to the folder where the application is located
2. Run the app
      Copy/paste: `npm start`
3. Navigate to http://localclmdemo.com:3000 in your browser to see the application.

### Step 8: Customize the application
You can update the branding and the colors
1. Update logo - Replace the file at /localclmdemo/public/images/logo.png
2. Set colors - Edit the file at /localclmdemo/public/stylesheets/style.css (Look for EDIT ME)

### Step 9: Telling the story
You should now have a working and branded app.
1. You can find the text in the /localclmdemo/views folder. You can adjust any language and links here to help tell your story

If you get this far and need help, please reach out to me (Paul R. Solans - prs@box.com).
