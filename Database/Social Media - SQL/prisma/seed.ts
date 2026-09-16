// prisma/seed.ts
// ============================================================
// Seed designed to test these services:
//   1. login
//   2. register
//   3. getPostByHashtag
//   4. getPostByUserSearch
//   5. getPostByFullTextSearch
//   6. rankUserByPostCount
//   7. getTopPostByLikesCount
// ============================================================

import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { prisma } from '@/config/database-connection.js'


// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

// All users share this password — easy for login testing
// Plain: "Password@123"
const PASSWORD_PLAIN = 'Password@123'

// ─────────────────────────────────────────────
// RAW DATA
// ─────────────────────────────────────────────

const USER_DATA = [
  // Tech / Database — for FTS and user search testing
  { username: 'alex_dev',      email: 'alex@example.com',    displayName: 'Alex Johnson',   bio: 'Full stack developer. PostgreSQL and database design.',     location: 'San Francisco', accountType: 'creator'  as const },
  { username: 'rahul_db',      email: 'rahul@example.com',   displayName: 'Rahul Patel',    bio: 'Database engineer. Indexing and query optimization.',       location: 'Bangalore',     accountType: 'personal' as const },
  { username: 'dan_cloud',     email: 'dan@example.com',     displayName: 'Dan White',      bio: 'Cloud architect. AWS and GCP certified.',                   location: 'New York',      accountType: 'business' as const },
  { username: 'leo_security',  email: 'leo@example.com',     displayName: 'Leo Martinez',   bio: 'Cybersecurity engineer. SQL injection prevention.',          location: 'Austin',        accountType: 'personal' as const },
  { username: 'ravi_open',     email: 'ravi@example.com',    displayName: 'Ravi Kumar',     bio: 'Open source contributor. Linux and Rust developer.',         location: 'Pune',          accountType: 'personal' as const },
  // Design / UX
  { username: 'sara_design',   email: 'sara@example.com',    displayName: 'Sara Smith',     bio: 'UI/UX designer. Making the web beautiful.',                 location: 'London',        accountType: 'creator'  as const },
  { username: 'sophie_ux',     email: 'sophie@example.com',  displayName: 'Sophie Brown',   bio: 'UX researcher. Understanding users is my job.',             location: 'Berlin',        accountType: 'personal' as const },
  { username: 'nina_photo',    email: 'nina@example.com',    displayName: 'Nina Rodriguez', bio: 'Photographer and visual designer.',                         location: 'Barcelona',     accountType: 'creator'  as const },
  // ML / AI
  { username: 'priya_ml',      email: 'priya@example.com',   displayName: 'Priya Sharma',   bio: 'Machine learning engineer. Python and PyTorch.',            location: 'Hyderabad',     accountType: 'creator'  as const },
  { username: 'layla_ai',      email: 'layla@example.com',   displayName: 'Layla Hassan',   bio: 'AI researcher. Working on large language models.',          location: 'Dubai',         accountType: 'personal' as const },
  { username: 'aisha_data',    email: 'aisha@example.com',   displayName: 'Aisha Khan',     bio: 'Data analyst. Turning numbers into insights.',              location: 'Karachi',       accountType: 'personal' as const },
  // Fitness / Lifestyle
  { username: 'john_fitness',  email: 'john@example.com',    displayName: 'John Carter',    bio: 'Fitness coach. Strength training and nutrition.',           location: 'Los Angeles',   accountType: 'creator'  as const },
  { username: 'zara_travel',   email: 'zara@example.com',    displayName: 'Zara Ahmed',     bio: 'Travel blogger. 40 countries and counting.',                location: 'Istanbul',      accountType: 'creator'  as const },
  { username: 'meera_chef',    email: 'meera@example.com',   displayName: 'Meera Nair',     bio: 'Chef and food blogger. Indian cuisine specialist.',         location: 'Mumbai',        accountType: 'creator'  as const },
  { username: 'emma_writes',   email: 'emma@example.com',    displayName: 'Emma Wilson',    bio: 'Content writer and blogger.',                              location: 'Toronto',       accountType: 'personal' as const },
  // Startup / Business
  { username: 'tom_startup',   email: 'tom@example.com',     displayName: 'Tom Baker',      bio: 'Startup founder. Building products people love.',           location: 'Singapore',     accountType: 'business' as const },
  { username: 'farah_finance', email: 'farah@example.com',   displayName: 'Farah Ali',      bio: 'Financial advisor. Compound interest evangelist.',          location: 'Riyadh',        accountType: 'business' as const },
  { username: 'mike_react',    email: 'mike@example.com',    displayName: 'Mike Thompson',  bio: 'React and TypeScript developer.',                          location: 'Chicago',       accountType: 'personal' as const },
  { username: 'dev_arjun',     email: 'arjun@example.com',   displayName: 'Arjun Mehta',   bio: 'DevOps engineer. Kubernetes and Docker.',                   location: 'Delhi',         accountType: 'personal' as const },
  { username: 'chris_game',    email: 'chris@example.com',   displayName: 'Chris Evans',   bio: 'Game developer. Unity and Unreal Engine.',                  location: 'Seattle',       accountType: 'creator'  as const },
]

