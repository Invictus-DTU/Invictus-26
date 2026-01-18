'use client'
import React, { useState, useEffect, useContext } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Events/ui/carousel'
import { AuthContext } from '@/contexts/AuthContext'

// --- 1. Event Card ---
const EventCard = ({ title, isActive }) => {
  return (
    <div
      className={`
        relative bg-white transition-all duration-500 ease-in-out
        w-[279px] h-[377px]
        rounded-2xl
        border-4 border-[#C5A059]
        flex flex-col items-center p-4
        shadow-[6px_10px_4px_rgba(0,0,0,0.25)]
        ${isActive ? 'scale-100 md:scale-110 z-20' : 'scale-90 z-10'}
      `}
    >
      <div className="absolute inset-2 border-2 border-[#C5A059]/50 rounded-xl pointer-events-none" />

      <div className="z-10 mt-4 text-center">
        <h3 className="text-[#C5A059] font-bold text-2xl uppercase tracking-widest font-serif">
          {title || 'EVENT NAME'}
        </h3>
      </div>

      <div className="z-10 w-full flex-1 my-3 border-2 border-[#C5A059]/30 bg-[#FFF8E7] rounded-lg flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-[#C5A059]/20 mx-auto mb-2 flex items-center justify-center">
            <span className="text-[#C5A059] text-xl">📷</span>
          </div>
          <p className="text-[#C5A059] text-[10px] font-bold tracking-widest leading-relaxed">
            EVENT PHOTO<br />THEME BACKGROUND
          </p>
        </div>
      </div>

      {isActive && (
        <div className="flex justify-center items-center">
          <img
            src="/lotus.svg"
            alt="Lotus Decoration"
            className="w-14 h-10 sm:w-16 sm:h-10 md:w-18 md:h-12 drop-shadow-md"
          />
        </div>
      )}

      <button className="z-10 w-[90%] py-3 mb-2 bg-gradient-to-r from-[#FAEAB1] to-[#C5A059] text-white font-bold rounded-full shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5 uppercase tracking-widest text-sm border border-[#C5A059]">
        Register Now
      </button>
    </div>
  )
}

// --- 2. Main Carousel Component ---
export default function CardComponent({ setLotusClass, setLotusStyle }) {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [eventsLoading, setEventsLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [eventsError, setEventsError] = useState(null)

  // const {
  //   events,
  //   eventsLoading,
  //   getEvents,
  // } = useContext(AuthContext)

  // 🌸 Lotus center → fade animation (unchanged)
  useEffect(() => {
    if (!setLotusClass) return
    setLotusStyle({})

    setLotusClass(`
      top-3/4 left-1/2 fixed
      -translate-x-1/2 -translate-y-1/2
      w-[160px]
      opacity-80
      z-999
      transition-all duration-700 ease-in-out
    `)

    const timeout = setTimeout(() => {
      setLotusClass(`fixed
        top-3/4 left-1/2
        -translate-x-1/2 -translate-y-1/2
        w-[160px]
        opacity-0
        z-999
        transition-all duration-500 ease-in-out
      `)
    }, 500)

    return () => clearTimeout(timeout)
  }, [setLotusClass, setLotusStyle])


// events get from backend
  useEffect(() => {
    const getEvents = async () => {
      const res = await fetch(`${backend_url}/events/`)
      if (!res.ok) {
        setEventsLoading(false)
        setEventsError("Unable to get events")
      }
      const events = await res.json()
      console.log(events)
      setEvents(events)
      setEventsError(null)
      setEventsLoading(false)
    }
    getEvents()
  }, [])

  // 🔄 Active index sync
  useEffect(() => {
    if (!api || !events?.length) return

    const update = () => {
      setCurrent(api.selectedScrollSnap() % events.length)
    }

    update()
    api.on('select', update)
  }, [api, events])

  // ✅ Loading state (silent)
  if (eventsLoading) {
    return <div className="min-h-[600px]" />
  }

  // ✅ Coming Soon (exact UI preserved)
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4 p-8 border-4 border-[#C5A059] rounded-2xl bg-[#FFF8E7] shadow-xl">
          <h2 className="text-[#C5A059] text-4xl md:text-7xl font-bold font-serif tracking-widest">
            COMING SOON
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mx-auto rounded-full" />
          <p className="text-[#7A6C45] font-bold uppercase tracking-widest mt-4">
            Stay tuned for amazing events
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-20 flex justify-center min-h-[600px] overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{ align: 'center', loop: true }}
        className="w-full max-w-5xl"
      >
        <CarouselContent className="-ml-4 items-center pt-10 pb-10">
          {events.map((ev, index) => (
            <CarouselItem
              key={ev.id || index}
              className="pl-4 basis-[85%] md:basis-1/3 flex justify-center"
            >
              <EventCard
                title={ev.name}
                isActive={index === current}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full border-2 border-[#C5A059] bg-white text-[#C5A059]
          shadow-md hover:bg-[#C5A059] hover:text-white transition"
          onClick={() => {
            setCurrent(current - 1 ? current !== 0 : 0)
          }}
        />
        <CarouselNext
          className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 z-30
          h-10 w-10 rounded-full border-2 border-[#C5A059] bg-white text-[#C5A059]
          shadow-md hover:bg-[#C5A059] hover:text-white transition"
          onClick={() => {
            setCurrent(current + 1 ? current + 1 < events.length : events.length - 1)
          }}
        />
      </Carousel>
    </div>
  )
}
