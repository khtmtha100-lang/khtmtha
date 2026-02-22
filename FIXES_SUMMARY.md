# 🔧 Khtmtha App - Error Analysis & Fixes Summary

## Issues Found & Fixed ✅

---

## 1️⃣ **409 Conflict Error from `/rest/v1/game_sessions`**

### What was happening:
```
User completes a game
↓
saveSessionToSupabase() is called
↓
INSERT into game_sessions with WRONG field mapping
↓
Database rejects (409 Conflict) - constraints violated
```

### ROOT CAUSE
The function was mixing up database IDs:
```jsx
// ❌ BEFORE (Wrong)
user_id: userProfile?.id              // Auth ID (Supabase Auth)
anon_user_id: userDbId || anonId      // Database ID or Anonymous ID (Mixed!)
```

### THE FIX
```jsx
// ✅ AFTER (Correct)
user_id: userDbId || null             // Database User ID (for logged-in users)
anon_user_id: anonId || null          // Anonymous Session ID (from localStorage)
```

### Where Fixed
**File**: [App.jsx](App.jsx)
**Lines**: 2982-3002 (`saveSessionToSupabase` function)

**Changes**:
- ✅ Changed `user_id: userProfile?.id` → `user_id: userDbId`
- ✅ Simplified `anon_user_id` logic
- ✅ Added `console.log()` for debugging
- ✅ Improved error handling for 409 errors

---

## 2️⃣ **Field Name Mismatch in `mistakes_bag` Insert**

### What was happening:
```
User answers questions wrong
↓
saveBagItem() stores in localStorage (works)
↓
Tries to save to Supabase with WRONG column name
↓
Column 'user_db_id' doesn't exist or permission denied
```

### ROOT CAUSE
Using wrong column name:
```jsx
// ❌ BEFORE (Wrong)
rows.map(entry => ({
  user_db_id: userDbId || anonId,     // ← Wrong column name!
  anon_user_id: anonId || null,
  ...
}))
```

### THE FIX
```jsx
// ✅ AFTER (Correct)
rows.map(entry => ({
  user_id: userDbId || null,          // ← Correct column name
  anon_user_id: anonId || null,
  ...
}))
```

### Where Fixed
**File**: [App.jsx](App.jsx)
**Lines**: 2945-2960 (`saveBagItem` function)

**Changes**:
- ✅ Changed `user_db_id` → `user_id`
- ✅ Fixed null handling
- ✅ Added `JSON.stringify()` for questions
- ✅ Added error logging

---

## 3️⃣ **400 Bad Request from `/rest/v1/users?id=eq.UUID`**

### What causes this:
1. **RLS Policy**: The `users` table might block anonymous reads
2. **Auth Issue**: Session not properly established
3. **Query Format**: Incorrect filter syntax

### How to verify in Supabase:
```sql
-- Check if RLS is enabled
SELECT relname, rowsecurity 
FROM pg_class 
WHERE relname = 'users';

-- Check current policies
SELECT * FROM pg_policies 
WHERE tablename = 'users';
```

### Temporary fix:
If RLS is blocking, update policy to allow authenticated users:
```sql
CREATE POLICY "Users can read own data"
  ON users
  USING (auth.uid() = auth_id);
```

---

## 📊 Data Flow Comparison

### BEFORE (Broken) ❌
```
Guest User:
  user_id: undefined
  anon_user_id: random-mix-of-values ← wrong type/source

Google User:
  user_id: auth_uuid (wrong!)
  anon_user_id: user_db_id (wrong!)
  → 409 CONFLICT - both filled wrong!
```

### AFTER (Fixed) ✅
```
Guest User:
  user_id: null
  anon_user_id: localStorage['anon_user_id']
  is_guest: true ✓

Google User:
  user_id: localStorage['user_db_id']
  anon_user_id: localStorage['anon_user_id']
  is_guest: false ✓
```

---

## 🎯 localStorage Mapping

| Variable | Source | Purpose | Example |
|----------|--------|---------|---------|
| `user_db_id` | From `/users` table after Google login | Identifies logged-in user | `550e8400-e29b-41d4-a716-446655440000` |
| `anon_user_id` | Generated on guest login or auth.user.id | Identifies anonymous session | `550e8400-e29b-41d4-a716-446655440001` |
| `user_registered` | Set after profile completion | Indicates first-time setup done | `"true"` |

