const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
var uuid = require('uuid');
const fs = require("fs");
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.post("/products", (req, res) => {
    const ProductList = readJSONFile();
    const newProduct = req.body;
    newProduct.id = uuid.v1();
    ProductList.push(newProduct);
    writeJSONFile(ProductList);
    res.json(newProduct);
});

app.post("/orders", (req, res) => {
    const OrderList = readOrders();
    const newOrder = req.body;
    newOrder.id = uuid.v1();
    OrderList.push(newOrder);
    writeOrders(OrderList);
    res.json(newOrder);
});

app.post("/users", (req, res) => {
    const userList = readUsers();
    const newUser = req.body;
    newUser.id = uuid.v1();
    userList.push(newUser);
    writeUsers(userList);
    res.json(newUser);
});

app.get("/products/:id", (req, res) => {
    const ProductList = readJSONFile();
    const id = req.params.id;
    let flag = false;
    let Product;

    ProductList.forEach(currentProduct => {
        if (id == currentProduct.id) {
            flag = true;
            Product = currentProduct;
        }
    });

    if (flag) {
        res.json(Product);
    } else {
        res.status(404).send('Product ${id} was not found');
    }
});

app.get("/orders/:id", (req, res) => {
    const OrderList = readOrders();
    const id = req.params.id;
    let flag = false;
    let Order;

    OrderList.forEach(currentOrder => {
        if (id == currentOrder.id) {
            flag = true;
            Order = currentOrder;
        }
    });

    if (flag) {
        res.json(Order);
    } else {
        res.status(404).send('Order ${id} was not found');
    }
});

app.get("/products", (req, res) => {
    const ProductList = readJSONFile();
    res.json(ProductList);
});

app.get("/users", (req, res) => {
    const userList = readUsers();
    res.json(userList);
});

app.get("/orders", (req, res) => {
    const OrderList = readOrders();
    res.json(OrderList);
});

app.put("/products/:id", (req, res) => {
    const ProductList = readJSONFile();
    const id = req.params.id;
    const newProduct = req.body;

    newProduct.id = id;
    let flag = false;

    const newProductList = ProductList.map((Product) => {
        if (Product.id == id) {
            flag = true;
            return newProduct;
        }
        return Product;
    });

    writeJSONFile(newProductList);

    if (flag == true) {
        res.json(newProduct);
    } else {
        res.status(404).send('Product ${id} was not found');
    }
});

app.put("/orders/:id", (req, res) => {
    const OrderList = readOrders();
    const id = req.params.id;
    const newOrder = req.body;

    newOrder.id = id;
    let flag = false;

    const newOrderList = OrderList.map((Order) => {
        if (Order.id == id) {
            flag = true;
            return newOrder;
        }
        return Order;
    });

    writeOrders(newOrderList);

    if (flag == true) {
        res.json(newOrder);
    } else {
        res.status(404).send('Order ${id} was not found');
    }
});

app.delete("/products/:id", (req, res) => {
    const ProductList = readJSONFile();
    const id = req.params.id;
    const newProductList = ProductList.filter((Product) => Product.id != id);

    if (ProductList.length !== newProductList.length) {
        res.status(200).send('Product ${id} was removed');
        writeJSONFile(newProductList);
    } else {
        res.status(404).send('Product ${id} was not found');
    }
});

app.delete("/orders/:id", (req, res) => {
    const OrderList = readOrders();
    const id = req.params.id;
    const newOrderList = OrderList.filter((Order) => Order.id != id);

    if (OrderList.length !== newOrderList.length) {
        res.status(200).send('Order ${id} was removed');
        writeOrders(newOrderList);
    } else {
        res.status(404).send('Order ${id} was not found');
    }
});

function readJSONFile() {
    return JSON.parse(fs.readFileSync("db.json"))["products"];
}

function readUsers() {
    return JSON.parse(fs.readFileSync("login.json"))["users"];
}

function readOrders() {
    return JSON.parse(fs.readFileSync("orders.json"))["orders"];
}

function writeJSONFile(content) {
    fs.writeFileSync(
        "db.json",
        JSON.stringify({products: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

function writeUsers(content) {
    fs.writeFileSync(
        "login.json",
        JSON.stringify({users: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

function writeOrders(content) {
    fs.writeFileSync(
        "orders.json",
        JSON.stringify({orders: content}),
        "utf8",
        err => {
            if (err) {
                console.log(err);
            }
        }
    );
}

app.listen("3000", () =>
    console.log("Server started at: http://localhost:3000")
);