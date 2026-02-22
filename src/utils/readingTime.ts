export function calculateReadingTime(text: string): string {
  if (!text) return "1 min";
  
  const wordsPerMinute = 200;
  // Remove markdown formatting to get a more accurate word count
  const noMarkdown = text.replace(/[#*`_>\[\]\(\)-]/g, " ");
  const wordCount = noMarkdown.split(/\s+/).filter(word => word.length > 0).length;
  
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTimeMinutes} min${readingTimeMinutes !== 1 ? 's' : ''}`;
}
