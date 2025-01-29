'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SkillHeatmap() {
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  console.log(selectedPeople);
  const [skills, setSkills] = useState([]);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    axios.get("https://forinterview.onrender.com/people")
      .then(response => setPeople(response.data))
      .catch(error => console.error("Error fetching people:", error));
  }, []);

  const addPerson = async (person) => {
    if (selectedPeople.some(p => p.id === person.id)) return;
    try {
      const response = await axios.get(`https://forinterview.onrender.com/people/${person.id}`);
      const skillset = response.data?.data?.data?.skillset || [];

      const newSkills = new Set([...skills]);
      const personSkills = skillset.flatMap(category =>
        category.skills?.flatMap(skill => {
          newSkills.add(skill.name);
          return skill.pos.map(pos => ({
            skill: skill.name,
            person: person.name,
            consensus_score: pos.consensus_score || 0,
          }));
        }) || []
      );

      setSkills([...newSkills]);
      setSelectedPeople([...selectedPeople, person]);
      setHeatmapData([...heatmapData, ...personSkills]);
    } catch (error) {
      console.error("Error fetching person data:", error);
    }
  };

  const getColor = (score) => {
    if (score <= 0) return 'bg-[#ececec]';
    if (score <= 1) return 'bg-[#F8F8A6]';
    if (score <= 2) return 'bg-[#A6D96A]';
    if (score <= 3) return 'bg-[#1A9641]';
    if (score <= 4) return 'bg-[#003F0B]';
    return 'bg-[#FFFFFF]';
  };

  return (
    <div className="p-5 flex w-full">
        <div>
            <div className="">
                    <h3 className="text-2xl font-semibold w-full px-3 py-3 text-center">Most Recommended</h3>
                    {people.map(person => (
                    <div key={person.id} className='py-2 px-3 font-semibold mx-auto flex items-center s'>
                        <div className='flex justify-between items-center w-full border-b border-gray-400 py-2'>
                            <div>
                                {person.name}
                            </div>
                            <button
                                className={`rounded-full border-2 h-5 w-5 transition-all duration-100 font-semibold flex items-center justify-center mr-20 ${
                                    selectedPeople.some(p => p.id === person.id)
                                        ? 'border-red-500 text-red-500'
                                        : 'border-blue-500 text-blue-500'
                                }`}
                                onClick={() => {
                                    if (selectedPeople.some(p => p.id === person.id)) {
                                        setSelectedPeople(selectedPeople.filter(p => p.id !== person.id));
                                        setHeatmapData(heatmapData.filter(data => data.person !== person.name));
                                    } else {
                                        addPerson(person);
                                    }
                                }}
                            >
                                {selectedPeople.some(p => p.id === person.id) ? '-' : '+'}
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <h3 className="text-lg text-white font-semibold px-2 border-black border-2 py-2 bg-[#209653] mb-2 w-fit flex items-center ">Compare View</h3>
                </div>
                <div className='flex'>
            <div>
                <div className=''>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Application of Typography</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Applying Color Theory</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creation of Brands</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating User Personas</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating Effective Icons</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Conducting Usability Tests</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Gathering User Feedback</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating Effective Surveys</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Crafting Effective Questions</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Conducting Market Research</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Using Figma for Design</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Designing Responsive Interactions</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Designing Functional Micro-Interactions</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Designing User Flows</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating Sitemaps</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating Basic Prototypes</div>
                    <div className='flex items-center text-sm h-8 w-fit mb-1 font-medium text-center'>Creating Wireframes</div>
                </div>
                {/* {console.log("skills", skills)} */}
            </div>
            <div>
                <div className="ml-5">
                    {selectedPeople.length === 0 ? (
                        <div className='flex items-center justify-center h-screen w-full'>
                            <div className='bg-[#209653] text-white border-2 border-black w-fit cursor-pointer py-3 px-2 font-semibold'>Select candidate to compare</div>
                        </div>
                    ) : (
                    <div className="grid grid-flow-col auto-cols-max gap-2">
                        {selectedPeople.map(person => (
                        <div key={person.id} className="flex flex-col items-start space-y-1">
                            {skills.map(skill => {
                            const skillData = heatmapData.find(data => data.person === person.name && data.skill === skill);
                            const consensusScore = skillData ? skillData.consensus_score : 0;

                            return (
                                <div
                                key={`${person.id}-${skill}`}
                                className={`w-12 h-8 ${getColor(consensusScore)}`}
                                ></div>
                            );
                            })}
                        </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
