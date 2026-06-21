import { useState } from 'react'

export function usePaste() {
    function handlePaste(e) {
        try {
            // Get clipboard data and check if it's valid
            const items = e.clipboardData?.items;
            if (!items) throw new Error('Clipboard Read Error');

            // Go through and check for images; if image found then save as blob 
            // and stop searching
            for (const item of items) {
                if (item.type.startsWith('image/')) {
                    const blob = item.getAsFile();
                    setBlob(blob);

                    if (!blob) continue;
                    break
                }
            }
        } catch (error) {
            console.error('Paste failed:', error);
        }
    }

    const [blob, setBlob] = useState(null)

    document.addEventListener('paste', handlePaste)

    return blob
}