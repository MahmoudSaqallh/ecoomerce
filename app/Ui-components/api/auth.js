const API_URL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")) ||
  "http://localhost:3002";

/** Site public assets stay on Next; only uploaded files use the API origin. */
export function resolveMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads/")) return `${API_URL}${url}`;
  return url;
}

export async function registerCustomer({ username, email, password, phone }) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      name: username,
      email,
      password,
      phone: phone || "",
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Registration Failed");
  }
  return data;
}

export async function customerLogin(usernameOrEmail, password) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/auth/customer-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: usernameOrEmail,
        username: usernameOrEmail,
        password,
      }),
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_URL}. Make sure the backend is running.`
    );
  }

  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(
      `API returned an invalid response from ${API_URL}. Is the backend on the right port?`
    );
  }

  if (!response.ok) {
    throw new Error(data.error || "Login Failed");
  }
  return data;
}

export async function sendContactMessage(payload) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        subject: payload.subject || "Contact Us",
      }),
    });
  } catch {
    throw new Error(
      `Cannot reach API at ${API_URL}. Make sure the backend is running.`
    );
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Failed to send message");
  }
  return data;
}

export async function submitComplaint(payload) {
  const email = getCustomerEmail() || payload.email;
  const response = await fetch(`${API_URL}/api/complaints`, {
    method: "POST",
    headers: getCustomerAuthHeaders(),
    body: JSON.stringify({
      ...payload,
      email,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to submit complaint");
  }
  return data;
}

function getCustomerEmail() {
  if (typeof window === "undefined") return "";
  try {
    const user = JSON.parse(localStorage.getItem("loggedUser") || "null");
    return String(user?.email || "")
      .toLowerCase()
      .trim();
  } catch {
    return "";
  }
}

function getCustomerAuthHeaders() {
  const headers = { "Content-Type": "application/json" };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("customerToken");
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchNotifications() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("customerToken")
      : null;
  if (!token && !getCustomerEmail()) {
    return { notifications: [], unreadCount: 0 };
  }

  const response = await fetch(`${API_URL}/api/notifications`, {
    headers: getCustomerAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch notifications");
  }
  return {
    notifications: data.notifications || [],
    unreadCount: data.unreadCount || 0,
  };
}

export async function markNotificationRead(id) {
  const response = await fetch(`${API_URL}/api/notifications/${id}/read`, {
    method: "PATCH",
    headers: getCustomerAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update notification");
  }
  return data;
}

export async function markAllNotificationsRead() {
  const response = await fetch(`${API_URL}/api/notifications/read-all`, {
    method: "PATCH",
    headers: getCustomerAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to mark all as read");
  }
  return data;
}

export async function deleteNotification(id) {
  const response = await fetch(`${API_URL}/api/notifications/${id}`, {
    method: "DELETE",
    headers: getCustomerAuthHeaders(),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Failed to delete notification");
  }
  return data;
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/api/categories`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch categories");
  }
  return data.categories || [];
}

export async function fetchMyOrders() {
  const response = await fetch(`${API_URL}/api/orders/mine`, {
    headers: getCustomerAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch orders");
  }
  return data.orders || [];
}

export async function fetchMyOrderById(id) {
  const response = await fetch(
    `${API_URL}/api/orders/mine/${encodeURIComponent(id)}`,
    { headers: getCustomerAuthHeaders() }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Order not found");
  }
  return data.order;
}

export async function fetchItemReviews(itemId) {
  const response = await fetch(
    `${API_URL}/api/reviews?itemId=${encodeURIComponent(itemId)}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch reviews");
  }
  return {
    reviews: data.reviews || [],
    average: data.average || 0,
    count: data.count || 0,
  };
}

export async function submitReview({ itemId, rating, comment }) {
  const response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: getCustomerAuthHeaders(),
    body: JSON.stringify({ itemId, rating, comment }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to submit review");
  }
  return data.review;
}

export async function fetchItems(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.category) qs.set("category", params.category);
  if (params.minPrice != null) qs.set("minPrice", String(params.minPrice));
  if (params.maxPrice != null) qs.set("maxPrice", String(params.maxPrice));
  if (params.inStock) qs.set("inStock", "1");
  if (params.size) qs.set("size", params.size);
  if (params.color) qs.set("color", params.color);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.onSale) qs.set("onSale", "1");
  if (params.subcategory) qs.set("subcategory", params.subcategory);
  if (params.sort) qs.set("sort", params.sort);

  const url = qs.toString()
    ? `${API_URL}/api/items?${qs.toString()}`
    : `${API_URL}/api/items`;
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch items");
  }
  return {
    items: (data.items || []).map(normalizeItem),
    total: data.total ?? (data.items || []).length,
    page: data.page || 1,
    limit: data.limit || 0,
  };
}

export async function fetchItemById(id) {
  const response = await fetch(
    `${API_URL}/api/items/${encodeURIComponent(id)}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Product not found");
  }
  return normalizeItem(data.item);
}

function normalizeItem(item) {
  if (!item) return item;
  const imageUrl = resolveMediaUrl(item.imageUrl || item.image_url || "");
  return { ...item, imageUrl };
}

export async function fetchBanners() {
  const response = await fetch(`${API_URL}/api/banners`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch banners");
  return (data.banners || []).map((b) => {
    const imageUrl = resolveMediaUrl(b.imageUrl || b.image_url || "");
    return { ...b, imageUrl };
  });
}

export async function fetchSubcategories() {
  const response = await fetch(`${API_URL}/api/subcategories`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to fetch subcategories");
  return data.subcategories || [];
}

export async function validateCoupon(code, subtotal) {
  const response = await fetch(`${API_URL}/api/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, subtotal }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Invalid coupon");
  return data;
}

export async function trackOrder({ orderId, email, phone }) {
  const qs = new URLSearchParams({ orderId });
  if (email) qs.set("email", email);
  if (phone) qs.set("phone", phone);
  const response = await fetch(`${API_URL}/api/orders/track?${qs.toString()}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Order not found");
  return data.order;
}

export { API_URL };
