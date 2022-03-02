# **Foodiescanner**

*Find your destiny restaurant*
Foodiescanner is web app built with Node.js + Express that allow you can create/delete/update/search/check information in the restaurant list.

## **Features**

* Check all restaurants including location and information.

* Use keyword to search restaurant.

* Create your favorite restaurans.

* Update information of restauransts.

* Delete restaurans you don't like.

* Use sort filter to find resaurant faster.

## **Getting Start**

### **Environment Setup**

* Node.js v14.16.0

* MongoDB v4.2.18

### **Installing**

1. Check requirement for environment setup.

2. Open your terminal and use 'git clone' to copy this project to local.

```
git clone https://github.com/winnielinn/restaurant-list.git
```

3. Connect MongoDB server.

```
cd ~/mongodb/bin/
```

```
./mongod --dbpath /Users/[Users'name]/mongodb-data
```

4. Change directory to the project.

```
cd restaurant-list
```

5. Install all dependencies.

```
npm install
```

6. Install nodemon package.

```
npm install -g nodemon 
```

7. Run seed data.

```
npm run seed
```

8. Run server in localhost using following npm script.

```
npm run dev
```

9. If successful, `App is listening on http://localhost/3000` will show in your terminal and you could open this URL to use web app.

## **Devtools**

* Node.js 14.16.0

* Express 4.17.2

* Express-Handlebars 6.0.2

* Bootstrap 4.3.1

* Font-awesome 5.8.1

* method-override mongoose 6.2.1

* 3.0.0

## **Contributor**

> [Winnie Lin](https://github.com/winnielinn)
