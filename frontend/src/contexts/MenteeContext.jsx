import { createContext, useState } from "react";

export const MenteeContext = createContext({});

export function MenteeProvider({children}) {
    const [mentee, setMentee] = useState({});

    return (
        <MenteeContext.Provider value={{mentee, setMentee}}>
            {children}
        </MenteeContext.Provider>
    )
}
