# 🛠️ Complete Utils List for Your Blog Project

---

## 📁 **Utils Folder Structure**

```
utils/
├── data/
│   ├── readPosts.ts          ← Read posts from JSON
│   ├── readCategories.ts     ← Read categories from JSON
│   ├── readUsers.ts          ← Read users from JSON
│   ├── readComments.ts       ← Read comments from JSON
│   ├── writePosts.ts         ← Write posts to JSON
│   └── writeComments.ts      ← Write comments to JSON
│
├── formatting/
│   ├── formatDate.ts         ← Format dates (date-fns)
│   ├── formatNumber.ts       ← Format numbers (1.2k, 1.5M)
│   ├── truncateText.ts       ← Truncate long text
│   └── readingTime.ts        ← Calculate reading time
│
├── validation/
│   ├── validationSchemas.ts  ← Yup schemas for forms
│   ├── validateEmail.ts      ← Email validation
│   └── validatePassword.ts   ← Password validation
│
├── string/
│   ├── slugify.ts            ← Convert text to URL slug
│   ├── capitalize.ts         ← Capitalize text
│   ├── stripHtml.ts          ← Remove HTML tags
│   └── generateExcerpt.ts    ← Create excerpt from content
│
├── array/
│   ├── paginate.ts           ← Paginate arrays
│   ├── sortByDate.ts         ← Sort items by date
│   ├── filterByCategory.ts   ← Filter posts by category
│   └── searchPosts.ts        ← Search through posts
│
├── image/
│   ├── uploadToCloudinary.ts ← Upload image to Cloudinary
│   ├── getImageUrl.ts        ← Get optimized image URL
│   └── validateImage.ts      ← Validate image file
│
├── auth/
│   ├── hashPassword.ts       ← Hash passwords (future)
│   ├── comparePassword.ts    ← Compare passwords (future)
│   └── generateToken.ts      ← Generate session token
│
└── helpers/
    ├── generateId.ts         ← Generate unique IDs (uuid)
    ├── copyToClipboard.ts    ← Copy text to clipboard
    ├── downloadFile.ts       ← Download file helper
    └── classNames.ts         ← Conditional class names (cn)
```

---

## 📋 **Complete Utils List by Category**

---

## 1️⃣ **DATA UTILS** (6 utils)

### **1.1 readPosts.ts**
**Purpose:** Read and filter posts from JSON file

**Functions:**
- `getAllPosts()` - Get all posts
- `getPublishedPosts()` - Get only published posts
- `getDraftPosts()` - Get only drafts
- `getPostById(id)` - Get single post by ID
- `getPostBySlug(slug)` - Get single post by slug
- `getFeaturedPosts()` - Get featured posts
- `getRecentPosts(limit)` - Get recent posts
- `getPostsByCategory(categoryId)` - Filter by category
- `getPostsByTag(tagId)` - Filter by tag
- `getPostsByAuthor(authorId)` - Filter by author

**Used in:**
- Homepage (featured, recent)
- Blog list page
- Single post page
- Category pages
- Admin posts management

---

### **1.2 readCategories.ts**
**Purpose:** Read categories from JSON

**Functions:**
- `getAllCategories()` - Get all categories
- `getCategoryById(id)` - Get single category
- `getCategoryBySlug(slug)` - Get by slug
- `getCategoriesWithCount()` - Get categories with post count

**Used in:**
- Homepage (categories section)
- Category pages
- Post form (category dropdown)
- Navigation

---

### **1.3 readUsers.ts**
**Purpose:** Read users from JSON

**Functions:**
- `getAllUsers()` - Get all users
- `getUserById(id)` - Get single user
- `getUserByEmail(email)` - Get by email
- `verifyUser(email, password)` - Check login credentials

**Used in:**
- Login page
- Admin dashboard
- Post author info

---

### **1.4 readComments.ts**
**Purpose:** Read comments from JSON

**Functions:**
- `getAllComments()` - Get all comments
- `getCommentsByPost(postId)` - Get comments for specific post
- `getApprovedComments(postId)` - Get approved comments only
- `getPendingComments()` - Get pending comments (admin)
- `getCommentCount(postId)` - Count comments for post

**Used in:**
- Single post page (show comments)
- Admin comments management
- Dashboard (pending count)

---

### **1.5 writePosts.ts**
**Purpose:** Write/update posts to JSON

