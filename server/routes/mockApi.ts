import { RequestHandler } from "express";

let users: any[] = [];
let restaurants: any[] = [];
let orders: any[] = [];
let menus: any[] = [];

// Seed sample restaurants and menus
function seed() {
  if (restaurants.length) return;
  const sample = [
    {
      id: 42,
      name: "Seafood Pluit 88",
      star: 3,
      place: "Depok",
      logo: null,
      images: [
        "https://foodish-api.com/images/fish/fish2.jpg",
        "https://foodish-api.com/images/fish/fish11.jpg",
      ],
      reviewCount: 1,
      menuCount: 4,
      discount: true,
      bestSeller: false,
      delivery: true,
      lunch: false,
      priceRange: { min: 27000, max: 76672 },
    },
    {
      id: 30,
      name: "Sate Senopati",
      star: 5,
      place: "Bekasi",
      logo: null,
      images: ["https://foodish-api.com/images/rice/rice5.jpg"],
      reviewCount: 4,
      menuCount: 7,
      discount: false,
      bestSeller: true,
      delivery: true,
      lunch: true,
      priceRange: { min: 30599, max: 139161 },
    },
    {
      id: 28,
      name: "Burger Tebet Lab",
      star: 5,
      place: "Jakarta Utara",
      logo: null,
      images: ["https://foodish-api.com/images/burger/burger1.jpg"],
      reviewCount: 2,
      menuCount: 4,
      discount: true,
      bestSeller: true,
      delivery: true,
      lunch: true,
      priceRange: { min: 43500, max: 148548 },
    },
    {
      id: 37,
      name: "Kopi Kuningan",
      star: 5,
      place: "Jakarta Selatan",
      logo: null,
      images: [
        "https://foodish-api.com/images/dessert/cheesecake/cheesecake7.jpg",
      ],
      reviewCount: 2,
      menuCount: 5,
      discount: false,
      bestSeller: false,
      delivery: false,
      lunch: true,
      priceRange: { min: 20928, max: 81193 },
    },
  ];
  restaurants = sample.map((r, i) => ({ ...r, id: r.id + i }));

  // create menus for each
  menus = [];
  restaurants.forEach((r) => {
    for (let i = 1; i <= 6; i++) {
      menus.push({
        id: Number(String(r.id) + String(i)),
        restaurantId: r.id,
        foodName: `${r.name} Item ${i}`,
        price: r.priceRange?.min
          ? r.priceRange.min + i * 1000
          : 25000 + i * 1000,
        type: "Main",
        image: r.images && r.images[0] ? r.images[0] : null,
      });
    }
  });
}