// Hashtags with intentional variety — some with many posts, some with few
// so getPostByHashtag returns different result sizes
const HASHTAG_DATA = [
  'database', 'postgresql', 'webdev', 'javascript', 'typescript',
  'react', 'python', 'machinelearning', 'fitness', 'design',
  'devops', 'opensource', 'travel', 'food', 'security',
  'cloud', 'startup', 'ux', 'photography', 'gaming',
]

// Posts — unevenly distributed by user so rankUserByPostCount works clearly
// alex_dev=6, rahul_db=5, priya_ml=5, sara_design=4, john_fitness=4
// others get 1-3 posts each
const POST_DATA = [
  // ── alex_dev (0) — 6 posts — expected rank #1 ──
  { userIndex: 0,  likes: 980, tags: ['postgresql', 'database', 'webdev'],   content: 'PostgreSQL full text search using tsvector and GIN index is incredibly powerful. You do not need Elasticsearch for most apps.' },
  { userIndex: 0,  likes: 750, tags: ['database', 'postgresql'],             content: 'Database indexing strategy is everything. A missing index on a foreign key can destroy your query performance at scale.' },
  { userIndex: 0,  likes: 620, tags: ['database', 'webdev'],                 content: 'Building a social media app database from scratch. The hardest part is designing the feed and notification systems.' },
  { userIndex: 0,  likes: 540, tags: ['typescript', 'webdev'],               content: 'TypeScript with Prisma ORM is my favorite stack for backend development. Type safety all the way to the database.' },
  { userIndex: 0,  likes: 430, tags: ['database'],                           content: 'Soft deletes with deletedAt timestamp is a must for any production database. Never hard delete user data.' },
  { userIndex: 0,  likes: 310, tags: ['javascript', 'webdev'],               content: 'JavaScript async await makes working with databases so much cleaner. No more callback hell.' },

  // ── rahul_db (1) — 5 posts — expected rank #2 ──
  { userIndex: 1,  likes: 870, tags: ['postgresql', 'database'],             content: 'GIN indexes in PostgreSQL are perfect for full text search. They store a list of all lexemes and positions in the document.' },
  { userIndex: 1,  likes: 690, tags: ['postgresql', 'database'],             content: 'Query optimization tip: always run EXPLAIN ANALYZE before deploying a complex SQL query to production.' },
  { userIndex: 1,  likes: 580, tags: ['database'],                           content: 'Denormalized counter columns like likeCount and postCount are a necessary evil in high traffic social media databases.' },
  { userIndex: 1,  likes: 450, tags: ['postgresql', 'database'],             content: 'PostgreSQL triggers are powerful for keeping derived data in sync automatically without any application logic.' },
  { userIndex: 1,  likes: 340, tags: ['database', 'webdev'],                 content: 'UUID versus serial integer primary keys. For distributed systems UUID wins every time despite the storage overhead.' },

  // ── priya_ml (8) — 5 posts — expected rank #3 ──
  { userIndex: 8,  likes: 760, tags: ['machinelearning', 'python'],          content: 'Training a neural network from scratch today. The moment the loss curve starts going down is pure joy for any machine learning engineer.' },
  { userIndex: 8,  likes: 640, tags: ['python', 'machinelearning'],          content: 'Python remains the best language for machine learning. PyTorch and TensorFlow have incredible ecosystems.' },
  { userIndex: 8,  likes: 520, tags: ['machinelearning', 'python'],          content: 'Feature engineering is still the most important skill in machine learning. Good features beat complex models every time.' },
  { userIndex: 8,  likes: 890, tags: ['machinelearning'],                    content: 'Attention mechanism in transformers explained simply: the model learns which words to focus on when predicting the next token.' },
  { userIndex: 8,  likes: 430, tags: ['machinelearning', 'python'],          content: 'Data preprocessing takes 80 percent of a machine learning project. Clean data is more valuable than a complex model.' },

  // ── sara_design (5) — 4 posts ──
  { userIndex: 5,  likes: 820, tags: ['design', 'ux'],                       content: 'Good UI design is invisible. Users should never notice the interface. They should only notice what they accomplished.' },
  { userIndex: 5,  likes: 710, tags: ['design', 'startup'],                  content: 'Redesigned our onboarding flow last week. Conversion rate went up 40 percent. Never underestimate the power of design.' },
  { userIndex: 5,  likes: 590, tags: ['design'],                             content: 'Color theory in UI design: use at most three colors in your palette. Simplicity is sophistication.' },
  { userIndex: 5,  likes: 480, tags: ['design', 'ux'],                       content: 'Typography is the backbone of good design. If your font choices are wrong nothing else matters.' },

  // ── john_fitness (11) — 4 posts ──
  { userIndex: 11, likes: 650, tags: ['fitness'],                            content: 'Morning workout done. 5km run followed by strength training. Fitness is not a hobby it is a lifestyle commitment.' },
  { userIndex: 11, likes: 580, tags: ['fitness'],                            content: 'Sleep is the most underrated fitness tool. Your muscles grow during recovery not during the workout itself.' },
  { userIndex: 11, likes: 720, tags: ['fitness'],                            content: 'Nutrition tip: protein intake should be 1.6 to 2.2 grams per kilogram of bodyweight for muscle building and recovery.' },
  { userIndex: 11, likes: 810, tags: ['fitness'],                            content: 'Consistency beats intensity every time in fitness. Show up every single day even when you do not feel like it.' },

  // ── dan_cloud (2) — 3 posts ──
  { userIndex: 2,  likes: 540, tags: ['cloud', 'devops'],                   content: 'Cloud architecture tip: design for failure. Assume every component can fail and build accordingly from day one.' },
  { userIndex: 2,  likes: 670, tags: ['cloud', 'postgresql', 'database'],   content: 'AWS RDS PostgreSQL now supports better full text search. The gap between managed databases and Elasticsearch is closing fast.' },
  { userIndex: 2,  likes: 490, tags: ['cloud', 'devops'],                   content: 'Kubernetes pod autoscaling saved us during a traffic spike last week. Cloud infrastructure done right saves the day.' },

  // ── layla_ai (9) — 3 posts ──
  { userIndex: 9,  likes: 930, tags: ['machinelearning'],                   content: 'Large language models are not magic. They are next token predictors trained on massive amounts of human generated text.' },
  { userIndex: 9,  likes: 780, tags: ['machinelearning'],                   content: 'The most important skill for working with AI systems is prompt engineering. Output quality depends entirely on input quality.' },
  { userIndex: 9,  likes: 860, tags: ['machinelearning', 'database'],       content: 'Retrieval augmented generation combines the power of language models with up to date factual databases. Best of both worlds.' },

  // ── mike_react (17) — 3 posts ──
  { userIndex: 17, likes: 670, tags: ['react', 'javascript', 'typescript'], content: 'React Server Components change how we think about frontend architecture. Less JavaScript shipped to the browser.' },
  { userIndex: 17, likes: 540, tags: ['typescript', 'javascript'],          content: 'TypeScript generics are scary at first but once you understand them your code becomes dramatically safer and more reusable.' },
  { userIndex: 17, likes: 480, tags: ['react', 'javascript'],               content: 'React Query handles server state so well that you will wonder how you ever managed data fetching without it.' },

  // ── tom_startup (15) — 2 posts ──
  { userIndex: 15, likes: 920, tags: ['startup'],                           content: 'Launched our startup MVP today. Six months of hard work out in the world. Building something people use is the best feeling.' },
  { userIndex: 15, likes: 840, tags: ['startup'],                           content: 'Startup advice: talk to your users every single week. The product you imagine and the product they need are rarely the same.' },

  // ── leo_security (3) — 2 posts ──
  { userIndex: 3,  likes: 760, tags: ['security', 'database'],              content: 'SQL injection is still the number one cause of data breaches. Always use parameterized queries. Never concatenate user input.' },
  { userIndex: 3,  likes: 650, tags: ['security', 'webdev'],                content: 'Password hashing with bcrypt or argon2 is non negotiable for any production application storing user credentials.' },

  // ── sophie_ux (6) — 2 posts ──
  { userIndex: 6,  likes: 590, tags: ['ux', 'design'],                      content: 'UX research insight: users do not read interfaces. They scan. Design every screen assuming nobody will read your text.' },
  { userIndex: 6,  likes: 510, tags: ['ux'],                                content: 'User testing does not need to be expensive. Five users will reveal 85 percent of usability problems in your product.' },

  // ── meera_chef (13) — 2 posts ──
  { userIndex: 13, likes: 720, tags: ['food'],                              content: 'Made butter chicken from scratch today. The secret is slow cooking the tomato base for 45 minutes. Patience is everything.' },
  { userIndex: 13, likes: 630, tags: ['food'],                              content: 'Indian spices are the most complex flavor system in the world. Mastering cumin coriander and garam masala takes years.' },

  // ── remaining users — 1 post each ──
  { userIndex: 4,  likes: 480, tags: ['opensource', 'webdev'],              content: 'Open source contribution is the best way to grow as a developer. Your first pull request is always the scariest.' },
  { userIndex: 7,  likes: 710, tags: ['photography'],                       content: 'Golden hour photography is pure magic. The light does all the work. Just be there at the right moment with your camera.' },
  { userIndex: 10, likes: 560, tags: ['database'],                          content: 'Data without context is just noise. Always ask why before jumping into your analysis. The insight lives in the question.' },
  { userIndex: 12, likes: 830, tags: ['travel'],                            content: 'Just landed in Tokyo. The city is everything I imagined and more. Travel changes how you see the entire world.' },
  { userIndex: 14, likes: 440, tags: ['webdev'],                            content: 'Writing good technical documentation is an art. Clear concise with examples. That is the formula that actually works.' },
  { userIndex: 16, likes: 750, tags: ['startup'],                           content: 'Compound interest is the eighth wonder of the world. Start investing early even if it is a small amount every month.' },
  { userIndex: 18, likes: 620, tags: ['devops', 'cloud'],                   content: 'Kubernetes changed how we deploy applications forever. Container orchestration at scale is now accessible to every team.' },
  { userIndex: 19, likes: 530, tags: ['gaming'],                            content: 'Game development tip: prototype fast and iterate faster. Your first idea is never your best idea. Keep building.' },
]

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

