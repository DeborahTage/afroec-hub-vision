import { NextRequest, NextResponse } from 'next/server'

/**
 * Fallback detail loader for when the live JSON detail API is not deployed yet.
 * Parses the existing Spring/Thymeleaf admin HTML pages which already expose full records.
 */

const API_UPSTREAM = (process.env.API_UPSTREAM || 'https://afroec-backend.onrender.com/api/v1').replace(/\/$/, '')
const ORIGIN = (process.env.API_ORIGIN || API_UPSTREAM.replace(/\/api\/v1$/i, '')).replace(/\/$/, '')

const TYPE_PATH: Record<string, (id: string) => string> = {
  AMBASSADOR: (id) => `/admin/ambassadors/${id}`,
  INTERNSHIP: (id) => `/admin/internships/${id}`,
  VOLUNTEER: (id) => `/admin/volunteers/${id}`,
  PARTNER: (id) => `/admin/partners/${id}`,
  STUDENT: (id) => `/admin/applications/${id}`
}

const LABEL_TO_KEY: Record<string, string> = {
  'full name': 'fullName',
  email: 'email',
  phone: 'phone',
  city: 'city',
  institution: 'institutionName',
  'institution type': 'institutionType',
  type: 'institutionType',
  grade: 'gradeLevel',
  'field of study': 'fieldOfStudy',
  field: 'fieldOfStudy',
  'proposed club': 'proposedClubName',
  'estimated members': 'estimatedMembers',
  'hours/week': 'hoursPerWeek',
  'hours / week': 'hoursPerWeek',
  skills: 'techSkills',
  'support needed': 'supportNeeded',
  motivation: 'motivationLetter',
  leadership: 'leadershipExperience',
  department: 'department',
  duration: 'duration',
  start: 'startDate',
  'learning goals': 'learningGoals',
  cv: 'cvUrl',
  portfolio: 'portfolioUrl',
  'recommendation letter': 'recommendationLetterUrl',
  'commit hours': 'commitHours',
  'commit club': 'commitClub',
  'commit bootcamp': 'commitBootcamp',
  'agree conduct': 'agreeConduct',
  'primary role': 'primaryRole',
  'secondary role': 'secondaryRole',
  availability: 'availability',
  commitment: 'commitmentDuration',
  experience: 'experienceLevel',
  background: 'professionalBackground',
  languages: 'languages',
  interests: 'partnershipInterest',
  message: 'message',
  received: 'createdAt',
  'date of birth': 'dateOfBirth',
  gender: 'gender',
  education: 'educationLevel',
  employment: 'employmentStatus',
  program: 'programType',
  'academy track': 'academyTrack',
  'community program': 'communityProgram',
  'prior experience': 'priorExperience',
  'career goals': 'careerGoals',
  'github / portfolio': 'githubPortfolio',
  'preferred start': 'preferredStartDate',
  'how did you hear': 'howDidYouHear',
  submitted: 'createdAt'
}

function stripTags(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()
}

function parseDetailHtml(html: string, type: string, id: number) {
  const out: Record<string, unknown> = { id, type }
  const pairRe = /<dt\b[^>]*>([\s\S]*?)<\/dt>\s*<dd\b[^>]*>([\s\S]*?)<\/dd>/gi
  let match: RegExpExecArray | null
  while ((match = pairRe.exec(html)) !== null) {
    const label = stripTags(match[1]).toLowerCase()
    const value = stripTags(match[2])
    if (!label || !value || value === '-') continue
    const key = LABEL_TO_KEY[label] || label.replace(/[^a-z0-9]+([a-z0-9])/g, (_, c) => c.toUpperCase())
    out[key] = value
  }

  // Capture common header name blocks
  const h4 = html.match(/<h4\b[^>]*>([\s\S]*?)<\/h4>/i)
  if (h4) out.fullName = stripTags(h4[1])

  // Motivation text for ambassadors may include special unicode spaces
  if (typeof out.motivationLetter === 'string') {
    out.motivationLetter = String(out.motivationLetter).replace(/\u200b/g, '').trim()
  }
  if (type === 'VOLUNTEER' && out.motivationLetter && !out.motivation) {
    out.motivation = out.motivationLetter
    delete out.motivationLetter
  }
  if (type === 'PARTNER' && out.institutionType) {
    out.organizationType = out.institutionType
    delete out.institutionType
  }

  return out
}

type Ctx = { params: Promise<{ type: string; id: string }> }

export async function GET(req: NextRequest, ctx: Ctx) {
  const { type: rawType, id } = await ctx.params
  const type = rawType.trim().toUpperCase()
  const pathBuilder = TYPE_PATH[type]
  if (!pathBuilder || !/^\d+$/.test(id)) {
    return NextResponse.json({ success: false, message: 'Invalid application reference.' }, { status: 400 })
  }

  const authorization = req.headers.get('authorization')
  if (!authorization) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 })
  }

  const upstreamUrl = `${ORIGIN}${pathBuilder(id)}`
  let upstream: Response
  try {
    upstream = await fetch(upstreamUrl, {
      headers: {
        Accept: 'text/html',
        Authorization: authorization,
        Cookie: `AFH_ADMIN_TOKEN=${authorization.replace(/^Bearer\s+/i, '')}`
      },
      redirect: 'manual',
      cache: 'no-store'
    })
  } catch {
    return NextResponse.json({ success: false, message: 'Unable to reach the API server.' }, { status: 502 })
  }

  if (upstream.status >= 300 && upstream.status < 400) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 })
  }
  if (!upstream.ok) {
    return NextResponse.json({ success: false, message: 'Not found.' }, { status: upstream.status })
  }

  const html = await upstream.text()
  if (/admin\/login/i.test(html) && !/<dt\b/i.test(html)) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 })
  }

  const data = parseDetailHtml(html, type, Number(id))
  return NextResponse.json({ success: true, message: 'OK', data })
}
