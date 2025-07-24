import React from 'react'
import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import {recentSessions} from "@/constants";
const Page = () => {
  return (
    <main>

      <h1 className="text-2xl underline">
Popular Companions
      </h1>

           <section className="home-section">
               <CompanionCard
                    id="123"
                    name="Neura the Brainy Explorer"
                    topic="Neural Network of Brain"
                    subject="Science"
                    duration={45}
                    color="#ffda6e"

               />
               <CompanionCard
                   id="456"
                   name="Countsy the Number Wizard"
                   topic="Derivatives & Integrals"
                   subject="Mathematics"
                   duration={20}
                   color="#e5d0ff"

               />
               <CompanionCard
               id="789"
               name="Verba the Vocabulary Builder"
               topic="English Lectures"
               subject="English"
               duration={30}
               color="#BDE7FF"

           />


           </section>

        <section className="home-section md:flex md:justify-evenly md:gap-8">
            <CompanionsList
                title="Recently completed sessions"
                companions={recentSessions}
                />
            <CTA/>
        </section>
    </main>
  )
}

export default Page