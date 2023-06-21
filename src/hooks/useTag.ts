import { useEffect } from 'react'

export function useTag(tags: string[]) {
    useEffect(() => {
        localStorage.setItem("tags", JSON.stringify(tags))
    }, [tags])

}