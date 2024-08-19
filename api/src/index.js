import { app, PORT } from "./config/app.config.js";
import { errorHandlerMiddleware } from "./middlewares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlists", wishlistRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
