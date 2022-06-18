import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor"

export default function Editor() {
    const ref = useRef(null!);
    useEffect(() => {
        const editor = monaco.editor.create(ref.current, { automaticLayout: true })

        return () => {
            editor.dispose()
        }
    }, [])

    return <div ref={ref} style={{ height: "100%" }}></div>
}