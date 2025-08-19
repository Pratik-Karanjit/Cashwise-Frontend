'use client'

import Button from "../../components/Button";
import Image from "next/image";
import countingCash from "../../public/images/counting.png"
import { useState } from "react";

export default function SplitBill() {
    const [people, setPeople] = useState([{ id: 1, name: '' }]);
    const [totalAmount, setTotalAmount] = useState('');

    const addPerson = () => {
        const newPerson = {
            id: Date.now(),
            name: ''
        };
        setPeople([...people, newPerson]);
    };

    const removePerson = (idToRemove: number) => {
        if (people.length > 1) {
            setPeople(people.filter(person => person.id !== idToRemove));
        }
    };

    const updatePersonName = (id: number, name: string) => {
        setPeople(people.map(person =>
            person.id === id ? { ...person, name } : person
        ));
    };

    return (
        <div className='w-full flex bg-white h-[90vh]'>
            <div className='w-1/2 flex justify-center items-start pt-44'>
                <div className='flex flex-col gap-5 w-7/12'>
                    <span className="text-primary text-3xl">Add people to <span className='text-3xl text-secondary'>split!</span></span>

                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        placeholder="Total Amount to split"
                        className="rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />

                    <div className="flex flex-col gap-5">
                        {people?.map((person) => (
                            <div key={person.id} className="flex flex-row gap-5 items-center">
                                <input
                                    type="text"
                                    value={person.name}
                                    onChange={(e) => updatePersonName(person.id, e.target.value)}
                                    placeholder="Full Name"
                                    className="flex-1 rounded-md shadow-sm border border-[#e5e5e5] text-primary placeholder:text-primary/50 outline-0 py-2.5 px-3 focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />

                                {people?.length > 1 && (
                                    <div
                                        onClick={() => removePerson(person.id)}
                                        className="px-4 py-3 bg-primary text-white rounded-md border-[#e5e5e5] cursor-pointer hover:bg-secondary transition-colors"
                                    >
                                        -
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-start">
                            <Button text="Add Person"
                                onClick={addPerson} />
                        </div>
                    </div>

                    {totalAmount && people.length > 0 && (
                        <div className="mt-4 p-3 bg-gray-100 rounded-md">
                            <p className="text-primary">
                                Amount per person: <span className="font-bold text-secondary">
                                    ${(parseFloat(totalAmount) / people.length).toFixed(2)}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className='w-1/2 flex justify-center items-start pt-44'>
                <Image
                    src={countingCash}
                    alt='Counting cash'
                    width={420}
                    height={420}
                />
            </div>
        </div>
    )
}