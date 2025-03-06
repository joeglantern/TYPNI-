'use client'

import { Button } from "@/components/ui/button"
import { Globe, Users, Lightbulb, MessageCircle, Calendar, Award, BookOpen, Network, ArrowRight, Bell, MessagesSquare, ChevronLeft, ChevronRight, Users2, Rocket, Target, Loader2 } from "lucide-react"
import Link from "next/link"
import { EventsCalendar } from "@/components/events-calendar"
import Image from "next/image"
import { ScrollAnimation } from './components/ScrollAnimation'
import { Carousel } from "@/components/ui/carousel"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Footer } from "./components/Footer"
import { Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ClientBoundary } from '@/components/client-boundary'
import Hero from '@/app/components/Hero'
import { Heart } from 'lucide-react'
import LogoStrip from '@/app/components/LogoStrip'
import WeConnectSection from '@/app/components/WeConnectSection'
import { useInView } from 'react-intersection-observer'
import GallerySection from './components/GallerySection'
import FeaturedSection from './components/FeaturedSection'
import ImpactGallery from './components/ImpactGallery'
import InitiativesSection from './components/InitiativesSection'
import ThreeDCardSection from './components/3DCardSection'
import EventCards3D from './components/EventCards3D'
import TestimonialCards3D from './components/TestimonialCards3D'
import dynamic from 'next/dynamic'

interface Event {
  id: number
  title: string
  description: string
  date: string
  status: string
  image_url?: string
}

interface GalleryItem {
  id: number
  title: string
  description: string
  url: string
  created_at: string
}

interface Program {
  id: number
  title: string
  description: string
  status: string
  image_url?: string
  created_at: string
}

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  image_url?: string
  featured: boolean
  created_at: string
}

// Dynamically import the carousel components
const ProgramCarousel3D = dynamic(() => import('@/app/components/ProgramCarousel3D'), {
  ssr: false,
  loading: () => <div className="h-[500px] bg-background animate-pulse" />
})

const SuccessCarousel3D = dynamic(() => import('@/app/components/SuccessCarousel3D'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-background animate-pulse" />
})

const EventsCarousel3D = dynamic(() => import('@/app/components/EventsCarousel3D'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-background animate-pulse" />
})

