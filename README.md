# **Personal Project** #

## **Phone Fixer** ##

### *MVP*
<ul>

<li>Login Functionality
<li>Full CRUD
<li>Post What Parts Of Their Phone Needs Fixing
<li>Update Your Cart
<li>Update Your Appointment
<li>Use React-payment
</ul>


#### Ice Box
<li>Use Calander-React


## **Client**
### *dependencies*
- axios
- react-router-dom
- redux
- react-redux
- redux-promise-middleware

### *routes*
- home (/)
- store (/store)
- about (/about)
- cart (/cart)
- appointment(/appointment)

### *file structure*

- src/
    - App.js
    - App.css
    - index.js
    - reset.css
    - redux/
        - store
        - reducer
    - components/
        - Home.js/.css
        - Store.js/.css
        - About.js/.css
        - Cart.js/.css
        - Appointment.js/.css

## **Server**
<br/>

### **Dependecies**
- express-session
- express
- massive
- dotenv
- bcrypt
### *Endpoints*
<br/>

Auth:
- register: => /auth/register
- login: => /auth/login
- logout: => /auth/logout
- userSession: => /auth/user_session
<br/>

phoneFixerCtrl:
- (app.get) getAll_Iphones: => /api/getAllIphones
- (app.get) getAll_Androids: => /api/getAll_Androids
- (app.get) getAll_Google: => /api/getAll_Google
- (app.post) post_Product: => /api/post_Product
- (app.delete) delete_Product: /api/delete_Product
- (app.put) edit_Product: /api/edit_Product
- (app.put) edit_Phone: /api/edit_Phone

## **Database**

#### Users table
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    password TEXT NOT NULL, 
    email VARCAHR(50) NOT NULL
);
```
#### Phone Table
```sql
CREATE TABLE phones(
    phone_id SERIAL PRIMARY KEY,
    manufacturer VARCHAR(15),
    model VARCHAR(40),
);    
```

#### Product Table
```sql
CREATE TABLE product(
    product_id SERIAL PRIMARY KEY,
    screen BOOLEAN,
    battery BOOLEAN,
    phone_id INT REFERENCES phones(phone_id),
    user_id INT REFERENCES users(user_id)
);
```

#### Cart Table
```sql
CREATE TABLE cart(
    cart_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES product(product_id),
    user_id INT REFERENCES users(user_id)
);
```