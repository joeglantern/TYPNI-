'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Users, Target, Award, HandshakeIcon, Building2 } from 'lucide-react'

// Partner logos data
const partners = [
  {
    name: "Partner Organization 1",
    logo: "/TYPNI-11.jpg",
    category: "Education",
    description: "Leading educational institution focused on youth development"
  },
  {
    name: "Partner Organization 2",
    logo: "/TYPNI-12.jpg",
    category: "Technology",
    description: "Innovative tech company supporting digital literacy"
  },
  {
    name: "Partner Organization 3",
    logo: "/TYPNI-13.jpg",
    category: "Community",
    description: "Community-focused organization driving local change"
  },
  {
    name: "Partner Organization 4",
    logo: "/TYPNI-14.jpg",
    category: "Education",
    description: "Global education network empowering youth"
  },
  {
    name: "Partner Organization 5",
    logo: "/TYPNI-16.jpg",
    category: "Technology",
    description: "Tech solutions for social impact"
  },
  {
    name: "Partner Organization 6",
    logo: "/TYPNI-18.jpg",
    category: "Community",
    description: "Grassroots organization fostering community development"
  },
  {
    name: "Partner Organization 7",
    logo: "/TYPNI-19.jpg",
    category: "Education",
    description: "Educational foundation supporting youth initiatives"
  },
  {
    name: "Partner Organization 8",
    logo: "/TYPNI-20.jpg",
    category: "Technology",
    description: "Digital transformation partner"
  }
]

const categories = ["All", "Education", "Technology", "Community"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function PartnershipsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredPartners, setFilteredPartners] = useState(partners)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPartners(partners)
    } else {
      setFilteredPartners(partners.filter(partner => partner.category === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen py-16 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 -z-10" />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Global Partners
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Together with our partners, we're creating lasting impact and transforming communities worldwide.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Building2, label: "Partner Organizations", value: "50+" },
            { icon: Globe, label: "Countries Reached", value: "25+" },
            { icon: Users, label: "People Impacted", value: "100K+" },
            { icon: Target, label: "Joint Projects", value: "200+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group p-6 rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90 border border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <stat.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Partners Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl bg-background border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
                    {partner.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {partner.description}
                </p>
              </div>
              <div className="absolute inset-0 border-2 border-primary/0 rounded-2xl group-hover:border-primary/20 pointer-events-none transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 p-12">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our global network of partners and help us create lasting positive impact in communities worldwide.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Partner With Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>
      </section>
    </div>
  )
} 