export const handleMockApi: RequestHandler = (req, res) => {
  seed();

  const { method, path } = { method: req.method, path: req.path };

  // AUTH
  if (req.path === "/auth/register" && req.method === "POST") {
    const { name, email, phone, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "email and password required" });
    if (users.find((u) => u.email === email))
      return res.status(400).json({ success: false, message: "User exists" });
    const id = users.length + 1;
    const token = `token-${id}`;
    const user = {
      id,
      name,
      email,
      phone,
      password,
      token,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    return res.json({
      success: true,
      message: "Registered",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  }

  if (req.path === "/auth/login" && req.method === "POST") {
    const { email, password } = req.body;
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    return res.json({
      success: true,
      message: "OK",
      data: {
        user: { id: user.id, name: user.name, email: user.email },
        token: user.token,
      },
    });
  }

  if (req.path === "/auth/profile" && req.method === "GET") {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    const user = users.find((u) => u.token === auth);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Access token required" });
    return res.json({
      success: true,
      message: "OK",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
    });
  }

  // RESTAURANTS list with pagination
  if (req.path === "/resto" && req.method === "GET") {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 12);
    // create large list by repeating restaurants with different ids
    const big: any[] = [];
    const repeat = 100; // generate many
    for (let r = 0; r < repeat; r++) {
      restaurants.forEach((rt) => {
        const id = rt.id + r * 1000;
        big.push({ ...rt, id });
      });
    }
    const start = (page - 1) * limit;
    // apply simple q filters
    const q = String(req.query.q || "")
      .toLowerCase()
      .trim();
    let filtered = big;
    if (q) {
      if (q === "all food" || q === "all restaurant" || q === "all") {
        filtered = big;
      } else if (q === "nearby" || q === "near me") {
        // simulate nearby by place matching 'Depok' or 'Jakarta'
        filtered = big.filter(
          (b) =>
            String(b.place || "")
              .toLowerCase()
              .includes("depok") ||
            String(b.place || "")
              .toLowerCase()
              .includes("jakarta"),
        );
      } else if (q === "discount") {
        filtered = big.filter((b) => b.discount);
      } else if (q === "best seller" || q === "bestseller") {
        filtered = big.filter((b) => b.bestSeller);
      } else if (q === "delivery") {
        filtered = big.filter((b) => b.delivery);
      } else if (q === "lunch") {
        filtered = big.filter((b) => b.lunch);
      } else {
        // generic search by name/place
        filtered = big.filter(
          (b) =>
            (b.name || "").toLowerCase().includes(q) ||
            (b.place || "").toLowerCase().includes(q),
        );
      }
    }

    const paged = filtered.slice(start, start + limit);
    return res.json({
      success: true,
      message: "Success",
      data: {
        restaurants: paged,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      },
    });
  }

  // recommended
  if (req.path === "/resto/recommended" && req.method === "GET") {
    // return first restaurants with sampleMenus
    const recs = restaurants.slice(0, 6).map((r) => ({
      id: r.id,
      name: r.name,
      star: r.star,
      place: r.place,
      logo: r.logo,
      images: r.images,
      reviewCount: r.reviewCount,
      sampleMenus: menus.filter((m) => m.restaurantId === r.id).slice(0, 3),
      isFrequentlyOrdered: true,
    }));
    return res.json({ success: true, data: { recommendations: recs } });
  }

  // restaurant detail
  if (req.path.match(/^\/resto\/.+/) && req.method === "GET") {
    const parts = req.path.split("/");
    const id = Number(parts[2]);
    const r = restaurants.find((x) => Number(x.id) === id);
    if (!r)
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    const m = menus.filter((mm) => mm.restaurantId === r.id);
    return res.json({ success: true, data: { ...r, menus: m, reviews: [] } });
  }

  // create order
  if (req.path === "/orders" && req.method === "POST") {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    const user = users.find((u) => u.token === auth) || null;
    const body = req.body || {};
    const id = orders.length + 1;
    const order = {
      id,
      ...body,
      userId: user?.id ?? null,
      status: "placed",
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    return res.json({ success: true, message: "Order placed", data: order });
  }

  // list orders (user)
  if (req.path === "/orders" && req.method === "GET") {
    const auth = (req.headers.authorization || "").replace("Bearer ", "");
    const user = users.find((u) => u.token === auth) || null;
    const my = user ? orders.filter((o) => o.userId === user.id) : orders;
    return res.json({ success: true, data: my });
  }

  // get specific order
  if (req.path.match(/^\/orders\/.+/) && req.method === "GET") {
    const id = Number(req.path.split("/")[2]);
    const o = orders.find((x) => x.id === id);
    if (!o)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    return res.json({ success: true, data: o });
  }

  // add restaurant
  if (req.path === "/restaurants" && req.method === "POST") {
    const body = req.body || {};
    const id = restaurants.length + 1000;
    const r = {
      id,
      name: body.name || "New Restaurant",
      images: body.images || [],
      logo: body.logo || null,
      place: body.place || null,
      star: 0,
      reviewCount: 0,
      menuCount: 0,
      priceRange: { min: 0, max: 0 },
    };
    restaurants.push(r);
    return res.json({ success: true, data: r });
  }

  // add menu to restaurant
  if (req.path.match(/^\/restaurants\/\d+\/menus$/) && req.method === "POST") {
    const parts = req.path.split("/");
    const rid = Number(parts[2]);
    const body = req.body || {};
    const id = menus.length + 100000;
    const m = {
      id,
      restaurantId: rid,
      foodName: body.name || body.foodName || "Dish",
      price: body.price || 0,
      type: body.type || "Main",
      image: body.image || null,
    };
    menus.push(m);
    return res.json({ success: true, data: m });
  }

  // payment methods
  if (req.path === "/payment-methods" && req.method === "GET") {
    const pm = [
      { id: "cash", name: "Cash on Delivery" },
      { id: "va_bca", name: "Bank Transfer (BCA)" },
      { id: "va_bni", name: "Bank Transfer (BNI)" },
      { id: "credit", name: "Credit Card" },
      { id: "ovo", name: "OVO" },
    ];
    return res.json({ success: true, data: pm });
  }

  // FAQ
  if (req.path === "/faq" && req.method === "GET") {
    const faqs = [
      {
        id: 1,
        q: "How do I place an order?",
        a: "Browse restaurants, add items to cart, then checkout.",
      },
      {
        id: 2,
        q: "What payment methods are available?",
        a: "Cash, bank transfers, credit card, and e-wallets.",
      },
      {
        id: 3,
        q: "How do I track my order?",
        a: "Go to Track Order and enter your order id.",
      },
    ];
    return res.json({ success: true, data: faqs });
  }

  // contact
  if (req.path === "/contact" && req.method === "POST") {
    const body = req.body || {};
    // echo back
    return res.json({
      success: true,
      message: "Thanks for contacting us",
      data: body,
    });
  }

  // track order (alias)
  if (req.path.match(/^\/track\/.+/) && req.method === "GET") {
    const id = Number(req.path.split("/")[2]);
    const o = orders.find((x) => x.id === id);
    if (!o)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    // simulate status timeline
    const timeline = [
      { status: "placed", time: o.createdAt },
      {
        status: "accepted",
        time: new Date(
          new Date(o.createdAt).getTime() + 2 * 60 * 1000,
        ).toISOString(),
      },
      {
        status: "preparing",
        time: new Date(
          new Date(o.createdAt).getTime() + 10 * 60 * 1000,
        ).toISOString(),
      },
      {
        status: "out_for_delivery",
        time: new Date(
          new Date(o.createdAt).getTime() + 25 * 60 * 1000,
        ).toISOString(),
      },
      {
        status: "delivered",
        time: new Date(
          new Date(o.createdAt).getTime() + 40 * 60 * 1000,
        ).toISOString(),
      },
    ];
    return res.json({ success: true, data: { order: o, timeline } });
  }

  // add review
  if (
    req.path.match(/^\/restaurants\/\d+\/reviews$/) &&
    req.method === "POST"
  ) {
    const parts = req.path.split("/");
    const rid = Number(parts[2]);
    const body = req.body || {};
    const review = {
      id: Date.now(),
      restaurantId: rid,
      rating: body.rating || 5,
      comment: body.comment || "",
      user: body.user || null,
      createdAt: new Date().toISOString(),
    };
    // not storing reviews separate for simplicity
    return res.json({ success: true, data: review });
  }

  // default 404
  return res.status(404).json({ success: false, message: "Not found" });
};
