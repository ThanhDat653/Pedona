var products = [
    {
        name: "nike",
        type: "jd3",
        id: "jd3-black",
        color: "black",
        price: 200,
        img: "./",
        desc: ""
    },

    {
        name: "nike",
        type: "jd3",
        id: "jd3-khaki",
        color: "khaki",
        price: 200,
        img: "./",
        desc: ""
    },
]

var users = [
    {
        username: "admin",
        pass: "123",
        userID: 0,
        name: "nguyen van a"
    }
]


var carts = [ 
    {
        name: "",   // carts[0].name = users[0].name;
        cartID: "1", // lấy ID của user và duyệt vào mảng carts để tìm và hiển thị giỏ hàng 
        productList: [
            {
                product: products[1],
                amount: 2,
                total: 200,
                check: true
            },

            {
                product: products[0],
                amount: 2,
                total: 200,
                check: false
            }
            
        ]
    },

    {
        name: "",   // carts[0].name = users[0].name;
        cartID: "2", // lấy ID của user và duyệt vào mảng carts để tìm và hiển thị giỏ hàng 
        productList: [
            {
                product: products[1],
                amount: 2,
                total: 200
            },

            {
                product: products[1],
                amount: 2,
                total: 200
            }
            
        ]
    }
]

// for(var i = 0; i < carts.length; i++)
    console.log(carts[0]);