**Functions:**
- `createPost(postData)` - Add new post
- `updatePost(id, postData)` - Update existing post
- `deletePost(id)` - Delete post
- `publishPost(id)` - Publish draft
- `unpublishPost(id)` - Unpublish post
- `incrementViews(id)` - Increment view count
- `updateLikes(id, count)` - Update like count

**Used in:**
- Admin create post
- Admin edit post
- Admin delete post
- View counter
- Like button

---

### **1.6 writeComments.ts**
**Purpose:** Write comments to JSON

**Functions:**
- `addComment(commentData)` - Add new comment
- `approveComment(id)` - Approve pending comment
- `deleteComment(id)` - Delete comment

**Used in:**
- Post page (add comment)
- Admin comments management

---

## 2️⃣ **FORMATTING UTILS** (4 utils)

### **2.1 formatDate.ts**
**Purpose:** Format dates in various ways

**Functions:**
- `formatDate(date)` - "Dec 17, 2024"
- `formatDateTime(date)` - "Dec 17, 2024 at 3:45 PM"
- `formatRelative(date)` - "2 hours ago", "3 days ago"
- `formatShortDate(date)` - "12/17/24"
- `formatMonthYear(date)` - "December 2024"
- `isToday(date)` - Check if date is today
- `isThisWeek(date)` - Check if date is this week

**Used in:**
- Post cards (publish date)
- Comments (time ago)
- Admin dashboard (recent activity)
- Everywhere dates are shown

---

### **2.2 formatNumber.ts**
**Purpose:** Format large numbers

**Functions:**
- `formatNumber(num)` - 1234 → "1.2K", 1234567 → "1.2M"
- `formatViews(num)` - "1.2K views"
- `formatLikes(num)` - "245 likes"
- `formatCompact(num)` - Compact notation

**Used in:**
- Post cards (views, likes)
- Dashboard stats
- Comment counts

---

### **2.3 truncateText.ts**
**Purpose:** Truncate long text