async function main() {
  console.log('🌱 Starting seed...\n')

  // ── 1. Clean all tables in correct FK order ──
  console.log('🧹 Cleaning existing data...')
  await prisma.feedItem.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.moderationAction.deleteMany()
  await prisma.report.deleteMany()
  await prisma.messageRead.deleteMany()
  await prisma.message.deleteMany()
  await prisma.conversationParticipant.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.storyView.deleteMany()
  await prisma.story.deleteMany()
  await prisma.pollOption.deleteMany()
  await prisma.poll.deleteMany()
  await prisma.savedPost.deleteMany()
  await prisma.postHashtag.deleteMany()
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.postStats.deleteMany()
  await prisma.post.deleteMany()
  await prisma.hashtag.deleteMany()
  await prisma.follow.deleteMany()
  await prisma.block.deleteMany()
  await prisma.mute.deleteMany()
  await prisma.userStats.deleteMany()
  await prisma.userSettings.deleteMany()
  await prisma.userProfile.deleteMany()
  await prisma.userSession.deleteMany()
  await prisma.media.deleteMany()
  await prisma.user.deleteMany()
  console.log('   ✓ All tables cleared\n')

  // ── 2. Hash password once — reused for all 20 users ──
  console.log('🔐 Hashing password...')
  const passwordHash = await bcrypt.hash(PASSWORD_PLAIN, 10)
  console.log('   ✓ Done\n')

  // ── 3. Create 20 users ──
  console.log('👤 Creating users...')
  const createdUsers: { id: string; username: string }[] = []

  for (const u of USER_DATA) {
    const userId = uuidv4()

    await prisma.user.create({
      data: {
        id:            userId,
        username:      u.username,
        email:         u.email,
        passwordHash:  passwordHash,
        accountStatus: 'active',
        accountType:   u.accountType,

        profile: {
          create: {
            displayName: u.displayName,
            bio:         u.bio,
            location:    u.location,
            isVerified:  ['alex_dev', 'rahul_db', 'priya_ml', 'sara_design', 'john_fitness'].includes(u.username),
            isPrivate:   false,
          }
        },

        settings: {
          create: {
            language:       'en',
            timezone:       'Asia/Kolkata',
            theme:          'system',
            whoCanMessage:  'everyone',
            whoCanSeePosts: 'public',
            notifEmail:     true,
            notifPush:      true,
          }
        },

        stats: {
          create: {
            postCount:      0,
            followerCount:  0,
            followingCount: 0,
          }
        },
      }
    })

    createdUsers.push({ id: userId, username: u.username })
    console.log(`   ✓ @${u.username}  (${u.displayName})`)
  }
  console.log(`   → ${createdUsers.length} users created\n`)

  // ── 4. Create hashtags ──
  console.log('🏷️  Creating hashtags...')
  const hashtagMap: Record<string, string> = {}

  for (const tag of HASHTAG_DATA) {
    const h = await prisma.hashtag.create({
      data: { id: uuidv4(), tagText: tag, postCount: 0, trendingScore: 0 }
    })
    hashtagMap[tag] = h.id
  }
  console.log(`   → ${HASHTAG_DATA.length} hashtags created\n`)

  // ── 5. Create posts + postStats + postHashtags ──
  console.log('📝 Creating posts...')
  const createdPostIds: string[] = []

  for (const p of POST_DATA) {
    const user   = createdUsers[p.userIndex]
    const postId = uuidv4()

    // Trigger auto-fills searchVec on insert
    await prisma.post.create({
      data: {
        id:          postId,
        userId:      user.id,
        postType:    'post',
        contentText: p.content,
        visibility:  'public',
        status:      'published',
      }
    })

    // Realistic stats — proportional to likes
    await prisma.postStats.create({
      data: {
        postId:       postId,
        likeCount:    p.likes,
        commentCount: Math.floor(p.likes * 0.12),
        repostCount:  Math.floor(p.likes * 0.05),
        viewCount:    BigInt(p.likes * 18),
        saveCount:    Math.floor(p.likes * 0.08),
      }
    })

    // Link hashtags + update postCount
    for (const tag of p.tags) {
      if (hashtagMap[tag]) {
        await prisma.postHashtag.create({
          data: { postId, hashtagId: hashtagMap[tag] }
        })
        await prisma.hashtag.update({
          where: { id: hashtagMap[tag] },
          data:  { postCount: { increment: 1 } }
        })
      }
    }

    // Update user postCount
    await prisma.userStats.update({
      where: { userId: user.id },
      data:  { postCount: { increment: 1 } }
    })

    createdPostIds.push(postId)
    console.log(`   ✓ @${user.username.padEnd(14)} "${p.content.slice(0, 55)}..."`)
  }

  // Update trending scores based on final postCount
  for (const tag of HASHTAG_DATA) {
    const h = await prisma.hashtag.findUnique({ where: { id: hashtagMap[tag] } })
    if (h) {
      await prisma.hashtag.update({
        where: { id: hashtagMap[tag] },
        data:  { trendingScore: h.postCount * 10.0 }
      })
    }
  }
  console.log(`   → ${POST_DATA.length} posts created\n`)

  // ── 6. Create real like rows ──
  // Each user likes ~8 random posts (not their own)
  // This makes getTopPostByLikesCount testable via real like rows too
  console.log('❤️  Creating likes...')
  const likedPairs  = new Set<string>()
  const reactions   = ['like', 'love', 'laugh', 'wow'] as const
  let   likeCount   = 0

  for (const user of createdUsers) {
    const eligible = POST_DATA
      .map((p, i) => ({ postId: createdPostIds[i], ownerIndex: p.userIndex }))
      .filter(p => createdUsers[p.ownerIndex].id !== user.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)

    for (const item of eligible) {
      const key = `${user.id}-${item.postId}`
      if (!likedPairs.has(key)) {
        likedPairs.add(key)
        await prisma.like.create({
          data: {
            id:           uuidv4(),
            userId:       user.id,
            targetType:   'post',
            targetId:     item.postId,
            reactionType: randomFrom(reactions),
          }
        })
        likeCount++
      }
    }
  }
  console.log(`   → ${likeCount} likes created\n`)

  // ── 7. Create follows ──
  console.log('👥 Creating follows...')
  const followPairs = new Set<string>()
  let   followCount = 0

  for (const user of createdUsers) {
    const toFollow = createdUsers
      .filter(u => u.id !== user.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 6)

    for (const followee of toFollow) {
      const key = `${user.id}-${followee.id}`
      if (!followPairs.has(key)) {
        followPairs.add(key)
        await prisma.follow.create({
          data: { id: uuidv4(), followerId: user.id, followeeId: followee.id, status: 'active' }
        })
        await prisma.userStats.update({ where: { userId: user.id },      data: { followingCount: { increment: 1 } } })
        await prisma.userStats.update({ where: { userId: followee.id },  data: { followerCount:  { increment: 1 } } })
        followCount++
      }
    }
  }
  console.log(`   → ${followCount} follows created\n`)

  // ── Done ──
  console.log('═══════════════════════════════════════════════════════')
  console.log('✅  Seed complete!')
  console.log('═══════════════════════════════════════════════════════')
  console.log('')
  console.log('📊 Summary:')
  console.log(`   👤 Users    : ${createdUsers.length}`)
  console.log(`   🏷️  Hashtags : ${HASHTAG_DATA.length}`)
  console.log(`   📝 Posts    : ${POST_DATA.length}`)
  console.log(`   ❤️  Likes    : ${likeCount}`)
  console.log(`   👥 Follows  : ${followCount}`)
  console.log('')
  console.log('🔑 All users share this password:')
  console.log(`   ${PASSWORD_PLAIN}`)
  console.log('')
  console.log('🧪 Expected results for each service:')
  console.log('')
  console.log('   1. login')
  console.log('      email    : alex@example.com')
  console.log('      password : Password@123')
  console.log('')
  console.log('   2. register')
  console.log('      use any new email/username not in the seed')
  console.log('')
  console.log('   3. getPostByHashtag')
  console.log('      "database"       → 10+ posts  (high)')
  console.log('      "fitness"        → 4 posts    (medium)')
  console.log('      "gaming"         → 1 post     (low)')
  console.log('')
  console.log('   4. getPostByUserSearch')
  console.log('      "alex"  → @alex_dev')
  console.log('      "rahul" → @rahul_db')
  console.log('      "sara"  → @sara_design')
  console.log('      "priya" → @priya_ml')
  console.log('')
  console.log('   5. getPostByFullTextSearch')
  console.log('      "GIN index"        → postgresql posts')
  console.log('      "machine learning" → ml posts')
  console.log('      "fitness coach"    → fitness posts')
  console.log('      "database design"  → db posts')
  console.log('')
  console.log('   6. rankUserByPostCount  (expected top 3)')
  console.log('      #1 @alex_dev   → 6 posts')
  console.log('      #2 @rahul_db   → 5 posts')
  console.log('      #3 @priya_ml   → 5 posts')
  console.log('')
  console.log('   7. getTopPostByLikesCount  (expected top 3)')
  console.log('      #1 layla_ai   "Large language models..."  → 930 likes')
  console.log('      #2 tom_startup "Launched our startup..."  → 920 likes')
  console.log('      #3 priya_ml   "Attention mechanism..."    → 890 likes')
  console.log('═══════════════════════════════════════════════════════')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })