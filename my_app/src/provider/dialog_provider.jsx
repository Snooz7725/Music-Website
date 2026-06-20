import { useState } from 'react'
import { DialogContext } from './dialog_context'

function DialogProvider({ children }) {
    const [activeDialog, setActiveDialog] = useState(null);

    return (
        <DialogContext.Provider value={{ activeDialog, setActiveDialog}}>
            {children}
        </DialogContext.Provider>
    );
}

export default DialogProvider