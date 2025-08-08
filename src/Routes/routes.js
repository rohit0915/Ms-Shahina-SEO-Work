/** @format */
import React from "react";

// import Quiz from "../components/AcneQuiz/Quiz";
import AutheticatedRoutes from "../pages/ProtectedRoutes/AutheticatedRoutes";
import { lazy } from "react";

// Direct lazy imports from component files (not Allpages.js)
const Home = React.lazy(() => import("../pages/home/Home"));
const LogIn = React.lazy(() => import("../components/auth/LogIn"));
const AllProducts = React.lazy(() => import("../components/productPage/ProductPage"));
const AboutUs = React.lazy(() => import("../components/AboutUs"));
const CheckIngredients = React.lazy(() => import("../components/trackIngredient/CheckIngredients"));
const Contact = React.lazy(() => import("../components/Contact"));
const Gallery = React.lazy(() => import("../components/Gallery/Gallery"));
const GiftCard = React.lazy(() => import("../components/giftCards/GiftCard"));
const Membership = React.lazy(() => import("../components/memebership/Membership"));
const MyCart = React.lazy(() => import("../components/MyCart/MyCart"));
const PaymentPlan = React.lazy(() => import("../components/PaymentPlans/PaymentPlan"));
const ServiceTab = React.lazy(() => import("../components/Services/ServiceTab"));
const Shop = React.lazy(() => import("../components/shop/Shop"));


const ServicePage = React.lazy(() => import("../components/Services/ServicePage.js"));
const Appointment = React.lazy(() => import("../components/Appointment.js"));
const IndivisualAppointment = React.lazy(() => import("../components/IndivisualAppointment.js"));
const Schedule1 = React.lazy(() => import("../components/Schedule/Schedule1.js"));
const Schedule2 = React.lazy(() => import("../components/Schedule/Schedule2.js"));
const Thanks = React.lazy(() => import("../components/Thanks.js"));
const Privacy = React.lazy(() => import("../components/Privacy.js"));
const Terms = React.lazy(() => import("../components/Terms.js"));
const FAQ = React.lazy(() => import("../components/FAQ.js"));
const ForgetPassword = React.lazy(() => import("../components/ForgetPassword.js"));
const ChangePassword = React.lazy(() => import("../components/ChangePassword.js"));
const Signup = React.lazy(() => import("../components/Signup.js"));
const ProductDetails = React.lazy(() => import("../components/ProductDetails.js"));
const MyProfile = React.lazy(() => import("../components/MyProfile.js"));
const Failed = React.lazy(() => import("../components/Failed.js"));
const PasswordChanged = React.lazy(() => import("../components/PasswordChanged.js"));
const VerifySubScription = React.lazy(() => import("../components/VerifySubScription.js"));
const AllNews = React.lazy(() => import("../components/AllNews"));
const ReturningMember = React.lazy(() => import("../components/ReturningMember"));
const ProductOrder = React.lazy(() => import("../components/Orders/ProductOrder"));
const ServiceOrder = React.lazy(() => import("../components/Orders/ServiceOrder"));
const PastServiceOrder = React.lazy(() => import("../components/Orders/PastServiceOrder"));
const OneNews = React.lazy(() => import("../components/News/OneNews"));
const ShippingPrivacy = React.lazy(() => import("../components/ShippingPrivacy"));
const ReturnPrivacy = React.lazy(() => import("../components/ReturnPrivacy"));
const GuestThanks = React.lazy(() => import("../components/GuestThanks"));
const GuestFailed = React.lazy(() => import("../components/GuestFailed"));
const CardSave = React.lazy(() => import("../components/CardSaver/CardSave"));
const Confirmation = React.lazy(() => import("../components/Confirmation"));
const ServiceBooked = React.lazy(() => import("../components/Confirmation/ServiceBooked"));
const CardSaveSecond = React.lazy(() => import("../components/CardSaver/CardSaveSecond"));
const LimitedDeals = React.lazy(() => import("../components/Services/LimitedDeals"));
const Reschedule = React.lazy(() => import("../components/Reschedule/Reschedule"));
const ThanksApp = React.lazy(() => import("../components/ThanksApp"));
const FailedApp = React.lazy(() => import("../components/FailedApp"));
const BookingMsg = React.lazy(() => import("../components/BookingMsg"));
// const AutheticatedRoutes = React.lazy(() => import("../pages/ProtectedRoutes/AutheticatedRoutes"));
const GiveRating = React.lazy(() => import("../pages/GiveRating/GiveRating"));
const Quiz = React.lazy(() => import("../components/AcneQuiz/Quiz"));

