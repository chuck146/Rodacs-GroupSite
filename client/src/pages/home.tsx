import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Loader2,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { AIChatWidget } from "@/components/AIChatWidget";

import heroBg from "@assets/generated_images/abstract_digital_network_background_deep_blue_and_teal.png";
import logoImage from "/logo.png";
import diffImage from "@assets/generated_images/modern_office_workflow_automation_concept.png";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
} as const;

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
} as const;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
} as const;

// Form Schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide more detail"),
});

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to submit form");
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out. We'll be in touch shortly.",
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-secondary selection:text-white">
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* 1. NAVIGATION */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-testid="logo-home"
          >
            <img src={logoImage} alt="RODAS Consulting Group" className="h-14 md:h-16 w-auto max-h-full object-contain group-hover:scale-105 transition-transform" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['services', 'about', 'difference', 'contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item)} 
                className={`text-sm font-medium transition-all hover:text-secondary capitalize ${
                  isScrolled ? 'text-slate-600' : 'text-slate-700'
                }`}
                data-testid={`nav-${item}`}
              >
                {item === 'difference' ? 'The Difference' : item}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-secondary to-accent text-white font-semibold shadow-lg hover:shadow-xl transition-all btn-scale rounded-xl px-6"
              data-testid="button-book-consultation"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Book a Consultation
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {['services', 'about', 'difference', 'contact'].map((item) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item)} 
                  className="text-left py-3 font-medium text-slate-600 capitalize border-b border-slate-100"
                >
                  {item === 'difference' ? 'The Difference' : item}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')} className="w-full bg-gradient-to-r from-secondary to-accent text-white mt-2">
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* 2. HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-teal-50/30"></div>
          <div className="absolute inset-0 grid-pattern"></div>
          <img 
            src={heroBg} 
            alt="" 
            className="w-full h-full object-cover opacity-10"
          />
          
          {/* Floating decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-[10%] w-72 h-72 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-float"
          />
          <motion.div 
            className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-full blur-3xl animate-float-delayed"
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary/5 to-transparent rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg text-primary font-semibold text-sm tracking-wide">
                <Zap className="w-4 h-4 text-secondary" />
                Automation & AI for Growing Businesses
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              <span className="text-primary">We Don't Just Build Websites.</span>
              <br />
              <span className="gradient-text">We Build Systems</span>{' '}
              <span className="text-primary">That Run Your Business.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Your website should book appointments, follow up with leads, and handle customer questions—<span className="text-secondary font-semibold">automatically</span>.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="h-16 px-10 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl hover:shadow-3xl transition-all btn-scale rounded-2xl font-semibold gradient-border-animated" 
                onClick={() => scrollToSection('difference')}
              >
                See How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-10 text-lg border-2 border-slate-200 hover:border-secondary hover:text-secondary text-slate-700 rounded-2xl font-semibold bg-white/50 backdrop-blur-sm" 
                onClick={() => scrollToSection('contact')}
              >
                Book a Free Consultation
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center justify-center gap-3 text-slate-500">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm">
                <Check className="w-5 h-5 text-secondary" />
                <span className="font-medium">Helping businesses across NJ work smarter</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-slate-300 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-secondary rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. THE DIFFERENCE */}
      <section id="difference" className="py-32 bg-gradient-section relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-4">
              The RODAS Difference
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary">
              Not Just a Website. <span className="gradient-text">A Complete System.</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto">
            {/* Left: RODAS System */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden card-lift glow-hover border-2 border-secondary/20"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-secondary to-accent rounded-l-3xl"></div>
              <div className="absolute top-4 right-4 opacity-10">
                <Zap className="w-32 h-32 text-secondary" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                What We Build
              </h3>
              <ul className="space-y-5">
                {[
                  "A system that captures, qualifies, and follows up with leads automatically",
                  "AI that answers calls and books appointments 24/7",
                  "Workflows that sync your calendar, CRM, and communication tools",
                  "One connected operation instead of scattered tools"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right: Standard Website */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-300 rounded-l-3xl"></div>
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <LayoutTemplate className="w-32 h-32 text-slate-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-400 mb-8 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <LayoutTemplate className="w-6 h-6 text-slate-400" />
                </div>
                What Most Agencies Deliver
              </h3>
              <ul className="space-y-5">
                {[
                  "A static website that sits there",
                  "You still chase leads manually",
                  "After-hours inquiries go cold",
                  "Data lives in 10 different places"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-500">
                    <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEM/AGITATION */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Missed follow-ups costing you customers?",
                desc: "Leads slip through because you're too busy doing the work to chase the work."
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Drowning in scheduling and data entry?",
                desc: "Hours lost every week to tasks a system could handle in seconds."
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "After-hours calls going to voicemail?",
                desc: "Customers call your competitor when they can't reach you at 7pm."
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                className="glass-card text-center p-10 rounded-3xl card-lift group"
              >
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:shadow-lg transition-all relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                  <div className="relative text-secondary group-hover:text-white transition-colors icon-hover">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. SOLUTION: WHAT WE ACTUALLY BUILD */}
      <section id="services" className="py-32 bg-gradient-primary text-white relative overflow-hidden scroll-mt-20">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 font-semibold text-sm mb-6 border border-white/20">
              Our Services
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">What We Actually Build</h2>
            <p className="text-blue-100 text-xl">We create the infrastructure that lets your business scale without the chaos.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                title: "Automated Workflows",
                desc: "We connect your tools—calendar, email, CRM, forms—so data flows automatically. No more copy-pasting between apps."
              },
              {
                icon: <Bot className="w-7 h-7" />,
                title: "AI-Powered Communication",
                desc: "Phone agents and chatbots that answer questions, book appointments, and qualify leads—even at 2am."
              },
              {
                icon: <Globe className="w-7 h-7" />,
                title: "Websites That Work",
                desc: "Not brochures. Hubs. Your site becomes the front door to an automated system that handles intake, booking, and follow-up."
              },
              {
                icon: <Settings className="w-7 h-7" />,
                title: "Business Systems Design",
                desc: "We map your operations and build the infrastructure so your business runs smoother as you grow."
              }
            ].map((card, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Card className="glass-card-dark border-0 text-white h-full rounded-3xl card-lift group">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-5 shadow-xl glow group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100 leading-relaxed">{card.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. HOW WE WORK - Timeline */}
      <section id="about" className="py-32 bg-gradient-section scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-4">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">How We Work</h2>
            <p className="text-slate-600 max-w-xl mx-auto text-lg">A transparent process designed to get you results fast.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Timeline connector line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-secondary via-accent to-secondary rounded-full -translate-y-1/2"></div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-12 relative z-10"
            >
              {[
                { step: "01", title: "Discovery", desc: "We learn how your business actually runs—where time gets wasted, where leads get lost." },
                { step: "02", title: "Design & Build", desc: "We architect a system tailored to your workflows, then build and integrate it." },
                { step: "03", title: "Launch + Optimize", desc: "We deploy, train your team, and continuously improve based on real results." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center"
                >
                  <div className="glass-card w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold gradient-text shadow-xl mb-8 border-4 border-white glow-hover">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <span className="inline-block text-sm font-bold text-white uppercase tracking-widest bg-gradient-to-r from-secondary to-accent px-6 py-3 rounded-full shadow-lg">
                Most clients are live within 2-3 weeks
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. CASE STUDY PREVIEW */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-accent rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src={diffImage} 
                alt="Case Study Dashboard" 
                className="relative rounded-3xl shadow-2xl z-10 w-full object-cover aspect-[4/3]"
              />
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 left-6 right-6 glass-card rounded-2xl p-6 z-20 shadow-xl"
              >
                <div className="flex justify-around text-center">
                  {[
                    { value: "100%", label: "Lead Capture" },
                    { value: "15h+", label: "Saved / Week" },
                    { value: "24/7", label: "Availability" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide mb-6">
                Case Study
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">From Scattered to Streamlined</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Shulton LLC was juggling phone calls, manual scheduling, and missed follow-ups. We built an integrated system—website, AI phone agent, automated booking—that handles it all. 
              </p>
              <blockquote className="text-slate-800 text-xl font-medium mb-8 border-l-4 border-secondary pl-6 italic bg-slate-50 py-4 pr-4 rounded-r-xl">
                "Now we focus on the work, not the admin. The system pays for itself every month."
              </blockquote>
              <Button variant="outline" className="group text-secondary border-2 border-secondary hover:bg-secondary hover:text-white rounded-xl font-semibold btn-scale">
                Read the Full Case Study 
                <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. WHO THIS IS FOR */}
      <section className="py-32 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="glass-card-dark p-10 rounded-3xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                We work best with:
              </h3>
              <ul className="space-y-5">
                {[
                  "Service businesses (contractors, home services, professional services)",
                  "Growing companies ready to systematize",
                  "Owners tired of duct-taping tools together",
                  "Teams who want technology that actually saves time"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-blue-100 text-lg">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2.5"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass-card-dark p-10 rounded-3xl opacity-80">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-red-300">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-300" />
                </div>
                Not a fit if:
              </h3>
              <ul className="space-y-5">
                {[
                  "You just want a pretty website that sits there",
                  "You're not ready to trust automation",
                  "You prefer manual data entry (hey, some people do)",
                  "You're looking for the cheapest option, not the best value"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-blue-200 text-lg">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2.5"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 9. CONTACT / FINAL CTA */}
      <section id="contact" className="py-32 bg-gradient-section relative scroll-mt-20 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm mb-6">
                Get Started
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                Ready to Stop Running Your Business on <span className="gradient-text">Spreadsheets and Sticky Notes?</span>
              </h2>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Let's talk about what a real system could do for you. Schedule a free consultation to map out your automation strategy.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="w-6 h-6" />, label: "Email Us", value: "steven@rodascgroup.com", href: "mailto:steven@rodascgroup.com" },
                  { icon: <Calendar className="w-6 h-6" />, label: "Availability", value: "Mon-Fri, 9am - 6pm EST" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-5 text-slate-700">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-secondary">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-semibold hover:text-secondary transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-lg font-semibold">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-primary mb-8">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12 rounded-xl bg-white/80 border-slate-200 focus:border-secondary" data-testid="input-name" />
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
                        <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} className="h-12 rounded-xl bg-white/80 border-slate-200 focus:border-secondary" data-testid="input-email" />
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
                        <FormLabel className="text-slate-700 font-medium">Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company LLC" {...field} className="h-12 rounded-xl bg-white/80 border-slate-200 focus:border-secondary" data-testid="input-company" />
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
                        <FormLabel className="text-slate-700 font-medium">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your current challenges..." 
                            className="min-h-[120px] rounded-xl bg-white/80 border-slate-200 focus:border-secondary resize-none" 
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 rounded-xl font-semibold btn-scale shadow-lg" 
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-gradient-dark text-slate-300 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoImage} alt="RODAS Consulting Group" className="h-28 w-auto object-contain bg-white rounded-lg p-3" />
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
                Automation & AI for Growing Businesses. We build the systems that help you scale without the headache.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                  { icon: <Mail className="w-5 h-5" />, href: "mailto:steven@rodascgroup.com" }
                ].map((item, i) => (
                  <a 
                    key={i}
                    href={item.href} 
                    className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all border border-white/10"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-4">
                {['services', 'about', 'contact'].map((item) => (
                  <li key={item}>
                    <button 
                      onClick={() => scrollToSection(item)} 
                      className="hover:text-secondary transition-colors capitalize"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-secondary" />
                  <a href="mailto:steven@rodascgroup.com" className="hover:text-secondary transition-colors">steven@rodascgroup.com</a>
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="bg-white/10 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>&copy; 2025 Rodas Consulting Group LLC. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot Widget */}
      <AIChatWidget />
    </div>
  );
}
