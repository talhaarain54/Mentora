import { createContext, useState } from "react";

export const MentorContext = createContext({});

export function MentorProvider({children}) {
    const [mentor, setMentor] = useState({});

    return (
        <MentorContext.Provider value={{mentor, setMentor}}>
            {children}
        </MentorContext.Provider>

    )
}

