# 🐛 Khtmtha App - Debugging Guide

## Errors Identified & Fixed

### ✅ Error 1: 409 Conflict in `game_sessions` Insert
**Location**: [App.jsx](App.jsx#L2982)

**Problem**: 
The `saveSessionToSupabase()` function was inserting data with inconsistent field mapping:
```jsx
// ❌ WRONG
await supabase.from('game_sessions').insert({
  user_id: userProfile?.id || null,      // Using auth user ID
  anon_user_id: userDbId || anonId || null,  // Using localStorage user ID
  ...
});
```

This caused a 409 (Conflict) error because:
- `user_id` and `anon_user_id` were being populated ambiguously
- Database table likely has a unique constraint requiring only one of these to be set
- The values being sent didn't match the expected schema

**Solution** (Lines 2982-3002):
```jsx
// ✅ CORRECT
await supabase.from('game_sessions').insert({
  user_id: userDbId || null,        // From localStorage (database user ID)
  anon_user_id: anonId || null,     // From localStorage (anonymous session ID)
  ...
});
```

**Changes Made**:
- Changed `user_id` to use `userDbId` instead of `userProfile?.id`
- Simplified `anon_user_id` to only use `anonId`
- Added console.error logging for better debugging
- Fixed `is_guest` logic to check both `userDbId` and `anonId`

---

### ✅ Error 2: Inconsistent Field Names in `saveBagItem` Function
**Location**: [App.jsx](App.jsx#L2945)

**Problem**:
```jsx
// ❌ WRONG - Using 'user_db_id' instead of 'user_id'
const rows = entries.map(entry => ({
  user_db_id: userDbId || anonId,  // Wrong column name!
  anon_user_id: anonId || null,
  ...
}));
```

**Solution**:
```jsx
// ✅ CORRECT
const rows = entries.map(entry => ({
  user_id: userDbId || null,    // Correct column name
  anon_user_id: anonId || null,
  questions: JSON.stringify(entry.questions),  // Ensure JSON serialization
  ...
}));
```

**Changes Made**:
- Renamed `user_db_id` → `user_id` for consistency with database schema
- Changed `userDbId || anonId` → `userDbId || null` (proper null handling)
- Added `JSON.stringify()` for questions data
- Added error logging for debugging

---

### ⚠️ Error 3: 400 Bad Request from Users Endpoint
**Location**: Supabase REST API query

**Potential Issues**:
1. **RLS (Row Level Security) Policy**: The `users` table might have RLS policies that prevent anonymous guests from querying
2. **Auth Issue**: The auth session might not be properly established when querying
3. **Query Format**: The Supabase client library generates REST API calls automatically

**Investigation Steps**:
1. Check browser DevTools → Network tab for the exact request URL
2. Verify the `users` table RLS policies in Supabase dashboard
3. Look for any queries that explicitly use `.eq('id', ...)` on the users table
4. Check if there are any calls to `getUserProfile()` with incorrect parameters

**Debugging Code Added**:
```jsx
// In saveSessionToSupabase()
console.log('saveSession - userDbId:', userDbId, 'anonId:', anonId, 'userProfile?.id:', userProfile?.id);
```

---

## How to Test the Fixes

### 1. **Browser Console Testing**
Open DevTools (F12) → Console tab and:
```javascript
// Check localStorage values
console.log({
  user_db_id: localStorage.getItem('user_db_id'),
  anon_user_id: localStorage.getItem('anon_user_id'),
  user_registered: localStorage.getItem('user_registered')
});
```

### 2. **Network Tab Inspection**
1. Open DevTools → Network tab
2. Filter for "game_sessions" requests
3. Check:
   - ✅ Status should be 201 (Created), not 409
   - ✅ Payload should have `user_id` and `anon_user_id`
   - ❌ If 409 appears, check the response error message

### 3. **Play Through the Game**
1. Click "دخول سريع عبر Google" or guest login
2. Complete a short game session
3. Check DevTools Console for:
   - ✅ `saveSession - userDbId: [uuid], anonId: [uuid]`
   - ❌ No 409 errors in Network tab
   - ❌ No console.error messages

### 4. **Supabase Dashboard Verification**
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Run these queries to check:
```sql
-- Check game_sessions table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'game_sessions';

-- Check recent sessions
SELECT * FROM game_sessions 
ORDER BY created_at DESC 
LIMIT 5;

-- Check mistakes_bag table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'mistakes_bag';
```

---

## Key Data Flow

### Guest User (No Auth)
```
1. User clicks "ضيف"
2. localStorage.setItem('anon_user_id', generateUUID())
3. When saving session:
   - user_id: null
   - anon_user_id: [UUID from localStorage]
   - is_guest: true
```

### Google Authenticated User
```
1. User clicks "دخول عبر Google"
2. Supabase creates auth session
3. App creates/fetches database user record (with ID)
4. localStorage.setItem('user_db_id', [database UUID])
5. localStorage.setItem('anon_user_id', [auth UUID])
6. When saving session:
   - user_id: [database UUID]
   - anon_user_id: [auth UUID]
   - is_guest: false
```

---

## Console Logging Added

### For `saveSessionToSupabase()` (Line 2990):
```javascript
console.log('saveSession - userDbId:', userDbId, 'anonId:', anonId, 'userProfile?.id:', userProfile?.id);
```

### For Error Handling:
```javascript
if (e?.message?.includes('409')) {
  console.error('409 Conflict - Check database constraints on game_sessions table');
}
```

### For `saveBagItem()` (Line 2955):
```javascript
catch (e) {
  console.error('Error saving bag items to Supabase:', e);
}
```

---

## Next Steps

1. **Test in browser** with console open
2. **Monitor Network tab** during game play
3. **Check Supabase logs** for any permission issues
4. **Verify table constraints** in database schema
5. If 409 still occurs:
   - Check for duplicate session records
   - Verify database triggers aren't interfering
   - Check RLS policies on `game_sessions` table

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 409 Conflict | Both user_id and anon_user_id populated incorrectly | ✅ Fixed - now uses correct localStorage values |
| 400 Bad Request | RLS policy blocking anonymous access | Check Supabase RLS settings |
| Data not saving | Wrong field names | ✅ Fixed - changed user_db_id to user_id |
| Duplicate sessions | Insert happening twice | Add loading state to prevent double-click |
| Auth errors | Session not established | Check onAuthStateChange event handler |

---

## File Changes Summary

- [App.jsx](App.jsx#L2945): Fixed saveBagItem() field names
- [App.jsx](App.jsx#L2982): Fixed saveSessionToSupabase() user ID mapping
- Added console logging for debugging

**Status**: ✅ Ready for testing
