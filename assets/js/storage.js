// ---------- PRODUCT LIST ----------

const products = [
  {
    name: "Jordan Delta 3 Mid",
    type: "jd3",
    id: "jd3-black",
    color: "black",
    price: 200,
    img: "./assets/image/jordan_delta_3_black.png",
    desc: "Inspired by '90s on-court gear and the Space-Age aesthetic, the Delta 3 is ready to launch. With super-lightweight technical materials, they have a retro-futuristic look and feel. This is the next-gen footwear that's gonna take you into tomorrow",
  },

  {
    name: "Jordan Delta 3 Mid",
    type: "jd3",
    id: "jd3-khaki",
    color: "khaki",
    price: 200,
    img: "./assets/image/jordan_delta_3_khaki.png",
    desc: "Inspired by '90s on-court gear and the Space-Age aesthetic, the Delta 3 is ready to launch. With super-lightweight technical materials, they have a retro-futuristic look and feel. This is the next-gen footwear that's gonna take you into tomorrow",
  },

  {
    name: "Air Jordan 1",
    type: "jd1",
    id: "jd1-white",
    color: "white",
    price: 200,
    img: "./assets/image/jordan_1_black_white.png",
    desc: "Making iconic style even more comfortable. The Air Jordan 1 Zoom Cmft remakes the 1st Air Jordan with lightweight, low-profile cushioning and elements that improve wearability. Leathers and textiles in the upper have a broken-in feel. A lined, padded collar cups the heel for a secure fit.",
  },

  {
    name: "Air Jordan 1",
    type: "jd1",
    id: "jd1-yellow",
    color: "yellow",
    price: 200,
    img: "./assets/image/jordan_1_yellow.png",
    desc: "Making iconic style even more comfortable. The Air Jordan 1 Zoom Cmft remakes the 1st Air Jordan with lightweight, low-profile cushioning and elements that improve wearability. Leathers and textiles in the upper have a broken-in feel. A lined, padded collar cups the heel for a secure fit.",
  },

  {
    name: "Air Jordan 1",
    type: "jd1",
    id: "jd1-orange",
    color: "orange",
    price: 200,
    img: "./assets/image/jordan_1_orange.png",
    desc: "Making iconic style even more comfortable. The Air Jordan 1 Zoom Cmft remakes the 1st Air Jordan with lightweight, low-profile cushioning and elements that improve wearability. Leathers and textiles in the upper have a broken-in feel. A lined, padded collar cups the heel for a secure fit.",
  },

  {
    name: "Air Jordan 1",
    type: "jd1",
    id: "jd1-violet",
    color: "violet",
    price: 200,
    img: "./assets/image/jordan_1_violet.png",
    desc: "Making iconic style even more comfortable. The Air Jordan 1 Zoom Cmft remakes the 1st Air Jordan with lightweight, low-profile cushioning and elements that improve wearability. Leathers and textiles in the upper have a broken-in feel. A lined, padded collar cups the heel for a secure fit.",
  },

  {
    name: "Nike Air Max 270",
    type: "AirMax",
    id: "AM270-white-black",
    color: "white-back",
    price: 200,
    img: "./assets/image/nike_airmax_270_white_black.png",
    desc: "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colours.",
  },

  {
    name: "Nike Air Max 270",
    type: "AirMax",
    id: "AM270-white",
    color: "white",
    price: 200,
    img: "./assets/image/nike_airmax_270_white.png",
    desc: "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colours.",
  },

  {
    name: "Nike Air Max 270",
    type: "AirMax",
    id: "AM270-black",
    color: "black",
    price: 200,
    img: "./assets/image/nike_airmax_270_black.png",
    desc: "Nike's first lifestyle Air Max brings you style, comfort and big attitude in the Nike Air Max 270. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colours.",
  },
];

// ---------- USER LIST ----------
const users = [
  {
    username: "admin",
    pass: "123456",
    userID: "0",
    name: "nguyen van a",
    carts: [],
  },

  {
    username: "thanhdat653",
    pass: "123456",
    userID: "1",
    name: "nguyen thanh dat",
    carts: [],
  },

  {
    username: "nguyenvana123",
    pass: "123456",
    userID: "2",
    name: "nguyen van a",
    carts: [],
  },
];

// ---------- ORDERS LIST ----------

const orders = [
  {
    name: "nguyen thanh dat", // carts[0].name = users[0].name;
    orderID: "1", // lấy ID của user và duyệt vào mảng carts để tìm và hiển thị giỏ hàng
    productList: [],
    time: "",
    total: 0,
  },
];

export { products, users, orders };

export function gItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function sItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// trong orders sẽ chứa tất cả đơn hàng của shop
// mỗi user sẽ có 1 danh sách đơn hàng
// khi click chọn mua hàng, sẽ thêm đơn hàng đó vào cả user.orders và orders
