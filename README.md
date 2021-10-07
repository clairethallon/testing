# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).

Phase 1 - Basic Setup

[] git init
[] npm init
[] npm install express pg
[] spin up server
[] serve index.html/scripts/css

Phase 2 - pool setup

[] create a db/table 
[] create pool module 
[] require in server.js 
[] make GET route w/ SELECT * FROM tableName 
[] test in browser 
[] GET call on page load

Phase 3 - interface/POST

[] interface for displaying tasks 
[] interface for adding a task 
[] capture user input & send to server via POST 
[] input new message into db in POST route s

Phase 4 - delete

[] display messages on DOM 
[] add a "delete" button with data-id tag 
[] test clieck handler with $( this ).data( 'id' ) 
[] send DELETE req w/ ID 
[] delete message from db 
[] repeat for PUT 