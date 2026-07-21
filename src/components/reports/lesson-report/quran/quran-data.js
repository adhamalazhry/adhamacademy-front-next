import {
  QURAN_SURAH_OPTIONS,
  getSurahAyahCountByName,
  getSurahNumberByName,
} from "@/lib/quran/surahs";

export const QURAN_SURAHS = QURAN_SURAH_OPTIONS;

export function getSurahAyahCount(surahName) {
  return getSurahAyahCountByName(surahName);
}

export function getSurahNumber(surahName) {
  return getSurahNumberByName(surahName);
}
