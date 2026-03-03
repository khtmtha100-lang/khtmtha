import { supabase } from './supabaseClient';

export async function loadStageProgress({ userDbId, subject, chapterNum }) {
  const { data, error } = await supabase
    .from('stage_progress')
    .select('stage, stars')
    .eq('user_id', userDbId)
    .eq('subject', subject)
    .eq('chapter', chapterNum);

  if (error) throw error;
  return data || [];
}

export async function saveStageProgress({ userDbId, subject, chapterNum, stageId, stars }) {
  // upsert by composite keys (assumes unique constraint; if none, we fallback to manual)
  const { data: existing, error: existingErr } = await supabase
    .from('stage_progress')
    .select('id, stars')
    .eq('user_id', userDbId)
    .eq('subject', subject)
    .eq('chapter', chapterNum)
    .eq('stage', stageId)
    .maybeSingle();

  if (existingErr) throw existingErr;

  if (existing?.id) {
    const { error: updErr } = await supabase
      .from('stage_progress')
      .update({ stars: Math.max(existing.stars || 0, stars), updated_at: new Date().toISOString() })
      .eq('id', existing.id);
    if (updErr) throw updErr;
    return { id: existing.id, stars: Math.max(existing.stars || 0, stars) };
  }

  const { data: inserted, error: insErr } = await supabase
    .from('stage_progress')
    .insert({
      user_id: userDbId,
      subject,
      chapter: chapterNum,
      stage: stageId,
      stars,
      updated_at: new Date().toISOString(),
    })
    .select('id, stars')
    .single();

  if (insErr) throw insErr;
  return inserted;
}

export async function loadAllStageProgress({ userDbId, subject }) {
  const { data, error } = await supabase
    .from('stage_progress')
    .select('chapter, stage, stars')
    .eq('user_id', userDbId)
    .eq('subject', subject);

  if (error) throw error;
  return data || [];
}

