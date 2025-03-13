import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { MapPin, Calendar } from 'lucide-react'
import { PageProps } from '@/lib/next-types'

export const dynamic = 'force-dynamic'

interface Event {
  id: string
  title: string
  content: string
  date: string
  location: string
  image_url: string
  image_urls: string[]
  created_at: string
  updated_at: string
}

interface EventParams {
  id: string
}

export default async function EventPage({ params }: PageProps<EventParams>) {
  const resolvedParams = await params;
  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !event) {
    redirect('/events')
  }

  const images = event.image_urls || (event.image_url ? [event.image_url] : [])
  const hasMultipleImages = images.length > 1

  return (
    <article className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{event.title}</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <time dateTime={event.date}>
              {format(new Date(event.date), 'PPP')}
            </time>
          </div>
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{event.location}</span>
          </div>
        </div>

        {images.length > 0 && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={images[0]}
              alt={`${event.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Display additional images if available */}
        {hasMultipleImages && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${event.title} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: event.content }} />
        </div>
      </div>
    </article>
  )
} 