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
  const postId = resolvedParams.id;
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

  const { data, error } = await supabase
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
    .eq('id', postId)
    .single()

  if (error || !data) {
    redirect('/blog')
  }

  const blog: BlogPost = data;
  const estimatedReadTime = Math.ceil(blog.content.split(' ').length / 200);
  const category = blog.blog_categories;

  return (
    <div className="min-h-screen">
      <div className="relative">
        {blog.image_url && (
          <div className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src={blog.image_url}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          </div>
        )}
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
          <article className="max-w-5xl mx-auto relative">
            <div className={blog.image_url 
              ? "-mt-32 bg-background/95 backdrop-blur-sm rounded-t-xl p-6 md:p-8 lg:p-10 xl:p-12 shadow-lg space-y-4" 
              : "space-y-4 pt-8"
            }>
              {category && (
                <Badge
                  className="mb-2"
                  style={{
                    backgroundColor: category.color || '#666',
                    color: '#fff',
                  }}
                >
                  {category.name}
                </Badge>
              )}

              <h1 className="text-4xl font-bold">{blog.title}</h1>

              <div className="flex items-center justify-between py-4 border-y">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    {blog.author_avatar_url ? (
                      <AvatarImage src={blog.author_avatar_url} alt={blog.author_name} />
                    ) : (
                      <AvatarFallback>{blog.author_name[0]}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{blog.author_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(blog.created_at), 'MMMM d, yyyy')} · {estimatedReadTime} min read
                    </p>
                  </div>
                </div>

                <Link href="/blog" className="flex items-center text-sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to blogs
                </Link>
              </div>
            
              <div 
                className="prose dark:prose-invert max-w-none mt-8 
                  [&>p]:leading-relaxed [&>p]:mb-6 [&>p]:text-[16px] md:[&>p]:text-lg lg:[&>p]:text-xl 
                  [&>p]:tracking-normal [&>p]:mx-auto [&>p]:max-w-none md:[&>p]:max-w-4xl
                  [&>p]:px-4 md:[&>p]:px-0
                  [&>h2]:text-xl md:[&>h2]:text-2xl lg:[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8
                  [&>h3]:text-lg md:[&>h3]:text-xl lg:[&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-6
                  [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:px-4 md:[&>ul]:px-0
                  [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:px-4 md:[&>ol]:px-0
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary/20 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:px-4 md:[&>blockquote]:px-0"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </article>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <p className="text-muted-foreground">Comments are coming soon!</p>
        </div>
      </div>
    </div>
  )
} 
