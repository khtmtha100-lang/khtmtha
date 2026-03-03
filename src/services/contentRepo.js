import { supabase } from './supabaseClient';

export async function fetchEnglishStageQuestions({ chapterNum, stageId }) {
  const isDemo = stageId === 0;
  const query = supabase
    .from('english_chapter_stages')
    .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
    .eq('chapterno', chapterNum)
    .eq('stageno', isDemo ? 1 : stageId)
    .order('blockno');

  if (isDemo) query.limit(5);

  const { data, error } = await query;
  if (error || !data || data.length === 0) return null;

  return data.map(r => ({
    id: r.questioncode,
    q: r.questiontext,
    requirement: r.question_requirement,
    options: [r.optiona, r.optionb, r.optionc, r.optiond],
    a: r.correctanswer,
    golden: r.isgolden,
    explanation: r.explanation,
  }));
}

export async function fetchEnglishFullYearQuestions({ chapterNum }) {
  const { data, error } = await supabase
    .from('english_fullyear_stages')
    .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
    .eq('chapterno', chapterNum)
    .order('blockno');

  if (error || !data || data.length === 0) return null;

  return data.map(r => ({
    id: r.questioncode,
    q: r.questiontext,
    requirement: r.question_requirement,
    options: [r.optiona, r.optionb, r.optionc, r.optiond],
    a: r.correctanswer,
    golden: r.isgolden,
    explanation: r.explanation,
  }));
}

export async function fetchEnglishReviewPartQuestions({ chapterNum, partNum }) {
  const { data, error } = await supabase
    .from('english_review_parts')
    .select('questioncode,questiontext,question_requirement,optiona,optionb,optionc,optiond,correctanswer,isgolden,explanation')
    .eq('chapterno', chapterNum)
    .eq('stageno', partNum)
    .order('blockno');

  if (error || !data || data.length === 0) return null;

  return data.map(r => ({
    id: r.questioncode,
    q: r.questiontext,
    requirement: r.question_requirement,
    options: [r.optiona, r.optionb, r.optionc, r.optiond],
    a: r.correctanswer,
    golden: r.isgolden,
    explanation: r.explanation,
  }));
}