// import {
//   AboutUs,
//   AllProducts,
//   CheckIngredients,
//   Contact,
//   Gallery,
//   GiftCard,
//   Home,
//   LogIn,
//   Membership,
//   MyCart,
//   PaymentPlan,
//   ServiceTab,
//   Shop,
// } from "../pages/Allpages.js";
// import ServicePage from "../components/Services/ServicePage.js";
// import Appointment from "../components/Appointment.js";
// import IndivisualAppointment from "../components/IndivisualAppointment.js";
// import Schedule1 from "../components/Schedule/Schedule1.js";
// import Schedule2 from "../components/Schedule/Schedule2.js";
// import Thanks from "../components/Thanks.js";
// import Privacy from "../components/Privacy.js";
// import Terms from "../components/Terms.js";
// import FAQ from "../components/FAQ.js";
// import ForgetPassword from "../components/ForgetPassword.js";
// import ChangePassword from "../components/ChangePassword.js";
// import Signup from "../components/Signup.js";
// import ProductDetails from "../components/ProductDetails.js";
// import MyProfile from "../components/MyProfile.js";
// import Failed from "../components/Failed.js";
// import PasswordChanged from "../components/PasswordChanged.js";
// import VerifySubScription from "../components/VerifySubScription.js";
// import AllNews from "../components/AllNews";
// import ReturningMember from "../components/ReturningMember";
// import ProductOrder from "../components/Orders/ProductOrder";
// import ServiceOrder from "../components/Orders/ServiceOrder";
// import PastServiceOrder from "../components/Orders/PastServiceOrder";
// import OneNews from "../components/News/OneNews";
// import ShippingPrivacy from "../components/ShippingPrivacy";
// import ReturnPrivacy from "../components/ReturnPrivacy";
// import GuestThanks from "../components/GuestThanks";
// import GuestFailed from "../components/GuestFailed";
// import CardSave from "../components/CardSaver/CardSave";
// import Confirmation from "../components/Confirmation";
// import ServiceBooked from "../components/Confirmation/ServiceBooked";
// import CardSaveSecond from "../components/CardSaver/CardSaveSecond";
// import LimitedDeals from "../components/Services/LimitedDeals";
// import Reschedule from "../components/Reschedule/Reschedule";
// import ThanksApp from "../components/ThanksApp";
// import FailedApp from "../components/FailedApp";
// import BookingMsg from "../components/BookingMsg";
// import GiveRating from "../pages/GiveRating/GiveRating";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: LogIn },
  { path: "/allproducts/:type/:name", component: AllProducts },
  { path: "/contact", component: Contact },
  { path: "/aboutus", component: AboutUs },
  { path: "/membership", component: Membership },
  { path: "/shop", component: Shop },
  { path: "/services/:name", component: ServiceTab },
  { path: "/gallery", component: Gallery },
  { path: "/paymentplan", component: PaymentPlan },
  { path: "/giftcards", component: GiftCard },
  { path: "/acnequiz", component: Quiz },
  { path: "/checkIngredients", component: CheckIngredients },
  { path: "/appointment", component: Appointment },
  { path: "/indiAppointment", component: IndivisualAppointment },
  { path: "/service/:name", component: ServicePage },
  { path: "/privacy-policy", component: Privacy },
  { path: "/shipping-policy", component: ShippingPrivacy },
  { path: "/return-policy", component: ReturnPrivacy },
  { path: "/terms", component: Terms },
  { path: "/faq", component: FAQ },
  { path: "/forget-password", component: ForgetPassword },
  { path: "/changePassword", component: ChangePassword },
  { path: "/signup", component: Signup },
  { path: "/product/:name", component: ProductDetails },
  { path: "/limited-deals", component: LimitedDeals },
  { path: "/password-changed", component: PasswordChanged },
  { path: "/allNews", component: AllNews },
  { path: "/news/:id", component: OneNews },
  { path: "/returningMember", component: ReturningMember },
  { path: "/guestthanks", component: GuestThanks },
  { path: "/guestfailed", component: GuestFailed },
  { path: "/guest-card-saver/:email/:orderId", component: CardSave },
  { path: "/guest-card-saver1/:email", component: CardSaveSecond },
  { path: "/confirmation", component: Confirmation },
  { path: "/verifySubscriptionApp", component: ThanksApp },
  { path: "/faildeSubApp", component: FailedApp },



  {
    path: "/mycart",
    component: (
      <AutheticatedRoutes>
        <MyCart />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/my-profile",
    component: (
      <AutheticatedRoutes>
        <MyProfile />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/verifySubscription/:id",
    component: (
      <AutheticatedRoutes>
        <VerifySubScription />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/product-orders",
    component: (
      <AutheticatedRoutes>
        <ProductOrder />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/upcoming-orders",
    component: (
      <AutheticatedRoutes>
        <ServiceOrder />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/past-orders",
    component: (
      <AutheticatedRoutes>
        <PastServiceOrder />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/service-booked/:id",
    component: (
      <AutheticatedRoutes>
        <ServiceBooked />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/booking-msg/:id",
    component: (
      <AutheticatedRoutes>
        <BookingMsg />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/give-rating",
    component: (
      <AutheticatedRoutes>
        <GiveRating />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/reschedule/:id",
    component: (
      <AutheticatedRoutes>
        <Reschedule />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/schedule1",
    component: (
      <AutheticatedRoutes>
        <Schedule1 />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/schedule2",
    component: (
      <AutheticatedRoutes>
        <Schedule2 />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/thanks/:id",
    component: (
      <AutheticatedRoutes>
        <Thanks />
      </AutheticatedRoutes>
    ),
  },
  {
    path: "/failed/:id",
    component: (
      <AutheticatedRoutes>
        <Failed />
      </AutheticatedRoutes>
    ),
  },
];


export default routes;
