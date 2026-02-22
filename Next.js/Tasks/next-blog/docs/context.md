# 📋 Complete List of Contexts for Your Blog Project

---

## 🎯 **RECOMMENDED: 2 Essential Contexts**

### **Context 1: AuthContext** 🔐
**Priority:** ⭐⭐⭐ Must Have

**Purpose:** Handle all authentication logic

**State It Will Manage:**
- User information (id, name, email, role, avatar)
- Login status (isLoggedIn boolean)
- Admin status (isAdmin boolean)
- Loading state (while checking auth)
- Error messages

**Methods It Will Provide:**
- `login(email, password)` - Log in user
- `logout()` - Log out user
- `checkAuth()` - Verify if user is still logged in
- `updateUser(userData)` - Update user profile (optional)

**Where It Will Be Used:**
- Header (show/hide login button, user menu)
- Admin login page
- All admin pages (check if user is admin)
- Protected routes
- Logout button

**Data Source:**
- `data/users.json` (to verify credentials)
- `localStorage` (to persist session)

---

### **Context 2: ThemeContext** 🎨
**Priority:** ⭐⭐ Highly Recommended

**Purpose:** Manage dark/light mode

**State It Will Manage:**
- Current theme ('light' or 'dark')
- isDark flag (boolean)

**Methods It Will Provide:**
- `toggleTheme()` - Switch between light/dark
- `setTheme(theme)` - Set specific theme

**Where It Will Be Used:**
- All pages (apply theme classes)
- Header (theme toggle button)
- Settings page (theme preference)

