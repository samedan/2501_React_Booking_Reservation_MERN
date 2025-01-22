### Source Lama dev

# Frontend

> https://www.youtube.com/watch?v=RkWpJ4XUHuw&t=679s

# Backend

> https://www.youtube.com/watch?v=k3Vfj-e1Ma4&t=8053s

### This git :

> https://github.com/samedan/2501_React_Booking_Reservation_MERN

### Original Git

> https://github.com/safak/youtube2022/tree/mern-booking/

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

### Backend Get featured search on Hotels

> hotelController.js -> const { min, max, limit, ...others } = req.query;

```
const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(limit);
```

### Created Search CONTEXT

> /src/context/SearchContext.jsx

> index.js -> <SearchContextProvider><App /></SearchContextProvider>

# Use context data in components

> Header.jsx -> const { dispatch } = useContext(SearchContext);

# Compute Price in Hotel.jsx

> /src/pages/hotel/Hotel.jsx -> const { dates, options } = useContext(SearchContext);

# Calculate nr of Nights (days) of stay - Hotel.jsx

```
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
```

> ![Nr of nights](https://github.com/samedan/2501_React_Booking_Reservation_MERN/blob/main/_images/02printscreen.jpg)

### AuthContext

> /src/context/AuthContext.jsx -> user is saved in localStorage

```
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  error: null,
};
```

# Auth in Login, Header & Navbar

> const { user } = useContext(AuthContext);

### MODAL : Pass hotel details

> /src/components/reserve/ReserveModal.jsx

# Show Modal

> /src/pages/hotel/Hotel.jsx

### Get Available Rooms

> /ReserveModal.jsx -> setSelectedRooms()

### Reserve a certain room number

> roomController.js -> updateRoomAvailability()

```
const updatedRoom = await Room.updateOne(
      { "roomNumbers._id": req.params.roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
      );
```

### ADMIN

> ![Admin](https://github.com/samedan/2501_React_Booking_Reservation_MERN/blob/main/_images/03printscreen.jpg)

### ProtectedRoutes

> /admin/src/App.js -> const ProtectedRoute = ({ children }) => {}

### TO DO

> count by city lowercase -> hotelController.js
