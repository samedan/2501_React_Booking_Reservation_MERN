### Source Lama dev

> https://www.youtube.com/watch?v=RkWpJ4XUHuw&t=679s

### This git :

> https://github.com/samedan/2501_React_Booking_Reservation_MERN

### Backend URL in frontend

> /react/package.json -> "proxy": "http://localhost:8800/api"

### React

> ![React](https://github.com/samedan/2501_React_Booking_Reservation_MERN/blob/main/_images/01printscreen.jpg)

### Backend Node MERN

> package.json -> "type": "module"

### Models, Routes

## Create Error model

> /utils/error.js -> createError = (status, message)

### Login

# Use Cookie-Parser and JWToken

> /controllers/authController.js -> login()

```
const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("acces_token", token, {
        httpOnly: true, // no client secret will reach this cookie
      })
      .status(200)
      .json({ ...otherDetails });
```

### Check Token, Admin, User

> /utils/verifyToken.js -> verifyToken, verifyUser, verifyAdmin
