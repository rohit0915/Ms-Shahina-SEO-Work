/** @format */

const endPoints = {
  service: {
    getServiceByCategoryBeforeLogin: (query = "") =>
      `api/v1/Service/all/paginateServiceSearchForWebsiteWithName?${query}`,
    getServiceByCategoryAfterLogin: (query = "") =>
      `api/v1/getServiceByTokenForMembershipWithName?${query}`,
    getServiceDetail: (name = "") => `api/v1/Service/ByName/${name}`,
    getCategory: "api/v1/admin/Category/allCategory",
  },
  products: {
    getProductByCategory: (query = "") =>
      `api/v1/Product/all/paginateProductSearchWithName?${query}`,
  },
  gallery: {
    getGalleryBeforeLogin: "api/v1/Gallary/getGallaryBeforeLogin",
    getGalleryAfterlogin: "api/v1/Gallary/getGallary",
  },
  metaTags: {
    homePage: "api/v1/MetaTag/ByPage/home",
    loginPage: "api/v1/MetaTag/ByPage/Login",
    contactPage: "api/v1/MetaTag/ByPage/Contact",
    aboutusPage: "api/v1/MetaTag/ByPage/About Us",
    membershipPage: "api/v1/MetaTag/ByPage/Membership",
    shopPage: "api/v1/MetaTag/ByPage/Shop",
    servicePage: "api/v1/MetaTag/ByPage/Services",
    galleryPage: "api/v1/MetaTag/ByPage/Gallery",
    paymentplanPage: "api/v1/MetaTag/ByPage/Payment Plans",
    giftCardPage: "api/v1/MetaTag/ByPage/Gift Cards",
    acneQuizPage: "api/v1/MetaTag/ByPage/Acne Quiz",
    checkIngredientPage: "api/v1/MetaTag/ByPage/Check Ingredients",
    appointmentPage: "api/v1/MetaTag/ByPage/Appointment",
    indivisualAppointmentPage: "api/v1/MetaTag/ByPage/Individual Appointment",
    scheduleAppointmentPage: "api/v1/MetaTag/ByPage/Schedule Appointment",
    confirmAppointmentPage: "api/v1/MetaTag/ByPage/Confirm Appointment",
    serviceDetailPage: (id) => `api/v1/MetaTag/ByPage/${id}`,
    privacyPage: "api/v1/MetaTag/ByPage/Privacy Policy",
    shippingPolicyPage: "api/v1/MetaTag/ByPage/Shipping Policy",
    returnPolicyPage: "api/v1/MetaTag/ByPage/Return Policy",
    termPage: "api/v1/MetaTag/ByPage/Terms",
    faqPage: "api/v1/MetaTag/ByPage/FAQ",
    signupPage: "api/v1/MetaTag/ByPage/Signup",
    productDetailPage: (id) => `api/v1/MetaTag/ByPage/${id}`,
    cartPage: "api/v1/MetaTag/ByPage/User Cart",
    profilePage: "api/v1/MetaTag/ByPage/User Profile",
    allNewsPage: "api/v1/MetaTag/ByPage/All News",
    blogDetailPage: (id) => `api/v1/MetaTag/ByPage/${id}`,
    returningMemberPage: "api/v1/MetaTag/ByPage/Returning Member",
    limitedDealsPage: "api/v1/MetaTag/ByPage/Limited Deals",
    giveRatingPage: "api/v1/MetaTag/ByPage/Give Rating",
  },
  news: {
    getAllNews: "api/v1/News/getNews",
    getNewsDetail: (title) => `api/v1/News/${title}`,
  },
  banner: {
    homepageBanner: "api/v1/Banner/getBanner/HomePage",
  },
  getContactDetail: "api/v1/ContactDetails/viewContactDetails",
  getAllCoupons: "api/v1/getAllcoupan",
};

export default endPoints;