### Correct Assignment Logic:
```javascript
// When user logs in with Google
localStorage.setItem('user_db_id', newUser.id);           // Database ID
localStorage.setItem('anon_user_id', session.user.id);    // Auth ID

// When saving to database
game_sessions.insert({
  user_id: localStorage.user_db_id,        // ← Database ID (or null if guest)
  anon_user_id: localStorage.anon_user_id  // ← Session/Auth ID
})
```

---

## 📝 Console Logging Added

### Debug Output When Saving Game
```javascript
console.log('saveSession - userDbId:', userDbId, 'anonId:', anonId, 'userProfile?.id:', userProfile?.id);
```

**Expected Output**:

**For Guest**:
```
saveSession - userDbId: null, anonId: "550e8400-e29b-41d4-a716-446655440001", userProfile?.id: undefined
```

**For Google User**:
```
saveSession - userDbId: "550e8400-e29b-41d4-a716-446655440000", anonId: "550e8400-e29b-41d4-a716-446655440001", userProfile?.id: "550e8400-e29b-41d4-a716-446655440000"
```

---

## ✅ Verification Checklist

After the fixes, you should see:

### ✅ No More 409 Errors
```
Network tab → game_sessions POST
Status: 201 Created ✓ (was 409)
```

### ✅ Correct Data in Supabase
```sql
SELECT user_id, anon_user_id, is_guest 
FROM game_sessions 
ORDER BY created_at DESC LIMIT 1;

-- Should show:
-- user_id: null OR uuid (not both)
-- anon_user_id: uuid
-- is_guest: boolean
```

### ✅ Console Messages
```
[Console output]
saveSession - userDbId: [correct_value], anonId: [uuid], userProfile?.id: [correct_value]
```

### ✅ Game Saves Properly
```
Start game → Answer questions → See results
↓
Network: POST game_sessions → 201 Created ✓
↓
Supabase: New row appears ✓
↓
Next login: Stats persist ✓
```

---

## 🔍 How to Debug Further

### If 409 still occurs:
```javascript
// Check database constraints
// In Supabase SQL Editor:
SELECT constraint_name, constraint_type 
FROM information_schema.table_constraints 
WHERE table_name = 'game_sessions';

// Check for duplicate records
SELECT user_id, anon_user_id, COUNT(*) 
FROM game_sessions 
GROUP BY user_id, anon_user_id 
HAVING COUNT(*) > 1;
```

### If 400 still occurs:
```javascript
// Check RLS policies
// In Supabase: Authentication → Row Level Security
// Verify policies allow the operation being attempted

// In console, test with debug flag:
const { data, error } = await supabase
  .from('game_sessions')
  .insert([{ /* data */ }])
  .explain();
console.log(error); // Shows policy violation details
```

---

## 📚 Files Modified

1. **[App.jsx](App.jsx#L2945)** - saveBagItem function
   - Line 2945-2960: Fixed user_id field and error handling

2. **[App.jsx](App.jsx#L2982)** - saveSessionToSupabase function  
   - Line 2982-3002: Fixed user_id/anon_user_id mapping and added logging

3. **[DEBUG_GUIDE.md](DEBUG_GUIDE.md)** - Created comprehensive debugging guide

4. **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Created testing workflow

---

## 📞 Quick Reference

### Was the issue fixed?
Check the Network tab after playing a game:
```
✅ game_sessions POST → 201 Created = FIXED
❌ game_sessions POST → 409 Conflict = NOT FIXED
```

### How to test immediately?
1. Open DevTools (F12)
2. Go to Console tab
3. Clear localStorage: `localStorage.clear()`
4. Refresh: F5
5. Play a game as guest
6. Look for debug log: `saveSession - userDbId...`

### What if it's still broken?
1. Check the Debug Guide: [DEBUG_GUIDE.md](DEBUG_GUIDE.md)
2. Follow Testing Workflow: [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. Verify Supabase schema matches code expectations

---

## 🎉 Summary

**What was fixed:**
- ✅ 409 Conflict error from game_sessions table
- ✅ Wrong field names in mistakes_bag insert
- ✅ User ID mapping between auth and database
- ✅ Added debug logging for easier troubleshooting

**What to do next:**
1. Test the game with the fixed code
2. Monitor Network tab and Console
3. Verify data appears in Supabase
4. Report any remaining issues with console output

**How to use the guides:**
- **DEBUG_GUIDE.md**: Understanding root causes
- **TESTING_GUIDE.md**: Step-by-step testing procedure

---

**Status**: ✅ **READY TO TEST**
**Last Updated**: 2026-02-22
**Fixes Applied**: 2/2 (100%)
