/** @format */

import {
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg4,
  galleryImg5,
  galleryImg6,
  galleryImg7,
  galleryImg8,
  galleryImg10,
  galleryImg12,
  galleryImg13
} from "../assest";
import { Link } from "react-router-dom";

export const pictures = [
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg7,
  galleryImg5,
  galleryImg6,
  galleryImg4,
  galleryImg8,
  galleryImg12,
  galleryImg10,
  galleryImg13
];

export const paymentCards = [
  "/Image/Rectangle 4431.png",
  "/Image/Rectangle 4432.png",
  "/Image/image 246.png",
  "/Image/image 247.png",
  "/Image/Mask group.png",
];

export const STAR = "/Image/72.png";
export const MAP_IMG = "/Image/image 211.png";

const MenuOptions = [
  {
    link: "/",
    title: "HOME",
  },
  {
    link: "/shop",
    title: "SHOP",
  },
  {
    link: "/services/services",
    title: "SERVICES",
    submenu: [
      {
        label: <Link to="/services/services">Aging</Link>,
        key: "aging",
        children: [
          {
            label: (
              <Link to="/service/BIOREPEEL?id=66b4c7d65fc5deae1f36cccb">
                BIOREPEEL
              </Link>
            ),
            key: "aging-1",
          },
          {
            label: (
              <Link to="/service/SALMON%20SPERM%20DNA%20FACIAL?id=66b4c6875fc5deae1f36aa2f">
                SALMON SPERM DNA FACIAL
              </Link>
            ),
            key: "aging-2",
          },
          {
            label: (
              <Link to="/service/AEROLASE%20ROSACEA%20TREATMENT?id=6600a133133755405effb1da">
                AEROLASE ROSACEA TREATMENT
              </Link>
            ),
            key: "aging-3",
          },
          {
            label: (
              <Link to="/service/FOREVER%20YOUNG%20LASER%20TREATMENT?id=66009e62133755405effadc5">
                FOREVER YOUNG LASER TREATMENT
              </Link>
            ),
            key: "aging-4",
          },
          {
            label: (
              <Link to="/service/HYDRAFACIAL?id=65d4905c82786773e7d12f57">
                HYDRAFACIAL
              </Link>
            ),
            key: "aging-5",
          },
          {
            label: (
              <Link to="/service/PRO%20CLINICAL%20PEEL?id=6597c628a65da702bea4c134">
                PRO CLINICAL PEEL
              </Link>
            ),
            key: "aging-6",
          },
          {
            label: (
              <Link to="/service/MICRONEEDLING?id=654b399b5d1113dac9b90d61">
                MICRONEEDLING
              </Link>
            ),
            key: "aging-7",
          },
          {
            label: (
              <Link to="/service/RED%20CARPET%20FACIAL?id=654b36a313b92aa67e37dbab">
                RED CARPET FACIAL
              </Link>
            ),
            key: "aging-8",
          },
          {
            label: (
              <Link to="/service/JETPEEL%20FACIAL?id=654b32b905a9c751730a2561">
                JETPEEL FACIAL
              </Link>
            ),
            key: "aging-9",
          },
          {
            label: (
              <Link to="/service/IPL%20SKIN%20REJUVANATION?id=654a3c1aba0a2cc9d9245783">
                IPL SKIN REJUVANATION
              </Link>
            ),
            key: "aging-10",
          },
          {
            label: (
              <Link to="/service/AQUAGOLD%20MICRONEEDLING?id=654a31414272c5c2011f28b9">
                AQUAGOLD MICRONEEDLING
              </Link>
            ),
            key: "aging-11",
          },
          {
            label: (
              <Link to="/service/LASER%20SKIN%20RESURFACING?id=654a2cc3bfbc43eedc7b7f14">
                LASER SKIN RESURFACING
              </Link>
            ),
            key: "aging-12",
          },
          {
            label: (
              <Link to="/service/RF%20MICRONEEDLING?id=654a2bc782e27a60b230beb7">
                RF MICRONEEDLING
              </Link>
            ),
            key: "aging-13",
          },
          {
            label: (
              <Link to="/service/RF%20SKIN%20TIGHTENING?id=654a228512f66a23b4cf6fe8">
                RF SKIN TIGHTENING
              </Link>
            ),
            key: "aging-14",
          },
          {
            label: (
              <Link to="/service/PRP%20MICRONEEDLING?id=654a20b481151536685c6a44">
                PRP MICRONEEDLING
              </Link>
            ),
            key: "aging-15",
          },
          {
            label: (
              <Link to="/service/PERFECT%20DERMA%20PEEL?id=654a0625626b3dcdcf4ed85a">
                PERFECT DERMA PEEL
              </Link>
            ),
            key: "aging-16",
          },
          {
            label: (
              <Link to="/service/TCA%20PEEL?id=654a00860645064084c8aba0">
                TCA PEEL
              </Link>
            ),
            key: "aging-17",
          },
          {
            label: (
              <Link to="/service/DERMAMELAN%20PEEL?id=651fe2bff776a09d2b9f78cc">
                DERMAMELAN PEEL
              </Link>
            ),
            key: "aging-18",
          },
          {
            label: (
              <Link to="/service/COSMELAN%20MD%20PEEL?id=651fe273f776a09d2b9f78c6">
                COSMELAN MD PEEL
              </Link>
            ),
            key: "aging-19",
          },
          {
            label: (
              <Link to="/service/IPL%20VASCULAR%20(ROSACEA)%20TREATMENT?id=651fdb24f776a09d2b9f78af">
                IPL VASCULAR (ROSACEA) TREATMENT
              </Link>
            ),
            key: "aging-20",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49bddd8c5a329ce904775">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "aging-21",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b05d8c5a329ce9045f7">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "aging-22",
          },
        ],
      },
      {
        label: <Link to="/services/services">Acne</Link>,
        key: "acne",
        children: [
          {
            label: (
              <Link to="/service/BIOREPEEL?id=66b4c7d75fc5deae1f36cd03">
                BIOREPEEL
              </Link>
            ),
            key: "acne-1",
          },
          {
            label: (
              <Link to="/service/ACNE%20FREE%20LASER?id=66009f41133755405effaf0b">
                ACNE FREE LASER
              </Link>
            ),
            key: "acne-2",
          },
          {
            label: (
              <Link to="/service/HYDRAFACIAL?id=65d4905c82786773e7d12f42">
                HYDRAFACIAL
              </Link>
            ),
            key: "acne-3",
          },
          {
            label: (
              <Link to="/service/RED%20CARPET%20FACIAL?id=654b360813b92aa67e37dba4">
                RED CARPET FACIAL
              </Link>
            ),
            key: "acne-4",
          },
          {
            label: (
              <Link to="/service/JETPEEL%20FACIAL?id=654b33f1c5d68d1a8b7da604">
                JETPEEL FACIAL
              </Link>
            ),
            key: "acne-5",
          },
          {
            label: (
              <Link to="/service/ACNE%20PEEL?id=654b3157c5d68d1a8b7da592">
                ACNE PEEL
              </Link>
            ),
            key: "acne-6",
          },
          {
            label: (
              <Link to="/service/IPL%20ACNE%20TREATMENT?id=654a3b33ba0a2cc9d924577c">
                IPL ACNE TREATMENT
              </Link>
            ),
            key: "acne-7",
          },
          {
            label: (
              <Link to="/service/PERFECT%20DERMA%20PEEL?id=654a076e0645064084c8ae93">
                PERFECT DERMA PEEL
              </Link>
            ),
            key: "acne-8",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49bddd8c5a329ce90477f">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "acne-9",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b06d8c5a329ce90460b">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "acne-10",
          },
        ],
      },
      {
        label: <Link to="/services/services">Hair Loss</Link>,
        key: "hair-loss",
        children: [
          {
            label: (
              <Link to="/service/EXO-XOM%20HAIR%20LOSS?id=67c7f6100b22bb0afb8a323f">
                EXO-XOM HAIR LOSS
              </Link>
            ),
            key: "hair-loss-1",
          },
          {
            label: (
              <Link to="/service/SIGNATURE%20HAIR%20LOSS%20TREATMENT?id=65901a4e4969475ffea97e8b">
                SIGNATURE HAIR LOSS TREATMENT
              </Link>
            ),
            key: "hair-loss-2",
          },
          {
            label: (
              <Link to="/service/PAINLESS%20PRP%20HAIR%20LOSS%20TREATMENT?id=651e91c7e0e13fdf9ce01d83">
                PAINLESS PRP HAIR LOSS TREATMENT
              </Link>
            ),
            key: "hair-loss-3",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49bded8c5a329ce904787">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "hair-loss-4",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b05d8c5a329ce904602">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "hair-loss-5",
          },
        ],
      },
      {
        label: <Link to="/services/services">Fat Reduction</Link>,
        key: "fat-reduction",
        children: [
          {
            label: (
              <Link to="/service/LASER%20BODY%20SLIMMING?id=67c546e589a90a9ea0ce094c">
                LASER BODY SLIMMING
              </Link>
            ),
            key: "fat-reduction-1",
          },
          {
            label: (
              <Link to="/service/RF%20BODY%20TIGHTENING?id=65afa273203824350c1b1950">
                RF BODY TIGHTENING
              </Link>
            ),
            key: "fat-reduction-2",
          },
          {
            label: (
              <Link to="/service/RF%20BODY%20CONTOURING?id=6597fa03ff7ff2b0107a42e5">
                RF BODY CONTOURING
              </Link>
            ),
            key: "fat-reduction-3",
          },
          {
            label: (
              <Link to="/service/CELLULITE%20TREATMENT?id=6549fecc626b3dcdcf4ed558">
                CELLULITE TREATMENT
              </Link>
            ),
            key: "fat-reduction-4",
          },
          {
            label: (
              <Link to="/service/RF%20FACE%20CONTOURING?id=651e845a22e4351620f8bafc">
                RF FACE CONTOURING
              </Link>
            ),
            key: "fat-reduction-5",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49bded8c5a329ce90478e">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "fat-reduction-6",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b06d8c5a329ce904612">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "fat-reduction-7",
          },
        ],
      },
      {
        label: <Link to="/services/services">Pigmentation</Link>,
        key: "pigmentation",
        children: [
          {
            label: (
              <Link to="/service/BIOREPEEL?id=66b4c7d95fc5deae1f36cd21">
                BIOREPEEL
              </Link>
            ),
            key: "pigmentation-1",
          },
          {
            label: (
              <Link to="/service/SPOTLESS%20SKIN%20LASER%20TREATMENT?id=6600a09a133755405effb0e6">
                SPOTLESS SKIN LASER TREATMENT
              </Link>
            ),
            key: "pigmentation-2",
          },
          {
            label: (
              <Link to="/service/HYDRAFACIAL?id=65d4905d82786773e7d12f6d">
                HYDRAFACIAL
              </Link>
            ),
            key: "pigmentation-3",
          },
          {
            label: (
              <Link to="/service/PRO%20CLINICAL%20PEEL?id=6597c629a65da702bea4c138">
                PRO CLINICAL PEEL
              </Link>
            ),
            key: "pigmentation-4",
          },
          {
            label: (
              <Link to="/service/MICRONEEDLING?id=654b3a315d1113dac9b90d7f">
                MICRONEEDLING
              </Link>
            ),
            key: "pigmentation-5",
          },
          {
            label: (
              <Link to="/service/RED%20CARPET%20FACIAL?id=654b371213b92aa67e37dbb2">
                RED CARPET FACIAL
              </Link>
            ),
            key: "pigmentation-6",
          },
          {
            label: (
              <Link to="/service/JETPEEL%20FACIAL?id=654b335756cc7f000422611a">
                JETPEEL FACIAL
              </Link>
            ),
            key: "pigmentation-7",
          },
          {
            label: (
              <Link to="/service/COSMELAN%20MD%20PEEL?id=654a401dba0a2cc9d92457a7">
                COSMELAN MD PEEL
              </Link>
            ),
            key: "pigmentation-8",
          },
          {
            label: (
              <Link to="/service/ENLIGHTEN%20MD%20PEEL?id=654a3e0dba0a2cc9d9245791">
                ENLIGHTEN MD PEEL
              </Link>
            ),
            key: "pigmentation-9",
          },
          {
            label: (
              <Link to="/service/IPL%20PIGMENT%20TREATMENT?id=654a3488052d2cb7ce32b50e">
                IPL PIGMENT TREATMENT
              </Link>
            ),
            key: "pigmentation-10",
          },
          {
            label: (
              <Link to="/service/AQUAGOLD%20MICRONEEDLING?id=654a32c0f1739508df4ae321">
                AQUAGOLD MICRONEEDLING
              </Link>
            ),
            key: "pigmentation-11",
          },
          {
            label: (
              <Link to="/service/LASER%20SKIN%20RESURFACING?id=654a2fd1650a02dd15579ddd">
                LASER SKIN RESURFACING
              </Link>
            ),
            key: "pigmentation-12",
          },
          {
            label: (
              <Link to="/service/PERFECT%20DERMA%20PEEL?id=654a1d5a12f66a23b4cf6db0">
                PERFECT DERMA PEEL
              </Link>
            ),
            key: "pigmentation-13",
          },
          {
            label: (
              <Link to="/service/TCA%20PEEL?id=654a041f0645064084c8ad12">
                TCA PEEL
              </Link>
            ),
            key: "pigmentation-14",
          },
          {
            label: (
              <Link to="/service/DERMAMELAN%20PEEL?id=651fe2d9f776a09d2b9f78d2">
                DERMAMELAN PEEL
              </Link>
            ),
            key: "pigmentation-15",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49bdfd8c5a329ce904794">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "pigmentation-16",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b07d8c5a329ce904618">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "pigmentation-17",
          },
        ],
      },
      {
        label: <Link to="/services/services">Acne Scar</Link>,
        key: "acne-scar",
        children: [
          {
            label: (
              <Link to="/service/BIOREPEEL?id=66b4c7d95fc5deae1f36cd21">
                BIOREPEEL
              </Link>
            ),
            key: "acne-scar-1",
          },
          {
            label: (
              <Link to="/service/SALMON%20SPERM%20DNA%20FACIAL?id=66b4c68a5fc5deae1f36aa5e">
                SALMON SPERM DNA FACIAL
              </Link>
            ),
            key: "acne-scar-2",
          },
          {
            label: (
              <Link to="/service/%22SCAR%20FREE%22%20LASER%20TREATMENT?id=6600a294133755405effb3fc">
                "SCAR FREE" LASER TREATMENT
              </Link>
            ),
            key: "acne-scar-3",
          },
          {
            label: (
              <Link to="/service/HYDRAFACIAL?id=65d4905d82786773e7d12f81">
                HYDRAFACIAL
              </Link>
            ),
            key: "acne-scar-4",
          },
          {
            label: (
              <Link to="/service/MICRONEEDLING?id=654b3aba5d1113dac9b90dc8">
                MICRONEEDLING
              </Link>
            ),
            key: "acne-scar-5",
          },
          {
            label: (
              <Link to="/service/ACNE%20PEEL?id=654b30d9c5d68d1a8b7da56a">
                ACNE PEEL
              </Link>
            ),
            key: "acne-scar-6",
          },
          {
            label: (
              <Link to="/service/LASER%20SKIN%20RESURFACING?id=654a2e6394eec01695e7b0bf">
                LASER SKIN RESURFACING
              </Link>
            ),
            key: "acne-scar-7",
          },
          {
            label: (
              <Link to="/service/RF%20MICRONEEDLING?id=654a2aff82e27a60b230be5c">
                RF MICRONEEDLING
              </Link>
            ),
            key: "acne-scar-8",
          },
          {
            label: (
              <Link to="/service/PRP%20MICRONEEDLING?id=654a2158f6152121a1b3e478">
                PRP MICRONEEDLING
              </Link>
            ),
            key: "acne-scar-9",
          },
          {
            label: (
              <Link to="/service/PERFECT%20DERMA%20PEEL?id=654a1ca0cd067d9a581e59ea">
                PERFECT DERMA PEEL
              </Link>
            ),
            key: "acne-scar-10",
          },
          {
            label: (
              <Link to="/service/TCA%20PEEL?id=654a020f0645064084c8ac0a">
                TCA PEEL
              </Link>
            ),
            key: "acne-scar-11",
          },
          {
            label: (
              <Link to="/serivce/VIRTUAL%20CONSULTATION?id=65d49be0d8c5a329ce90479c">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "acne-scar-12",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b07d8c5a329ce90461e">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "acne-scar-13",
          },
        ],
      },
      {
        label: <Link to="/services/services">Laser Hair Removal</Link>,
        key: "laser-hair-removal",
        children: [
          {
            label: (
              <Link to="/service/LASER%20HAIR%20REMOVAL?id=6597f267045ccf8e01e62051">
                LASER HAIR REMOVAL
              </Link>
            ),
            key: "laser-hair-removal-1",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49be0d8c5a329ce9047a4">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "laser-hair-removal-2",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b08d8c5a329ce904624">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "laser-hair-removal-3",
          },
        ],
      },
      {
        label: <Link to="/services/services">IV Injections</Link>,
        key: "iv-injections",
        children: [
          {
            label: (
              <Link to="/service/IRON%20IV%20INFUSION?id=67932aacaa95c5e0b895f99c">
                IRON IV INFUSION
              </Link>
            ),
            key: "iv-injections-1",
          },
          {
            label: (
              <Link to="/service/SUPER%20IMMUNITY%20BOOST?id=66f12e0950fdc333c5e3b439">
                SUPER IMMUNITY BOOST
              </Link>
            ),
            key: "iv-injections-2",
          },
          {
            label: (
              <Link to="/service/IV%20HYDRATION%20NOW?id=66f12d6c50fdc333c5e264c3">
                IV HYDRATION NOW
              </Link>
            ),
            key: "iv-injections-3",
          },
          {
            label: (
              <Link to="/service/PREMIUM%20MYERS%20SPECIAL?id=66f12cb150fdc333c5e0dcf0">
                PREMIUM MYERS SPECIAL
              </Link>
            ),
            key: "iv-injections-4",
          },
          {
            label: (
              <Link to="/service/GLUTATHIONE%20IV%20THERAPY?id=65aa7020ed6ba48c718acaef">
                GLUTATHIONE IV THERAPY
              </Link>
            ),
            key: "iv-injections-5",
          },
          {
            label: (
              <Link to="/service/VIRTUAL%20CONSULTATION?id=65d49be1d8c5a329ce9047ad">
                VIRTUAL CONSULTATION
              </Link>
            ),
            key: "iv-injections-6",
          },
          {
            label: (
              <Link to="/service/IN-PERSON%20CONSULTATION?id=65d49b08d8c5a329ce90462a">
                IN-PERSON CONSULTATION
              </Link>
            ),
            key: "iv-injections-7",
          },
        ],
      },
      {
        label: (
          <Link to="/limited-deals">
            Limited Time Offers
          </Link>
        ),
        key: "limited-offers",
      },
    ],
  },
  {
    link: "/paymentplan",
    title: "PAYMENT PLANS",
  },
  {
    link: "/membership",
    title: "Membership",
  },
  {
    link: "/giftcards",
    title: "GIFT CARDS",
  },
  {
    link: "/checkIngredients",
    title: "CHECK INGREDIENTS",
  },
  {
    title: "ACNE QUIZ",
  },
  {
    link: "/gallery",
    title: "GALLERY",
  },
  {
    link: "/contact",
    title: "CONTACT",
  },
  {
    link: "/aboutus",
    title: "ABOUT US",
  },
];

const WebPages = [
  { value: "/", label: "Home" },
  { value: "/login", label: "Login" },
  { value: "/contact", label: "Contact" },
  { value: "/aboutus", label: "About Us" },
  { value: "/membership", label: "Membership" },
  { value: "/shop", label: "Shop" },
  { value: "/services", label: "Services" },
  { value: "/gallery", label: "Gallery" },
  { value: "/giftcards", label: "Gift Cards" },
  { value: "/acnequiz", label: "Acne Quiz" },
  { value: "/checkIngredients", label: "Check Ingredients" },
  { value: "/appointment", label: "Appointment" },
  { value: "/indiAppointment", label: "Individual Appointment" },
  { value: "/schedule1", label: "Schedule 1" },
  { value: "/schedule2", label: "Schedule 2" },
  { value: "/privacy-policy", label: "Privacy Policy" },
  { value: "/shipping-policy", label: "Shipping Policy" },
  { value: "/return-policy", label: "Return Policy" },
  { value: "/terms", label: "Terms" },
  { value: "/faq", label: "FAQ" },
  { value: "/forget-password", label: "Forget Password" },
  { value: "/changePassword", label: "Change Password" },
  { value: "/signup", label: "Signup" },
  { value: "/mycart", label: "My Cart" },
  { value: "/my-profile", label: "My Profile" },
  { value: "/allNews", label: "All News" },
  { value: "/returningMember", label: "Returning Member" },
  { value: "/limited-deals", label: "Limited Deals" },
  { value: "/give-rating", label: "Give Rating" },
];

export { MenuOptions };