import {useEffect, useState} from 'react'

export function useTag(tag: string) {
    const [tags, setTags] = useState<[] | string>([])

    setTags(tag)

    useEffect(() => {

        localStorage.setItem("tags", `${tags}`)

    }, [tags])

}