# 🎮 Khtmtha App - Testing Workflow

## Quick Start Testing (5 minutes)

### Step 1: Open Developer Console
- Press `F12` or `Ctrl+Shift+I` (Win/Linux) / `Cmd+Shift+I` (Mac)
- Go to **Console** tab
- Keep it open while following these steps

### Step 2: Test as Guest User
1. Refresh the page (F5)
2. Click "ضيف" (Guest button)
3. Complete the profile setup (name, age, gender, governorate)
4. Start a chapter game
5. **IMPORTANT**: Watch the Console for these messages:
   ```
   saveSession - userDbId: null, anonId: [some-uuid], userProfile?.id: undefined
   ```

**Expected Result** ✅:
- No 409 errors in Network tab
- `anon_user_id` should have a value
- `user_id` should be null

### Step 3: Test as Google User (if configured)
1. Return to login
2. Click "دخول عبر Google"
3. Sign in with your Google account
4. Complete profile setup
5. Start a game
6. **IMPORTANT**: Watch the Console for:
   ```
   saveSession - userDbId: [uuid], anonId: [uuid], userProfile?.id: [uuid]
   ```

**Expected Result** ✅:
- `user_id` should have a database UUID
- `anon_user_id` should have an auth UUID
- No 409 errors in Network tab

---

## Detailed Testing Checklist

### 🔍 **Console Tab Checks**
- [ ] No red error messages ❌
- [ ] `saveSession` debug logs appear when game ends
- [ ] No undefined warnings about `userProfile`
- [ ] No "Conflict" error messages

### 📊 **Network Tab Checks**
1. Filter for "game_sessions"
2. After playing a game, look for a POST request to `/rest/v1/game_sessions`
3. Check the response:

| Check | Expected | Status |
|-------|----------|--------|
| Status Code | 201 (Created) | ⏳ |
| Not 409 (Conflict) | ✅ Pass | ⏳ |
| Not 400 (Bad Request) | ✅ Pass | ⏳ |
| Response has `id` field | Yes | ⏳ |

### 🎮 **Gameplay Checks**
- [ ] Game loads without errors
- [ ] Can answer questions
- [ ] Combo system works
- [ ] Powerups work (Freeze, Bomb)
- [ ] Results screen displays
- [ ] Can replay chapter
- [ ] Can exit to menu

### 💾 **localStorage Checks**
Open Console and run:
```javascript
// Check what values are stored
console.table({
  'user_db_id': localStorage.getItem('user_db_id'),
  'anon_user_id': localStorage.getItem('anon_user_id'),
  'user_registered': localStorage.getItem('user_registered'),
  'user_name': localStorage.getItem('user_name'),
});
```

**Expected Output**:
```
user_db_id: null (if guest) or [UUID] (if logged in)
anon_user_id: [UUID]
user_registered: "true" or not set
user_name: [Your name]
```

---

## Error Troubleshooting

### If you see 409 Error:

```javascript
// Debug query in console
console.log({
  userDbId: localStorage.getItem('user_db_id'),
  anonId: localStorage.getItem('anon_user_id'),
  bothSet: !!(localStorage.getItem('user_db_id') && localStorage.getItem('anon_user_id')),
  bothNull: !(localStorage.getItem('user_db_id') || localStorage.getItem('anon_user_id'))
});
```

**If both are set**: Database might require only one. Check Supabase schema.
**If both are null**: User not properly authenticated. Check auth flow.

### If you see 400 Error:

1. Check if it's from a different endpoint (not game_sessions)
2. Look for any SELECT queries on the `/users` table
3. The issue might be with RLS (Row Level Security) policies
4. Try: Supabase Dashboard → Authentication → Policies

### If nothing saves:

```javascript
// Force a test save in console
const testSession = {
  user_id: localStorage.getItem('user_db_id') || null,
  anon_user_id: localStorage.getItem('anon_user_id') || null,
  subject: 'english',
  question_type: 'chapters',
  game_mode: 'chapter',
  score: 100,
  questions_total: 10,
  questions_correct: 8,
  questions_wrong: 2,
  accuracy: 80,
  is_guest: !localStorage.getItem('user_db_id'),
  speed_mode: 'normal'
};
console.log('Test session:', testSession);
// This shows what's being sent to the database
```

---

## Performance Monitoring

### Monitor these metrics:

1. **Console Log Volume**
   - Should see ~1-2 log messages per game
   - Not hundreds of logs

2. **Network Requests**
   - Game start: 1 GET request for questions
   - Game end: 1 POST request for game_sessions
   - Should see them in Network tab

3. **Local Storage Size**
   - Check: `localStorage.length`
   - Should be < 50 keys
   - If > 100, might have performance issue

---

## Verification Steps

### After Making Fixes:

1. **Clear Browser Cache**
   ```
   DevTools → Application → Clear storage
   ```

2. **Hard Refresh**
   ```
   Ctrl+Shift+R (Win/Linux) or Cmd+Shift+R (Mac)
   ```

3. **Check Service Worker** (if using)
   ```
   DevTools → Application → Service Workers
   Make sure it's not serving old code
   ```

4. **Verify HMR Update**
   ```
   Network tab should show:
   /src/App.jsx with 304 (Not Modified)
   This means changes were reloaded
   ```

---

## Success Indicators ✅

You'll know the fixes worked when:

1. **Console shows**:
   ```
   saveSession - userDbId: [value], anonId: [value], userProfile?.id: [value]
   ```

2. **Network tab shows**:
   - POST to game_sessions returns 201 (Created)
   - No 409 or 400 errors

3. **Game flow works**:
   - Guest login → Play → Save ✅
   - Google login → Play → Save ✅
   - Different subjects work ✅
   - Powerups work ✅

4. **Data persists**:
   - Stats visible on next session
   - Mistakes bag populated
   - XP visible in profile

---

## Report These Issues If Seen

### Critical (Game Breaking):
- [ ] 409 on every game save
- [ ] 400 on any API call
- [ ] Game won't start
- [ ] Answers don't register

### High Priority:
- [ ] Save happens but data is corrupted
- [ ] localStorage fills up with garbage
- [ ] Game slows down after few rounds

### Medium Priority:
- [ ] Console warnings (not errors)
- [ ] Slow network requests
- [ ] UI glitches

### Low Priority:
- [ ] Performance optimizations
- [ ] Type hints needed
- [ ] Code cleanup

---

## Debug Commands

Copy-paste these in Console for quick testing:

```javascript
// Check all app state
(() => {
  const state = {
    userDbId: localStorage.getItem('user_db_id'),
    anonId: localStorage.getItem('anon_user_id'),
    registered: localStorage.getItem('user_registered'),
    today: new Date().toISOString().split('T')[0],
  };
  console.table(state);
  return state;
})();

// Simulate a session save (for testing)
const fakeSession = {
  user_id: Math.random().toString().slice(2),
  anon_user_id: localStorage.getItem('anon_user_id'),
  score: Math.floor(Math.random() * 100),
  questions_total: 10,
  questions_correct: Math.floor(Math.random() * 10),
};
console.log('Would save:', fakeSession);

// Check for errors in localStorage
Object.entries(localStorage).forEach(([k, v]) => {
  if (k.includes('error') || v.includes('error')) {
    console.error(`${k}: ${v}`);
  }
});
```

---

## Next Steps After Testing

1. ✅ **If all tests pass**: Fixes are working! Close this guide.
2. ❌ **If tests fail**: See "Error Troubleshooting" section above
3. 🔄 **If partially working**: Run specific test sections again
4. 📋 **Document findings** in a separate file if issues persist

---

**Last Updated**: 2026-02-22
**Status**: Ready for Testing
