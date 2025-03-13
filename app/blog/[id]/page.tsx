import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import { PageProps } from '@/lib/next-types'

export const dynamic = 'force-dynamic'

interface BlogPost {
  id: number
  title: string
  content: string
  image_url: string | null
  created_at: string
  author_name: string
  author_avatar_url: string | null
  blog_categories: {
    id: number
    name: string
    slug: string
    color: string
  } | null
  estimated_read_time?: number
}

interface BlogParams {
  id: string;
  [key: string]: string;
}

export default async function BlogPostPage({ params }: PageProps<BlogParams>) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  
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

  const { data: post, error } = await supabase
    .from('blogs')
    .select(`
      *,
      blog_categories (
        id,
        name,
        slug,
        color
      )
    `)
    .eq('id', resolvedParams.id)
    .single()

  if (error || !post) {
    redirect('/blog')
  }

  const wordCount = post.content.split(/\s+/).length
  const readTimeMinutes = Math.ceil(wordCount / 200)
  post.estimated_read_time = readTimeMinutes

  const formattedDate = format(new Date(post.created_at), 'MMMM d, yyyy')

  return (
    <div className="container mx-auto py-12">
      <div className="mb-8">
        <Link href="/blog" className="flex items-center text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                {post.author_avatar_url ? (
                  <AvatarImage src={post.author_avatar_url} alt={post.author_name} />
                ) : (
                  <AvatarFallback>{post.author_name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="font-medium">{post.author_name}</div>
                <div className="text-sm text-muted-foreground">{formattedDate}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {post.blog_categories && (
                <Badge 
                  style={{ 
                    backgroundColor: post.blog_categories.color || '#888',
                    color: '#fff'
                  }}
                >
                  {post.blog_categories.name}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">{post.estimated_read_time} min read</span>
            </div>
          </div>
        </header>

        {post.image_url && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>
    </div>
  )
} 
