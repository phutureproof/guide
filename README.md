# Guide

Angular Backend Frontend

## Installation

git clone https://github.com/phutureproof/guide.git

or manually [grab the latest release](https://github.com/phutureproof/guide/releases), extract and point your webserver document root to the app folder.

You will also need to run the supplied angular.sql file on your database, and tweak the values present in api.config.php to match your database provider details.

After that you should be able to run the application.


## Create Editable Regions

The idea of this app is to have as much automation as possible while still allowing flexibility to the designer.

You can create a database editing region by adding

`<guide-filter-list />`

To your page, the tage takes two data parameters which define the database table and the database columns to work with

`<guide-filter-list data-table="users" data-shown="email, username" />`

The above tag connects to your database users table and manages the data for the email and username columns.

It is assumed that all your tables will use an auto incrementing primary key named "id".
