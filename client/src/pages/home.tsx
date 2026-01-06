import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  ArrowRight, 
  Check, 
  Clock, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Phone, 
  Mail, 
  Linkedin, 
  Menu, 
  X,
  Calendar,
  Zap,
  Bot,
  Globe,
  LayoutTemplate,
  Send,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Assets
import heroBg from "@assets/generated_images/abstract_digital_network_background_deep_blue_and_teal.png";
import diffImage from "@assets/generated_images/modern_office_workflow_automation_concept.png";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide more detail"),
});

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you would connect to your API
    console.log(values);
    toast({
      title: "Message Sent",
      description: "Thanks for reaching out. We'll be in touch shortly.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-secondary selection:text-white">
      {/* 1. NAVIGATION */}
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              R
            </div>
            <span className="font-bold text-xl tracking-tight text-primary">RODACS <span className="text-secondary">Group</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('difference')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">The Difference</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Contact</button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-secondary hover:bg-teal-700 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Book a Consultation
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button onClick={() => scrollToSection('services')} className="text-left py-2 font-medium text-slate-600">Services</button>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 font-medium text-slate-600">About</button>
              <button onClick={() => scrollToSection('difference')} className="text-left py-2 font-medium text-slate-600">The Difference</button>
              <button onClick={() => scrollToSection('contact')} className="text-left py-2 font-medium text-slate-600">Contact</button>
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-secondary text-white">Book a Consultation</Button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Digital Network Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-white/50"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary font-semibold text-sm tracking-wide uppercase">
              Automation & AI for Growing Businesses
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              We Don't Build Websites. <br className="hidden md:block"/>
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Systems</span> That Run Your Business.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your website should book appointments, follow up with leads, and handle customer questions—automatically. We make that happen.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" onClick={() => scrollToSection('difference')}>
                See How It Works
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 border-slate-200 hover:border-secondary hover:text-secondary text-slate-600 w-full sm:w-auto" onClick={() => scrollToSection('contact')}>
                Book a Free Consultation
              </Button>
            </div>

            <p className="mt-8 text-sm text-slate-500 flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-secondary" /> Helping service businesses across NJ work smarter, not harder
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. THE DIFFERENCE */}
      <section id="difference" className="py-24 bg-slate-50 relative scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Standard Website */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-slate-300"></div>
              <h3 className="text-2xl font-bold text-slate-400 mb-6 flex items-center gap-3">
                <LayoutTemplate className="w-6 h-6" />
                What Most Agencies Deliver
              </h3>
              <ul className="space-y-4">
                {[
                  "A static website that sits there",
                  "You still chase leads manually",
                  "After-hours inquiries go cold",
                  "Data lives in 10 different places"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-500">
                    <X className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: RODACS System */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-secondary/20 relative overflow-hidden transform md:-translate-y-6 md:scale-105 z-10"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-secondary"></div>
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="w-32 h-32 text-secondary" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-secondary fill-secondary" />
                What We Build
              </h3>
              <ul className="space-y-5">
                {[
                  "A system that captures, qualifies, and follows up with leads automatically",
                  "AI that answers calls and books appointments 24/7",
                  "Workflows that sync your calendar, CRM, and communication tools",
                  "One connected operation instead of scattered tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                    <Check className="w-5 h-5 text-secondary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEM/AGITATION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-8 h-8 text-secondary" />,
                title: "Missed follow-ups costing you customers?",
                desc: "Leads slip through because you're too busy doing the work to chase the work."
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-secondary" />,
                title: "Drowning in scheduling and data entry?",
                desc: "Hours lost every week to tasks a system could handle in seconds."
              },
              {
                icon: <Phone className="w-8 h-8 text-secondary" />,
                title: "After-hours calls going to voicemail?",
                desc: "Customers call your competitor when they can't reach you at 7pm."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOLUTION: WHAT WE ACTUALLY BUILD */}
      <section id="services" className="py-24 bg-primary text-white relative overflow-hidden scroll-mt-20">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-50"></div>
          <div className="w-full h-full bg-gradient-to-b from-primary to-slate-900"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">What We Actually Build</h2>
            <p className="text-blue-200 text-lg">We create the infrastructure that lets your business scale without the chaos.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Automated Workflows",
                desc: "We connect your tools—calendar, email, CRM, forms—so data flows automatically. No more copy-pasting between apps."
              },
              {
                icon: <Bot className="w-8 h-8" />,
                title: "AI-Powered Communication",
                desc: "Phone agents and chatbots that answer questions, book appointments, and qualify leads—even at 2am."
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Websites That Work",
                desc: "Not brochures. Hubs. Your site becomes the front door to an automated system that handles intake, booking, and follow-up."
              },
              {
                icon: <Settings className="w-8 h-8" />,
                title: "Business Systems Design",
                desc: "We map your operations and build the infrastructure so your business runs smoother as you grow."
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/10 border-white/10 text-white backdrop-blur-sm h-full hover:bg-white/20 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4 shadow-lg">
                      {card.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 leading-relaxed text-sm md:text-base opacity-90">
                      {card.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK */}
      <section id="about" className="py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">How We Work</h2>
            <p className="text-slate-600 max-w-xl mx-auto">A transparent process designed to get you results fast.</p>
          </div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-200 z-0"></div>
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                { step: "01", title: "Discovery", desc: "We learn how your business actually runs—where time gets wasted, where leads get lost." },
                { step: "02", title: "Design & Build", desc: "We architect a system tailored to your workflows, then build and integrate it." },
                { step: "03", title: "Launch + Optimize", desc: "We deploy, train your team, and continuously improve based on real results." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none border md:border-none border-slate-100">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-secondary flex items-center justify-center text-3xl font-bold text-secondary shadow-lg mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed px-4">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 text-sm font-semibold text-secondary uppercase tracking-widest bg-teal-50 inline-block px-4 py-2 rounded-full mx-auto table">
              Most clients are live within 2-3 weeks
            </div>
          </div>
        </div>
      </section>

      {/* 7. CASE STUDY PREVIEW */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-secondary rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src={diffImage} 
                alt="Case Study Dashboard" 
                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover aspect-[4/3]"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur rounded-lg p-6 z-20 shadow-lg border-l-4 border-secondary">
                <div className="flex gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-xs text-slate-500 uppercase">Lead Capture</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15h+</div>
                    <div className="text-xs text-slate-500 uppercase">Saved / Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-xs text-slate-500 uppercase">Availability</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="lg:w-1/2">
              <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                Case Study
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">From Scattered to Streamlined</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Shulton LLC was juggling phone calls, manual scheduling, and missed follow-ups. We built an integrated system—website, AI phone agent, automated booking—that handles it all. 
              </p>
              <p className="text-slate-800 font-medium mb-8 border-l-4 border-secondary pl-4 italic">
                "Now we focus on the work, not the admin. The system pays for itself every month."
              </p>
              <Button variant="outline" className="group text-secondary border-secondary hover:bg-secondary hover:text-white">
                Read the Full Case Study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Check className="w-6 h-6 text-secondary" />
                We work best with:
              </h3>
              <ul className="space-y-4">
                {[
                  "Service businesses (contractors, home services, professional services)",
                  "Growing companies ready to systematize",
                  "Owners tired of duct-taping tools together",
                  "Teams who want technology that actually saves time"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5"></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-left opacity-75">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-300">
                <X className="w-6 h-6" />
                Not a fit if:
              </h3>
              <ul className="space-y-4">
                {[
                  "You just want a pretty website that sits there",
                  "You're not ready to trust automation",
                  "You prefer manual data entry (hey, some people do)",
                  "You're looking for the cheapest option, not the best value"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-blue-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5"></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CONTACT / FINAL CTA */}
      <section id="contact" className="py-24 bg-white relative scroll-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* CTA Side */}
            <div>
               <div className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wide mb-4">
                Get Started
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                Ready to Stop Running Your Business on Spreadsheets and Sticky Notes?
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Let's talk about what a real system could do for you. Schedule a free consultation to map out your automation strategy.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-secondary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Email Us</div>
                    <a href="mailto:steven@rodacsgroup.com" className="text-lg font-semibold hover:text-primary">steven@rodacsgroup.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-secondary">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Availability</div>
                    <div className="text-lg font-semibold">Mon-Fri, 9am - 6pm EST</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-2xl font-bold text-primary mb-6">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company LLC" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your current challenges..." 
                            className="min-h-[120px] bg-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-slate-800" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-primary font-bold shadow">
                  R
                </div>
                <span className="font-bold text-xl tracking-tight text-white">RODACS <span className="text-secondary">Group</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Automation & AI for Growing Businesses. We build the systems that help you scale without the headache.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:steven@rodacsgroup.com" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-secondary transition-colors text-left">Services</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-secondary transition-colors text-left">About</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-secondary transition-colors text-left">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:steven@rodacsgroup.com" className="hover:text-secondary transition-colors">steven@rodacsgroup.com</a>
                </li>
                {/* <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </li> */}
              </ul>
            </div>
          </div>
          
          <Separator className="bg-slate-800 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2025 Rodas Consulting Group LLC. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Placeholder */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-teal-600 transition-all hover:scale-110 relative group">
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <div className="absolute right-full mr-4 bg-white text-primary px-4 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with our AI Agent
          </div>
        </button>
      </div>
    </div>
  );
}
