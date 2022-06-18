use std::sync::Mutex;

use once_cell::sync::OnceCell;
use portable_pty::{CommandBuilder, NativePtySystem, PtyPair, PtySize, PtySystem};

static CELL: OnceCell<Mutex<PtyPair>> = OnceCell::new();

#[tauri::command]
pub(crate) fn pty_init(window: tauri::Window, rows: u16, cols: u16) {
    let pty_system = NativePtySystem::default();

    if CELL.get().is_some() {
        return;
    }

    let pair = CELL.get_or_init(|| {
        let pair = pty_system
            .openpty(PtySize {
                rows,
                cols,
                pixel_width: 0,
                pixel_height: 0,
            })
            .unwrap();
        let mut cmd = CommandBuilder::new("bash");
        cmd.env("TERM", "xterm-256color");
        cmd.env("COLORTERM", "truecolor");
        let child = pair.slave.spawn_command(cmd).unwrap();
        Mutex::new(pair)
    });

    let pair = pair.lock().unwrap();
    let mut reader = pair.master.try_clone_reader().unwrap();
    drop(pair);

    std::thread::spawn(move || loop {
        // https://github.com/Ngomana/Termy/blob/main/electron/native/src/shell.rs
        // let mut chunk = [0u8; 10000]; 6899
        // let mut chunk = [0u8; 1024]; 7086
        // let mut chunk = [0u8; 64]; 37651
        let mut chunk = [0u8; 1024];

        // todo: flowcontrol - pause here
        // https://xtermjs.org/docs/guides/flowcontrol/
        // also, buffer chunks to minimize ipc calls
        // can't read_exact because than programs that expect input won't work

        loop {
            let read = reader.read(&mut chunk);

            if let Ok(len) = read {
                if len == 0 {
                    break;
                }
                let chunk = &chunk[..len];
                window.emit("pty_output", chunk).unwrap();
            }
        }
    });
}

#[tauri::command]
pub(crate) fn pty_write(data: Vec<u8>) {
    let mut pair = CELL.get().unwrap().lock().unwrap();
    pair.master.write_all(&data).unwrap();
}

#[tauri::command]
pub(crate) fn pty_resize(rows: u16, cols: u16) {
    let pair = CELL.get().unwrap().lock().unwrap();
    pair.master
        .resize(PtySize {
            rows,
            cols,
            pixel_width: 0,
            pixel_height: 0,
        })
        .unwrap();
}
