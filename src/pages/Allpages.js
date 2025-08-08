/** @format */

import { lazy } from "react";
import Navbar from "../components/home/Navbar";
import TopHeader from "../components/home/TopHeader";
import Home from "../pages/home/Home";
import Footer from "../components/Footer";
import MenuOptions from "../components/home/MenuOptions";
const GiftCard = lazy(() => import("../components/giftCards/GiftCard"));
const LogIn = lazy(() => import("../components/auth/LogIn"));
const MyCart = lazy(() => import("../components/MyCart/MyCart"));
const Contact = lazy(() => import("../components/Contact"));
const AboutUs = lazy(() => import("../components/AboutUs"));
const Membership = lazy(() => import("../components/memebership/Membership"));
const ServiceTab = lazy(() => import("../components/Services/ServiceTab"));
const Gallery = lazy(() => import("../components/Gallery/Gallery"));
const PaymentPlan = lazy(() =>
  import("../components/PaymentPlans/PaymentPlan")
);
const Shop = lazy(() => import("../components/shop/Shop"));
const AllProducts = lazy(() => import("../components/productPage/ProductPage"));
const CheckIngredients = lazy(() =>
  import("../components/trackIngredient/CheckIngredients")
);

export {
  Navbar,
  TopHeader,
  Home,
  Footer,
  MenuOptions,
  GiftCard,
  LogIn,
  MyCart,
  Contact,
  AboutUs,
  Membership,
  ServiceTab,
  Gallery,
  PaymentPlan,
  Shop,
  AllProducts,
  CheckIngredients,
};
