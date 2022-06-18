import { useCallback, useEffect, useState } from "react"
import { Terminal } from "xterm"
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from "xterm-addon-unicode11"
import { invoke } from "@tauri-apps/api/tauri";
import { listen } from '@tauri-apps/api/event'

import "xterm/css/xterm.css";
import { useResizeDetector } from "react-resize-detector";

export default function BottomTerminal() {
    const [fitAddon] = useState(new FitAddon())
    const onResize = useCallback(() => fitAddon.fit(), []);
    const { ref } = useResizeDetector({ onResize });

    useEffect(() => {
        const term = new Terminal({
            fontFamily: '"JetBrains Mono", Menlo, "DejaVu Sans Mono", Consolas, "Lucida Console", monospace',
            fontSize: 12,
            fontWeight: "normal",
            fontWeightBold: "bold",
            rendererType: "dom",

            letterSpacing: 0,
            lineHeight: 1,

            cursorBlink: false,
            scrollback: 1000,
        })
        // addons before open
        term.loadAddon(fitAddon)

        // open
        term.open(ref.current)

        // addons after open
        term.loadAddon(new Unicode11Addon())
        term.unicode.activeVersion = '11';

        // fit
        fitAddon.fit()
        term.onResize(({ rows, cols }) => {
            invoke("pty_resize", { rows, cols })
        })

        invoke("pty_init", { rows: term.rows, cols: term.cols });

        const outputListener = listen("pty_output", (data) => term.write(data.payload as Uint8Array))
        term.onData((data) => {
            invoke("pty_write", { data: Array.from(new TextEncoder().encode(data)) })
        })

        return () => {
            term.dispose();
            fitAddon.dispose();
            outputListener.then((dispose) => dispose());
        }
    }, [])
    return <div ref={ref} style={{ height: "100%", width: "100%" }}></div>
}