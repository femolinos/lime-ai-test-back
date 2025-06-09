import fs from 'fs'

import { openai } from '@/lib/openai'

export async function transcribeAudio(filePath: string): Promise<string> {
  try {
    const fileBuffer = await fs.promises.readFile(filePath)

    const file = new File([fileBuffer], 'audio.mp3', { type: 'audio/mpeg' })

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: 'whisper-1',
      response_format: 'text',
      language: 'en',
    })

    return transcription
  } catch (error) {
    console.error('Transcription error:', error)
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    throw new Error(`Failed to transcribe audio: ${errorMessage}`)
  }
}

export async function generateNoteSummary(
  transcription: string,
): Promise<string> {
  const summary = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that summarizes medical notes.',
      },
      {
        role: 'user',
        content: `Summarize the following medical note: ${transcription}`,
      },
    ],
  })

  return summary.choices[0].message.content ?? ''
}

interface SectionGAnswers {
  M1800: string
  M1810: string
  M1820: string
  M1830: string
  M1840: string
  M1850: string
  M1860: string
}

export async function generateSectionGAnswers(
  transcription: string,
): Promise<SectionGAnswers> {
  const prompt = `Based on the transcript below, complete the OASIS Section G items (M1800 to M1860) with numerical codes. Respond in JSON format only, without any markdown formatting or code blocks. Transcript: ${transcription}`

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a clinical documentation AI for home health assessments. You are specialized on filling the OASIS form. Always respond with pure JSON, no markdown formatting or code blocks.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
  })

  const content = response.choices[0].message.content ?? '{}'

  const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim()

  try {
    return JSON.parse(cleanContent) as SectionGAnswers
  } catch (error) {
    console.error('Failed to parse Section G answers:', error)
    console.error('Raw content:', content)
    throw new Error('Failed to parse Section G answers from AI response')
  }
}