**Data Source:**
- `localStorage` (persist user's choice)
- System preference (initial detection)

---

## 🤔 **OPTIONAL: Additional Contexts** (Only if needed)

### **Context 3: SearchContext** 🔍
**Priority:** ⭐ Optional (Can use local state instead)

**Purpose:** Share search state across components

**State It Will Manage:**
- Current search query
- Search results
- Loading state
- Recent searches (last 5)
- Search suggestions

**Methods It Will Provide:**
- `setQuery(query)` - Update search query
- `performSearch(query)` - Execute search
- `clearSearch()` - Clear search results
- `addRecentSearch(query)` - Save to history
- `clearHistory()` - Clear search history

**Where It Will Be Used:**
- Header search bar
- Search results page
- Search dropdown (suggestions)
- Recent searches display

**Data Source:**
- `data/posts.json` (search through posts)
- `localStorage` (store recent searches)

**Why It's Optional:**
- Can use URL params instead: `/search?q=nextjs`
- Can use local state in SearchBar component
- Can pass search results via props

---

### **Context 4: UIContext** 🎛️
**Priority:** ⭐ Optional (Local state is usually better)

**Purpose:** Manage global UI states

**State It Will Manage:**
- Sidebar open/closed (admin)
- Modal open/closed
- Modal type (delete, preview, etc.)
- Global loading state
- Notification/toast queue

**Methods It Will Provide:**
- `toggleSidebar()` - Open/close sidebar
- `openModal(type, data)` - Open specific modal
- `closeModal()` - Close modal
- `setLoading(isLoading)` - Show/hide global loader
- `showNotification(message, type)` - Add notification

**Where It Will Be Used:**
- Admin layout (sidebar toggle)
- Delete confirmations (modal)
- Post preview (modal)
- Global loading overlay
- Multiple notifications

**Why It's Optional:**
- Most UI states are better as local state
- Modals can have their own state
- React-toastify handles notifications
- Sidebar state only needed in admin layout

---

### **Context 5: FavoritesContext** ⭐
**Priority:** ⭐ Optional (Future feature)

**Purpose:** Manage user's favorite/saved posts

**State It Will Manage:**
- Array of favorite post IDs
- Loading state

**Methods It Will Provide:**
- `addFavorite(postId)` - Add to favorites
- `removeFavorite(postId)` - Remove from favorites
- `isFavorite(postId)` - Check if post is favorited
- `getFavorites()` - Get all favorite posts

**Where It Will Be Used:**
- Post page (favorite button)
- Favorites page (list saved posts)
- Post cards (show if favorited)

**Data Source:**
- `localStorage` (persist favorites)

**Why It's Optional:**
- Not in initial requirements
- Can add later if needed
- Simple feature that doesn't need context

---

### **Context 6: NotificationContext** 🔔
**Priority:** ❌ Not Needed (Use react-toastify)

**Purpose:** Manage notifications

**Why You DON'T Need This:**
- Already using `react-toastify` library
- No need to reinvent the wheel
- Toast library is simpler and better

---

## 📊 **Context Priority Summary**

| Context | Priority | Use Cases | Complexity | Skip If... |
|---------|----------|-----------|------------|------------|
| **AuthContext** | ⭐⭐⭐ Must | Login, admin, protected routes | Medium | Never - Always needed |
| **ThemeContext** | ⭐⭐ High | Dark/light mode | Low | You don't want theme toggle |
| **SearchContext** | ⭐ Low | Search state sharing | Low | You use URL params |
| **UIContext** | ⭐ Low | Global UI states | Medium | You use local state |
| **FavoritesContext** | ⭐ Low | Save posts feature | Low | Not building this feature |
| **NotificationContext** | ❌ None | Notifications | Medium | Using react-toastify |

---

## 🎯 **MY RECOMMENDATION**

### **Build Only 2 Contexts:**

```
✅ 1. AuthContext     (Essential)
✅ 2. ThemeContext    (Nice to have)

❌ Skip SearchContext    (Use local state + URL)
❌ Skip UIContext        (Use local state)
❌ Skip FavoritesContext (Add later if needed)
❌ Skip NotificationContext (Have react-toastify)
```

---

## 📁 **File Structure (2 Contexts)**

```
blog-website/
├── contexts/
│   ├── AuthContext.tsx       ← Login/logout/admin
│   └── ThemeContext.tsx      ← Dark/light mode
│
├── hooks/
│   ├── useAuth.ts            ← Wrapper for AuthContext
│   └── useTheme.ts           ← Wrapper for ThemeContext
│
└── app/
    └── layout.tsx            ← Wrap with both providers
```

---

## 🔄 **What to Use Instead of Extra Contexts**

### **Instead of SearchContext:**
```
✅ Use URL search params
   /search?q=nextjs

✅ Use local state in SearchBar
   const [query, setQuery] = useState('')

✅ Pass results as props
   <SearchResults results={results} />
```

### **Instead of UIContext:**
```
✅ Modal state - local in component
   const [modalOpen, setModalOpen] = useState(false)

✅ Sidebar state - local in admin layout
   const [sidebarOpen, setSidebarOpen] = useState(true)

✅ Loading state - per component
   const [loading, setLoading] = useState(false)
```

### **Instead of FavoritesContext:**
```
✅ Custom hook with localStorage
   const useFavorites = () => {
     const [favorites, setFavorites] = useLocalStorage('favorites', [])
     return { favorites, add, remove }
   }
```

---

## ✅ **Final Context Checklist**

```
For Your Blog Project:

Build These:
□ AuthContext
□ ThemeContext

DON'T Build These:
□ SearchContext (use local state)
□ UIContext (use local state)
□ FavoritesContext (not needed yet)
□ NotificationContext (using react-toastify)
□ PostsContext (fetch in components)
□ CategoriesContext (fetch in components)
□ CommentsContext (fetch per post)
```

---

## 🎯 **Decision Guide**

**Ask yourself: "Does this state need to be shared across multiple unrelated components?"**

| State | Shared? | Use Context? |
|-------|---------|--------------|
| User login | ✅ Header, admin, protected routes | ✅ YES - AuthContext |
| Theme | ✅ All pages | ✅ YES - ThemeContext |
| Search query | ❌ Only SearchBar and results | ❌ NO - Use local state |
| Modal open | ❌ Only that modal's parent | ❌ NO - Use local state |
| Posts data | ✅ Many pages BUT... | ❌ NO - Fetch directly |
| Sidebar open | ❌ Only admin layout | ❌ NO - Use local state |
| Form values | ❌ Only that form | ❌ NO - Use Formik |

---

## 💡 **Pro Tips**

1. **Start with 2 contexts** (Auth + Theme)
2. **Don't add contexts "just in case"** - add when you actually need them
3. **If only 1-2 components need state** - use local state
4. **If state is temporary** - use local state
5. **If state needs to persist** - use localStorage + custom hook
6. **Data fetching** - fetch in components, don't store in context

---

## 🚀 **Implementation Order**

```
Day 1:
□ Create AuthContext
□ Create ThemeContext
□ Setup providers in layout

Day 2-3:
□ Use them in components
□ Test login/logout flow
□ Test theme toggle

Day 4-5:
□ If you find yourself passing props through 4+ levels
   → Consider adding a context
□ Otherwise → stick with 2 contexts!
```

---

## 📋 **Quick Summary**

**Minimum Viable Contexts: 2**
1. AuthContext (authentication)
2. ThemeContext (dark mode)

**Everything else:** Use local state, URL params, or fetch directly!

---

**Is this clear? Ready to build the 2 essential contexts?** 🚀