// Move the main content to a separate client component
function HomeContent() {
  const [events, setEvents] = useState<Event[]>([])
  const [gallery, setGallery] = useState<GalleryItem[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isLaunching, setIsLaunching] = useState(false)
  const rocketRef = useRef<HTMLButtonElement>(null)
  const rocketAudioRef = useRef<HTMLAudioElement | null>(null)
  const [isSoundLoaded, setIsSoundLoaded] = useState(false)
  const clockAudioRef = useRef<HTMLAudioElement | null>(null)
  const [isClockSoundPlaying, setIsClockSoundPlaying] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  useEffect(() => {
    checkAuth()
    const fetchData = async () => {
      // Fetch upcoming events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'Upcoming')
        .order('date', { ascending: true })
        .limit(10)
      
      if (eventsData) setEvents(eventsData as Event[])

      // Fetch gallery images
      const { data: galleryData } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (galleryData) setGallery(galleryData as GalleryItem[])

      // Fetch active programs
      const { data: programsData } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'Active')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (programsData) setPrograms(programsData as Program[])

      // Fetch featured testimonials
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6)
      
      if (testimonialsData) setTestimonials(testimonialsData)
    }

    fetchData()

    // Add clock update functionality
    const updateClock = () => {
      const clockElement = document.getElementById('digital-clock')
      if (clockElement) {
        const now = new Date()
        const hours = now.getHours().toString().padStart(2, '0')
        const minutes = now.getMinutes().toString().padStart(2, '0')
        const seconds = now.getSeconds().toString().padStart(2, '0')
        clockElement.textContent = `${hours}:${minutes}:${seconds}`
      }
    }

    const clockInterval = setInterval(updateClock, 1000)
    return () => clearInterval(clockInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Create and load audio element for rocket sound
    const audio = new Audio('/sounds/rocket-sound-effect-128-ytshorts.savetube.me.mp3')
    audio.volume = 0.5
    audio.addEventListener('canplaythrough', () => {
      setIsSoundLoaded(true)
      rocketAudioRef.current = audio
    })
    audio.addEventListener('error', (e) => {
      console.error('Error loading sound:', e)
    })
    
    return () => {
      if (rocketAudioRef.current) {
        rocketAudioRef.current.pause()
        rocketAudioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Initialize clock sound
    const clockAudio = new Audio('/sounds/fast-ticking-clock-sound-effect-128-ytshorts.savetube.me.mp3')
    clockAudio.volume = 0.2
    clockAudio.loop = true
    clockAudioRef.current = clockAudio

    return () => {
      if (clockAudioRef.current) {
        clockAudioRef.current.pause()
        clockAudioRef.current = null
      }
    }
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
  }

  const scrollToTop = () => {
    setIsLaunching(true)
    
    // Play sound effect if loaded
    if (rocketAudioRef.current && isSoundLoaded) {
      try {
        rocketAudioRef.current.currentTime = 0
        const playPromise = rocketAudioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing sound:", error)
          })
        }
      } catch (error) {
        console.error("Error playing sound:", error)
      }
    }
    
    // Start scrolling after rocket starts launching
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 200)

    // Reset launching state after animation
    setTimeout(() => {
      setIsLaunching(false)
    }, 1500)
  }

  const FeaturedTestimonials = () => {
    if (!testimonials.length) return null

    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What People Say About Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-16 w-16 mb-4">
                      {testimonial.image_url ? (
                        <AvatarImage src={testimonial.image_url} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback>{testimonial.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      )}
                    </Avatar>
                    <blockquote className="text-lg mb-4">{testimonial.content}</blockquote>
                    <footer>
                      <cite className="not-italic font-semibold">{testimonial.name}</cite>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </footer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/testimonials">View All Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }

  useEffect(() => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    scrollRevealElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      scrollRevealElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <Hero />
      
      <ProgramCarousel3D />
      
      <FeaturedSection />
      
      <SuccessCarousel3D />
      
      <InitiativesSection />
      
      <EventsCarousel3D />
      
      <ImpactGallery />
      
      <WeConnectSection />
      
      <LogoStrip />
      
      {/* Features Section with Enhanced Colors */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/50 to-background"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our <span className="text-[#900059]">Programs</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how we're making a difference in communities around the world through our various initiatives.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            {/* Update the features grid with brand colors */}
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="inline-block rounded-lg bg-[#590099] p-1 text-white">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Global Network</h3>
              <p className="text-muted-foreground">
                Connect with youth leaders and change-makers from around the world.
              </p>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="inline-block rounded-lg bg-[#FFBD00] p-1 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Community Building</h3>
              <p className="text-muted-foreground">
                Create lasting connections and foster collaboration among peers.
              </p>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="inline-block rounded-lg bg-[#900059] p-1 text-white">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Innovation Hub</h3>
              <p className="text-muted-foreground">
                Access resources and support for your innovative projects.
              </p>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="space-y-4">
              <div className="inline-block rounded-lg bg-[#FF0054] p-1 text-white">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Mentorship</h3>
              <p className="text-muted-foreground">
                Learn from experienced leaders and industry experts.
              </p>
            </motion.div>
            </div>
        </div>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
      >
        <WeConnectSection />
      </motion.div>

      <GallerySection />
      <TestimonialCards3D />

      {/* Carousel Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="w-full py-12 md:py-24 bg-gradient-to-b from-background via-muted/50 to-background"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Impact</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                See how we're making a difference in communities worldwide
              </p>
            </div>
          </div>
          <Carousel aspectRatio="wide" className="max-w-6xl mx-auto" />
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="w-full py-12 md:py-24 lg:py-32 border-t bg-gradient-radial from-accent/10 via-transparent to-transparent"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Make a Difference?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Join us in our mission to empower youth and create positive change in communities worldwide.
                  </p>
                </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="btn-hover-effect">
                <Link href="/volunteer">
                        Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Community Impact Stories Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)]" />
        </div>

        <div className="container relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-500 mb-6">
              Community Impact Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories of change, growth, and impact from our global community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Youth Leadership Program",
                location: "Nairobi, Kenya",
                impact: "50+ Young Leaders Trained",
                story: "Transforming local youth into community leaders through intensive mentorship and skill development.",
                gradient: "from-blue-500 to-cyan-500",
                image: "/images/youth-leadership.jpg"
              },
              {
                title: "Digital Skills Workshop",
                location: "Remote, Global",
                impact: "200+ Students Empowered",
                story: "Bridging the digital divide by providing free coding and digital literacy education.",
                gradient: "from-purple-500 to-pink-500",
                image: "/images/digital-skills.jpg"
              },
              {
                title: "Community Garden Initiative",
                location: "Mumbai, India",
                impact: "5 Sustainable Gardens Created",
                story: "Creating sustainable food sources while teaching environmental stewardship.",
                gradient: "from-green-500 to-emerald-500",
                image: "/images/community-garden.jpg"
              }
            ].map((story, index) => (
              <div
                key={story.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl",
                  "transform transition-all duration-500 hover:-translate-y-2",
                  "border border-primary/10 hover:border-primary/30",
                  "bg-gradient-to-br from-background/95 to-background/50 backdrop-blur-xl"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                     style={{
                       background: `linear-gradient(to bottom right, var(--${story.gradient.split('-')[1]}-500), var(--${story.gradient.split('-')[2]}))`
                     }} />
                
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Globe className="w-4 h-4 mr-1" />
                      {story.location}
                    </div>
                    <div className="text-sm font-semibold text-primary">
                      {story.impact}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {story.story}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                    >
                      Read Full Story
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                    
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-xs font-medium"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-x-0 top-0 h-px animate-border-width">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-px animate-border-width">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  </div>
                  <div className="absolute inset-y-0 left-0 w-px animate-border-height">
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                  </div>
                  <div className="absolute inset-y-0 right-0 w-px animate-border-height">
                    <div className="w-full h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary/80"
            >
              Explore More Stories
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Events Calendar Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="container px-4"
      >
        <ScrollAnimation>
          <EventsCalendar />
        </ScrollAnimation>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="relative py-24 overflow-hidden font-mono"
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pt-8 pb-12">
          <div className="container px-4">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                Voices of Youth Impact
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Hear from young leaders who have transformed their lives through our community and programs
              </p>
            </div>
          </div>
        </div>
        
        {/* Scrolling Content */}
        <div className="container px-4">
          <div className="relative flex flex-col md:flex-row justify-center gap-4 md:gap-8">
            {/* First Column */}
            <div className="flex flex-col gap-6 animate-scroll-up hover:pause w-full md:w-[350px]">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="w-full md:w-[350px] flex-shrink-0 rounded-xl bg-card p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      {testimonial.image_url ? (
                        <AvatarImage src={testimonial.image_url} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/5 text-primary">
                          {testimonial.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium text-base group-hover:text-primary transition-colors">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground font-normal">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 font-normal group-hover:text-primary/90 transition-colors">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>

            {/* Second Column - Hidden on Mobile */}
            <div className="hidden md:flex flex-col gap-6 animate-scroll-up-delayed mt-[-200px] w-[350px] hover:pause">
              {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}-reverse`}
                  className="w-full md:w-[350px] flex-shrink-0 rounded-xl bg-card p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200 dark:hover:border-gray-800 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      {testimonial.image_url ? (
                        <AvatarImage src={testimonial.image_url} alt={testimonial.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/5 text-primary">
                          {testimonial.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-medium text-base group-hover:text-primary transition-colors">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground font-normal">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-600 dark:text-gray-300 font-normal group-hover:text-primary/90 transition-colors">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          ref={rocketRef}
          onClick={scrollToTop}
          className={cn(
            "rocket-btn",
            isLaunching && "rocket-launch"
          )}
          aria-label="Back to top"
        >
          <Rocket 
            className={cn(
              "w-6 h-6 text-white rocket-icon",
              isLaunching && "launching"
            )} 
          />
        </button>
      )}

      {/* Audio element for rocket sound */}
      <audio id="rocket-sound" src="/sounds/rocket-launch.mp3" preload="auto" />
    </>
  )
}

// Default export becomes a simple wrapper with Suspense
export default function HomePage() {
  return (
    <ClientBoundary>
      <HomeContent />
    </ClientBoundary>
  )
} 