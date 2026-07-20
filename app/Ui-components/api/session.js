const USER_KEYS = [
  "loggedUser",
  "token",
  "customerToken",
  "cart",
  "wishlist",
  "shippingInfo",
  "sessionId",
];

export function getLoggedUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem("loggedUser") || "null");
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const user = getLoggedUser();
  const token = localStorage.getItem("customerToken");
  return !!(user?.email && token);
}

function setAuthCookie(on) {
  if (typeof document === "undefined") return;
  document.cookie = on
    ? "fashique_session=1; path=/; max-age=604800; SameSite=Lax"
    : "fashique_session=; path=/; max-age=0; SameSite=Lax";
}

/** Keep cookie in sync so middleware can force login before paint. */
export function syncAuthCookie() {
  setAuthCookie(isAuthenticated());
}

function scopedKey(base, userId) {
  const id =
    userId ||
    (() => {
      const user = getLoggedUser();
      return user?.id || user?.email || "guest";
    })();
  return `${base}:${id}`;
}

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function notifyStorage() {
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new Event("fashique-auth-change"));
}

function mergeLists(a, b) {
  const map = new Map();
  for (const item of [...(a || []), ...(b || [])]) {
    if (!item?.id) continue;
    const prev = map.get(item.id);
    if (!prev) {
      map.set(item.id, item);
      continue;
    }
    map.set(item.id, {
      ...prev,
      ...item,
      qty: Math.max(Number(prev.qty || 1), Number(item.qty || 1)),
    });
  }
  return Array.from(map.values());
}

function claimGuestData(userId) {
  const guestCart = readJson("cart:guest", []);
  const guestWish = readJson("wishlist:guest", []);
  const guestShip = readJson("shippingInfo:guest", null);
  const guestSession = localStorage.getItem("sessionId:guest");

  const userCartKey = scopedKey("cart", userId);
  const userWishKey = scopedKey("wishlist", userId);
  const userShipKey = scopedKey("shippingInfo", userId);
  const userSessionKey = scopedKey("sessionId", userId);

  const mergedCart = mergeLists(readJson(userCartKey, []), guestCart);
  const mergedWish = mergeLists(readJson(userWishKey, []), guestWish);

  localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
  localStorage.setItem(userWishKey, JSON.stringify(mergedWish));

  if (guestShip && !localStorage.getItem(userShipKey)) {
    localStorage.setItem(userShipKey, JSON.stringify(guestShip));
  }
  if (guestSession && !localStorage.getItem(userSessionKey)) {
    localStorage.setItem(userSessionKey, guestSession);
  }

  ["cart:guest", "wishlist:guest", "shippingInfo:guest", "sessionId:guest"].forEach(
    (k) => localStorage.removeItem(k)
  );
  ["cart", "wishlist", "shippingInfo", "sessionId"].forEach((k) =>
    localStorage.removeItem(k)
  );
}

export function clearSessionData() {
  if (typeof window === "undefined") return;

  for (const key of USER_KEYS) {
    localStorage.removeItem(key);
  }

  setAuthCookie(false);
  notifyStorage();
}

export function setLoggedUser(user, token) {
  if (typeof window === "undefined") return;

  const previous = getLoggedUser();
  const nextId = user?.id || user?.email || "";
  const prevId = previous?.id || previous?.email || "";

  if (!prevId || (nextId && prevId !== nextId)) {
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("shippingInfo");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("token");
    localStorage.removeItem("customerToken");
  }

  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      id: user?.id || "",
      username: user?.username || user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    })
  );

  if (token) {
    localStorage.setItem("customerToken", token);
  }

  localStorage.removeItem("token");
  setAuthCookie(true);

  if (nextId) {
    claimGuestData(nextId);
  }

  notifyStorage();
}

export function getCart() {
  if (typeof window === "undefined") return [];
  const scoped = localStorage.getItem(scopedKey("cart"));
  if (scoped) {
    try {
      return JSON.parse(scoped);
    } catch {
      return [];
    }
  }
  const legacy = localStorage.getItem("cart");
  if (legacy) {
    localStorage.removeItem("cart");
    if (!getLoggedUser()) {
      try {
        const parsed = JSON.parse(legacy);
        setCart(parsed);
        return parsed;
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function setCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem(scopedKey("cart"), JSON.stringify(cart || []));
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("storage"));
}

export function getWishlist() {
  if (typeof window === "undefined") return [];
  const scoped = localStorage.getItem(scopedKey("wishlist"));
  if (scoped) {
    try {
      return JSON.parse(scoped);
    } catch {
      return [];
    }
  }
  const legacy = localStorage.getItem("wishlist");
  if (legacy) {
    localStorage.removeItem("wishlist");
    if (!getLoggedUser()) {
      try {
        const parsed = JSON.parse(legacy);
        setWishlist(parsed);
        return parsed;
      } catch {
        return [];
      }
    }
  }
  return [];
}

export function setWishlist(wishlist) {
  if (typeof window === "undefined") return;
  localStorage.setItem(scopedKey("wishlist"), JSON.stringify(wishlist || []));
  localStorage.removeItem("wishlist");
  window.dispatchEvent(new Event("storage"));
}

export function getShippingInfo() {
  if (typeof window === "undefined") return null;
  const scoped = localStorage.getItem(scopedKey("shippingInfo"));
  if (scoped) {
    try {
      return JSON.parse(scoped);
    } catch {
      return null;
    }
  }
  const legacy = localStorage.getItem("shippingInfo");
  if (!legacy) return null;
  localStorage.removeItem("shippingInfo");
  if (!getLoggedUser()) {
    try {
      const parsed = JSON.parse(legacy);
      setShippingInfo(parsed);
      return parsed;
    } catch {
      return null;
    }
  }
  return null;
}

export function setShippingInfo(info) {
  if (typeof window === "undefined") return;
  localStorage.setItem(scopedKey("shippingInfo"), JSON.stringify(info));
  localStorage.removeItem("shippingInfo");
}

export function getSessionId() {
  if (typeof window === "undefined") return "";
  const key = scopedKey("sessionId");
  let id = localStorage.getItem(key);
  if (!id) {
    id = localStorage.getItem("sessionId") || `session-${Date.now()}`;
    localStorage.setItem(key, id);
    localStorage.removeItem("sessionId");
  }
  return id;
}

export function clearCheckoutData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(scopedKey("cart"));
  localStorage.removeItem(scopedKey("shippingInfo"));
  localStorage.removeItem("cart");
  localStorage.removeItem("shippingInfo");
  window.dispatchEvent(new Event("storage"));
}