**Functions:**
- `truncate(text, maxLength)` - "Hello World..." (with ellipsis)
- `truncateWords(text, wordCount)` - Truncate by word count
- `truncateSmart(text, maxLength)` - Smart truncate (don't break words)

**Used in:**
- Post excerpts
- Category descriptions
- Comment previews
- Meta descriptions

---

### **2.4 readingTime.ts**
**Purpose:** Calculate reading time

**Functions:**
- `calculateReadingTime(content)` - "5 min read"
- `getReadingMinutes(content)` - Returns just number (5)
- `getWordCount(content)` - Count words in content

**Used in:**
- Single post page (reading time)
- Post cards (optional)

---

## 3️⃣ **VALIDATION UTILS** (3 utils)

### **3.1 validationSchemas.ts**
**Purpose:** Yup schemas for all forms

**Schemas:**
- `loginSchema` - Login form validation
- `postSchema` - Create/edit post validation
- `commentSchema` - Comment form validation
- `categorySchema` - Category form validation
- `contactSchema` - Contact form validation

**Used in:**
- All forms with Formik
- API route validation

---

### **3.2 validateEmail.ts**
**Purpose:** Email validation

**Functions:**
- `isValidEmail(email)` - Check if email is valid
- `normalizeEmail(email)` - Lowercase and trim

**Used in:**
- Login form
- Comment form
- Contact form

---

### **3.3 validatePassword.ts**
**Purpose:** Password validation

**Functions:**
- `isStrongPassword(password)` - Check password strength
- `getPasswordStrength(password)` - "weak", "medium", "strong"
- `validatePasswordRules(password)` - Check specific rules

**Used in:**
- Login form
- Change password form (future)

---

## 4️⃣ **STRING UTILS** (4 utils)

### **4.1 slugify.ts**
**Purpose:** Convert text to URL-friendly slug

**Functions:**
- `slugify(text)` - "Hello World" → "hello-world"
- `uniqueSlug(text, existingSlugs)` - Ensure unique slug
- `slugifyWithId(text, id)` - Add ID to slug

**Used in:**
- Post creation (auto-generate slug from title)
- Category creation
- Tag creation

---

### **4.2 capitalize.ts**
**Purpose:** Capitalize text

**Functions:**
- `capitalize(text)` - "hello" → "Hello"
- `capitalizeWords(text)` - "hello world" → "Hello World"
- `capitalizeFirst(text)` - Only first letter

**Used in:**
- Category names
- User names
- Form fields

---

### **4.3 stripHtml.ts**
**Purpose:** Remove HTML tags from text

**Functions:**
- `stripHtml(html)` - Remove all HTML tags
- `stripHtmlKeepText(html)` - Remove tags, keep text content
- `sanitizeHtml(html)` - Clean dangerous HTML

**Used in:**
- Generate plain text excerpt
- Search functionality
- Meta descriptions

---

### **4.4 generateExcerpt.ts**
**Purpose:** Create excerpt from content

**Functions:**
- `generateExcerpt(content, length)` - Create short excerpt
- `smartExcerpt(content, length)` - Smart excerpt (end at sentence)
- `excerptFromHtml(html, length)` - Extract from HTML content

**Used in:**
- Post cards (if no manual excerpt)
- Search results
- Social media previews

---

## 5️⃣ **ARRAY UTILS** (4 utils)

### **5.1 paginate.ts**
**Purpose:** Paginate arrays

**Functions:**
- `paginate(items, page, perPage)` - Get items for current page
- `getPaginationInfo(totalItems, page, perPage)` - Get page info
- `getTotalPages(totalItems, perPage)` - Calculate total pages

**Used in:**
- Blog list page
- Category pages
- Admin posts list
- Search results

---

### **5.2 sortByDate.ts**
**Purpose:** Sort items by date

**Functions:**
- `sortByNewest(items)` - Sort newest first
- `sortByOldest(items)` - Sort oldest first
- `sortByPublishedDate(posts)` - Sort by publishedAt

**Used in:**
- Blog list (sort options)
- Admin posts list
- Comments list

---

### **5.3 filterByCategory.ts**
**Purpose:** Filter posts

**Functions:**
- `filterByCategory(posts, categoryId)` - Filter by category
- `filterByTag(posts, tagId)` - Filter by tag
- `filterByStatus(posts, status)` - Filter by published/draft
- `filterByMultiple(posts, filters)` - Multiple filters

**Used in:**
- Category pages
- Tag pages
- Admin filters
- Search with filters

---

### **5.4 searchPosts.ts**
**Purpose:** Search functionality

**Functions:**
- `searchPosts(posts, query)` - Search in title and content
- `searchInFields(posts, query, fields)` - Search specific fields
- `fuzzySearch(posts, query)` - Fuzzy/flexible search
- `highlightMatches(text, query)` - Highlight search terms

**Used in:**
- Search page
- Header search bar
- Admin post search

---

## 6️⃣ **IMAGE UTILS** (3 utils)

### **6.1 uploadToCloudinary.ts**
**Purpose:** Upload images to Cloudinary

**Functions:**
- `uploadImage(file)` - Upload single image
- `uploadMultiple(files)` - Upload multiple images
- `deleteImage(publicId)` - Delete from Cloudinary
- `getUploadProgress(file)` - Track upload progress

**Used in:**
- Post creation (cover image)
- Post editing (update image)
- User avatar upload (future)

---

### **6.2 getImageUrl.ts**
**Purpose:** Get optimized Cloudinary URLs

**Functions:**
- `getOptimizedUrl(publicId, width, height)` - Get resized image
- `getThumbnail(publicId)` - Get thumbnail
- `getResponsiveUrls(publicId)` - Get multiple sizes
- `getBlurPlaceholder(publicId)` - Get blur placeholder

**Used in:**
- Post cards (thumbnails)
- Single post (full size)
- Responsive images
- Image optimization

---

### **6.3 validateImage.ts**
**Purpose:** Validate image files

**Functions:**
- `isValidImage(file)` - Check if valid image
- `isValidSize(file, maxSize)` - Check file size
- `isValidType(file, allowedTypes)` - Check file type
- `getImageDimensions(file)` - Get width/height

**Used in:**
- Upload forms
- Image validation before upload

---

## 7️⃣ **AUTH UTILS** (3 utils)

### **7.1 hashPassword.ts**
**Purpose:** Hash passwords (for future DB)

**Functions:**
- `hashPassword(password)` - Hash password
- `generateSalt()` - Generate salt

**Used in:**
- User registration (future)
- Password change (future)

**Note:** For now with JSON, store plain passwords (demo only)

---

### **7.2 comparePassword.ts**
**Purpose:** Compare passwords

**Functions:**
- `comparePassword(password, hash)` - Verify password
- `isPasswordMatch(input, stored)` - Simple comparison

**Used in:**
- Login verification
- Password confirmation

---

### **7.3 generateToken.ts**
**Purpose:** Generate session tokens

**Functions:**
- `generateSessionToken()` - Generate unique token
- `generateUserId()` - Generate unique user ID
- `generatePostId()` - Generate unique post ID

**Used in:**
- User sessions
- Cookie/token generation
- Unique IDs for new items

---

## 8️⃣ **HELPER UTILS** (4 utils)

### **8.1 generateId.ts**
**Purpose:** Generate unique IDs

**Functions:**
- `generateId()` - Generate UUID
- `generateNumericId()` - Generate numeric ID
- `generateShortId()` - Short unique ID (8 chars)

**Used in:**
- New posts
- New comments
- New categories
- Temporary IDs

---

### **8.2 copyToClipboard.ts**
**Purpose:** Copy text to clipboard

**Functions:**
- `copyToClipboard(text)` - Copy text
- `copyPostUrl(slug)` - Copy post URL
- `isCopySupported()` - Check if supported

**Used in:**
- Share button
- Copy link button
- Copy code snippets

---

### **8.3 downloadFile.ts**
**Purpose:** Download files

**Functions:**
- `downloadJson(data, filename)` - Download JSON
- `downloadText(text, filename)` - Download text file
- `exportPosts(posts)` - Export posts as JSON

**Used in:**
- Export data (admin)
- Backup functionality
- Download reports

---

### **8.4 classNames.ts** (cn helper)
**Purpose:** Conditional class names

**Functions:**
- `cn(...classes)` - Combine classes conditionally

**Used in:**
- All components (conditional styling)
- Dynamic classes

---

## 📊 **Utils Priority Table**

| Category | Essential | Recommended | Optional |
|----------|-----------|-------------|----------|
| **Data** | readPosts, writePosts | readCategories, readComments | writeComments |
| **Formatting** | formatDate, truncateText | formatNumber, readingTime | - |
| **Validation** | validationSchemas | validateEmail | validatePassword |
| **String** | slugify, generateExcerpt | capitalize, stripHtml | - |
| **Array** | paginate, searchPosts | sortByDate, filterByCategory | - |
| **Image** | uploadToCloudinary | getImageUrl | validateImage |
| **Auth** | generateToken | comparePassword | hashPassword |
| **Helpers** | generateId, cn | copyToClipboard | downloadFile |

---

## ✅ **RECOMMENDED UTILS TO BUILD FIRST**

### **Day 1 - Essential (10 utils):**
1. ✅ readPosts.ts
2. ✅ readCategories.ts
3. ✅ readUsers.ts
4. ✅ formatDate.ts
5. ✅ truncateText.ts
6. ✅ slugify.ts
7. ✅ validationSchemas.ts
8. ✅ generateId.ts
9. ✅ cn (classNames.ts)
10. ✅ paginate.ts

### **Day 2-3 - Recommended (8 utils):**
11. ✅ writePosts.ts
12. ✅ readComments.ts
13. ✅ writeComments.ts
14. ✅ searchPosts.ts
15. ✅ uploadToCloudinary.ts
16. ✅ formatNumber.ts
17. ✅ readingTime.ts
18. ✅ generateExcerpt.ts

### **Day 4-5 - Optional (6 utils):**
19. ⏳ sortByDate.ts
20. ⏳ filterByCategory.ts
21. ⏳ getImageUrl.ts
22. ⏳ copyToClipboard.ts
23. ⏳ stripHtml.ts
24. ⏳ capitalize.ts

---

## 📋 **Quick Checklist**

```
Essential Utils (Build First):
□ readPosts.ts
□ readCategories.ts
□ readUsers.ts
□ formatDate.ts
□ truncateText.ts
□ slugify.ts
□ validationSchemas.ts
□ generateId.ts
□ cn (classNames)
□ paginate.ts

Nice to Have:
□ writePosts.ts
□ searchPosts.ts
□ uploadToCloudinary.ts
□ formatNumber.ts

Can Add Later:
□ All other utils as needed
```

---

**Total Utils: ~30 functions across 8 categories**

**Start with: 10 essential utils**

**Ready to see the code for the essential utils?** 🚀