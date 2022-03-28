# **Foodiescanner**

*Create your restaurant list*
![GITHUB](https://raw.githubusercontent.com/winnielinn/restaurant-list/main/public/login_page.png "login_page")
![GITHUB](https://raw.githubusercontent.com/winnielinn/restaurant-list/main/public/home_page.png "home_page")
Foodiescanner built with Node.js + Express that allow user manage your restaurant list.

## **Features**

* Find information of all restaurants.

* Search restaurants by using keyword or sort filter.

* Create your favorite restaurants.

* Update information of restaurants.

* Delete restaurants you don't like.

## **Getting Start**

### **Environment Setup**

* Node.js v14.16.0

* MongoDB v4.2.18

### **Installing**

1. Open your terminal and use 'git clone' to copy this project to local.

```
git clone https://github.com/winnielinn/restaurant-list.git
```

2. Change directory to the project.

```
cd restaurant-list
```

3. Install all dependencies.

```
npm install
```

4. Install nodemon package.

```
npm install -g nodemon 
```

5. Run seed data. Once seed data created, terminal will show `Seed data created!` twice owing to two faker users.

```
npm run seed
```

6. Run server in localhost by using following npm script.

```
npm run dev
```

7. If successful, `App is listening on http://localhost/3000` will show in terminal.

8. Please refer `.env.example` to check which environment varible you need for full web app experience. Following API service you'll need:

* [Meta for Developers](https://developers.facebook.com/)
* [Google OAuth 2.0 Login](https://console.developers.google.com/)

## **Contributor**

> [Winnie Lin](https://github.com/winnielinn)
